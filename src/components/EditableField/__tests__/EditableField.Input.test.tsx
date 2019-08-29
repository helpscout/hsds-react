import * as React from 'react'
import { mount } from 'enzyme'

import { EditableFieldInput } from '../EditableField.Input'

import { Validation } from '../EditableField.types'

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

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          fieldValue: {
            value: 'hello',
            id: 'greeting_0',
          },
        },
        actualProps
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
        actualProps
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

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          isActive: true,
        },
        actualProps
      )
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          isActive: false,
        },
        actualProps
      )
    ).toBeTruthy()
  })

  test('disabled', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper: any = mount(
      <EditableFieldInput name="greeting" fieldValue={val} isActive disabled />
    )
    const actualProps = wrapper.props()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          disabled: true,
        },
        actualProps
      )
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          disabled: false,
        },
        actualProps
      )
    ).toBeTruthy()
  })

  test('validationInfo', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const validationInfo: Validation = {
      isValid: false,
      name: 'email',
      value: 'hello',
      type: 'error',
    }
    const wrapper: any = mount(
      <EditableFieldInput name="greeting" fieldValue={val} isActive />
    )
    const actualProps = wrapper.props()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
        },
        actualProps
      )
    ).toBeFalsy()

    expect(
      wrapper.instance().shouldComponentUpdate(
        {
          ...actualProps,
          validationInfo,
        },
        actualProps
      )
    ).toBeTruthy()
  })
})

describe('component did update', () => {
  test('should run setTitle', () => {
    const val = {
      value: 'hello',
      id: 'greeting_0',
    }
    const wrapper: any = mount(
      <EditableFieldInput name="greeting" fieldValue={val} />
    )

    const instance = wrapper.instance()

    jest.spyOn(instance, 'setInputTitle')

    wrapper.setProps({ fieldValue: { ...val, value: 'hola' } })

    expect(instance.setInputTitle).toHaveBeenCalled()
  })
})
