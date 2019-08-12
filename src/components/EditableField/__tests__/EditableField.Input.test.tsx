import * as React from 'react'
import { mount } from 'enzyme'
import { EditableFieldInput } from '../EditableField.Input'

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
