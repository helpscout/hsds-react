import React from 'react'
import { shallow } from 'enzyme'
import Checkbox from '..'
import Choice from '../../Choice'

describe('Checkbox', () => {
  test('Renders a checkbox Choice component', () => {
    const wrapper = shallow(<Checkbox value="check" />)
    const choice = wrapper.find(Choice)

    expect(choice.length).toBeTruthy()
    expect(choice.props().type).toBe('checkbox')
    expect(choice.props().value).toBe('check')
  })
})
