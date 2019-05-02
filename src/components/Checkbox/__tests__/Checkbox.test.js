import * as React from 'react'
import { mount } from 'enzyme'
import Checkbox from '../Checkbox'
import Choice from '../../Choice'
import ChoiceGroup from '../../ChoiceGroup/ChoiceGroup'

describe('Checkbox', () => {
  test('Renders a checkbox Choice component', () => {
    const wrapper = mount(<Checkbox value="check" />)
    const choice = wrapper.find(Choice)

    expect(choice.length).toBeTruthy()
    expect(choice.props().type).toBe('checkbox')
    expect(choice.props().value).toBe('check')
  })
})

describe('ChoiceGroup.Context', () => {
  test('Can propogate checked value', () => {
    const wrapper = mount(
      <ChoiceGroup>
        <Checkbox value="buddy" />
        <Checkbox value="elf" />
      </ChoiceGroup>
    )
    let el = wrapper.find('input').first()

    expect(el.prop('checked')).toBe(false)

    el.simulate('change', { target: { checked: true } })
    el = wrapper.find('input').first()

    expect(el.prop('checked')).toBe(true)

    el.simulate('change', { target: { checked: false } })
    el = wrapper.find('input').first()

    expect(el.prop('checked')).toBe(false)
  })
})
