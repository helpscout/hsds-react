import React from 'react'
import { mount } from 'enzyme'
import { DropdownDivider as Divider } from '../Dropdown.Divider'
import { hasClass } from '../../../tests/helpers/enzyme'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<Divider />)

    expect(hasClass(wrapper, 'c-DropdownDivider')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Divider className="ron" />)

    expect(hasClass(wrapper, 'ron')).toBe(true)
  })
})

describe('children', () => {
  test('Does not render children', () => {
    const wrapper = mount(
      <Divider>
        <div className="ron">Ron</div>
      </Divider>
    )

    expect(wrapper.find('div.ron').length).toBeFalsy()
  })
})

describe('ref', () => {
  test('Can set an ref to a DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Divider innerRef={spy} />)
    const el = wrapper.getDOMNode()

    expect(spy).toHaveBeenCalledWith(el)
  })
})
