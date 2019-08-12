import * as React from 'react'
import { mount } from 'enzyme'
import { EditableFieldActions as Actions } from '../EditableField.Actions'

describe('Should component update', () => {
  test('fieldValue', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }

    const wrapper: any = mount(<Actions fieldValue={val} actions={[]} />)
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
})
