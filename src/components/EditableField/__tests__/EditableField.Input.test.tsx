import * as React from 'react'
import { cy } from '@helpscout/cyan'
import { mount } from 'enzyme'
import { EditableFieldInput } from '../EditableField.Input'
import {
  EF_I_COMPONENT_KEY,
  EF_TRUNC_COMPONENT_KEY,
  getComponentClassNames,
} from '../EditableField.utils'

const EF_I_CLASSNAMES: any = getComponentClassNames(EF_I_COMPONENT_KEY)
const EF_TRUNC_CLASSNAMES: any = getComponentClassNames(EF_TRUNC_COMPONENT_KEY)

describe('Should component update', () => {
  test('fieldValue', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper: any = mount(
      <EditableFieldInput name="greeting" fieldValue={val} />
    )
    const actualProps = wrapper.props()
    const actualState = wrapper.state()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          fieldValue: {
            value: 'hello',
            id: 'greeting_0',
          },
        },
        actualState
      )
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          fieldValue: {
            value: 'hola',
            id: 'greeting_0',
          },
        },
        actualState
      )
    ).toBeTruthy()
  })

  test('isActive', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper: any = mount(
      <EditableFieldInput name="greeting" fieldValue={val} isActive />
    )
    const actualProps = wrapper.props()
    const actualState = wrapper.state()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          isActive: true,
        },
        actualState
      )
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          isActive: false,
        },
        actualState
      )
    ).toBeTruthy()
  })
})

describe('calculateFieldWidth', () => {
  test('is active and without actions', () => {
    const val = {
      value: 'hello my old friend',
      id: 'greeting_0',
    }
    cy.render(<EditableFieldInput name="greeting" fieldValue={val} isActive />)

    const field = cy.get(`.${EF_I_CLASSNAMES.component}`)

    expect(field.getComputedStyle('width')).toBe('100%')
  })

  test('not active and without actions', () => {
    const val = {
      value: 'hello my old friend',
      id: 'greeting_0',
    }
    cy.render(
      <EditableFieldInput name="greeting" fieldValue={val} isActive={false} />
    )

    const field = cy.get(`.${EF_I_CLASSNAMES.component}`)

    expect(field.getComputedStyle('width')).toContain('px')
  })

  test('with actions and active', () => {
    const val = {
      value: 'hello my old friend',
      id: 'greeting_0',
    }
    cy.render(
      <EditableFieldInput
        name="greeting"
        fieldValue={val}
        isActive
        actions={[{ name: 'act' }]}
      />
    )

    const field = cy.get(`.${EF_I_CLASSNAMES.component}`)

    expect(field.getComputedStyle('width')).toBe('100%')
  })

  test('with actions and not active', () => {
    const val = {
      value: 'hello my old friend',
      id: 'greeting_0',
    }
    cy.render(
      <EditableFieldInput
        name="greeting"
        fieldValue={val}
        isActive={false}
        actions={[{ name: 'act' }]}
      />
    )

    const field = cy.get(`.${EF_I_CLASSNAMES.component}`)

    expect(field.getComputedStyle('width')).toContain('px')
  })
})

describe('email type', () => {
  test('should truncate', () => {
    const val = {
      value: 'email@somethingcool.com',
      id: 'email_0',
    }

    cy.render(<EditableFieldInput type="email" name="email" fieldValue={val} />)

    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.withSplitter}`).exists()).toBeTruthy()
    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.firstChunk}`).exists()).toBeTruthy()
    expect(
      cy.get(`.${EF_TRUNC_CLASSNAMES.splitterChunk}`).exists()
    ).toBeTruthy()
    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.secondChunk}`).exists()).toBeTruthy()
    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.firstChunk}`).text()).toBe('email')
    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.splitterChunk}`).text()).toBe('@')
    expect(cy.get(`.${EF_TRUNC_CLASSNAMES.secondChunk}`).text()).toBe(
      'somethingcool.com'
    )
  })
})
