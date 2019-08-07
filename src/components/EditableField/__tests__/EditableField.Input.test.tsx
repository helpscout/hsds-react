import * as React from 'react'
import { cy } from '@helpscout/cyan'
import { mount } from 'enzyme'
import { EditableFieldInput } from '../EditableField.Input'
import { TRUNCATED_CLASSNAMES } from '../EditableField.utils'

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

describe('email type', () => {
  test('should truncate', () => {
    const val = {
      value: 'email@somethingcool.com',
      id: 'email_0',
    }

    cy.render(<EditableFieldInput type="email" name="email" fieldValue={val} />)

    expect(
      cy.get(`.${TRUNCATED_CLASSNAMES.withSplitter}`).exists()
    ).toBeTruthy()
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.firstChunk}`).exists()).toBeTruthy()
    expect(
      cy.get(`.${TRUNCATED_CLASSNAMES.splitterChunk}`).exists()
    ).toBeTruthy()
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.secondChunk}`).exists()).toBeTruthy()
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.firstChunk}`).text()).toBe('email')
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.splitterChunk}`).text()).toBe('@')
    expect(cy.get(`.${TRUNCATED_CLASSNAMES.secondChunk}`).text()).toBe(
      'somethingcool.com'
    )
  })
})
