import React from 'react'
import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import { EditableFieldActions as Actions } from '../EditableField.Actions'
import * as urlUtils from '../../../utilities/urls'

import { STATES_CLASSNAMES } from '../EditableField.utils'

const validationInfo = {
  isValid: false,
  name: 'email',
  value: 'hello',
  type: 'error',
}

describe('Rendering', () => {
  test('actions should not be focusable', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }

    const { getByRole } = render(
      <Actions
        name="email"
        fieldValue={val}
        actions={[
          {
            name: 'delete',
          },
        ]}
      />
    )

    expect(getByRole('button').getAttribute('tabindex')).toBe('-1')
  })

  test('should have with-validation class if validation info is present', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }

    const { container } = render(
      <Actions
        name="email"
        fieldValue={val}
        validationInfo={validationInfo}
        actions={[
          {
            name: 'delete',
          },
        ]}
      />
    )

    expect(
      container.querySelector(`.${STATES_CLASSNAMES.withValidation}`)
    ).toBeTruthy()
  })
})

describe('Should component update', () => {
  test('fieldValue', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }

    const wrapper = mount(
      <Actions name="email" fieldValue={val} actions={[]} />
    )
    const actualProps = wrapper.props()
    const newPropsSame = {
      ...actualProps,
    }
    const newPropsChanged = {
      ...actualProps,
      fieldValue: {
        value: 'hola',
        id: 'greeting_0',
      },
    }

    expect(wrapper.instance().shouldComponentUpdate(newPropsSame)).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(newPropsChanged)
    ).toBeTruthy()
  })

  test('validationInfo', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const validationInfo = {
      isValid: false,
      name: 'email',
      value: 'hello',
      type: 'error',
    }
    const wrapper = mount(
      <Actions name="email" fieldValue={val} actions={[]} />
    )
    const actualProps = wrapper.props()
    const newPropsSame = {
      ...actualProps,
    }
    const newPropsChanged = {
      ...actualProps,
      validationInfo,
    }

    expect(wrapper.instance().shouldComponentUpdate(newPropsSame)).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(newPropsChanged)
    ).toBeTruthy()
  })
})

describe('handleActionClick', () => {
  test('on click of link, it opens a new window', () => {
    const urlUtilSpy = jest.spyOn(urlUtils, 'normalizeUrl')
    window.open = jest.fn()

    const val = {
      value: 'google.com',
      id: 'site0',
    }

    const actions = [{ name: 'link' }]

    const wrapper = mount(
      <Actions name="website" fieldValue={val} actions={actions} />
    )

    const button = wrapper.find('.FieldActions_button').hostNodes()
    button.simulate('click')

    expect(urlUtilSpy).toHaveBeenCalledWith(val.value)
    expect(window.open).toHaveBeenCalledWith(`http://${val.value}`)
  })
})
