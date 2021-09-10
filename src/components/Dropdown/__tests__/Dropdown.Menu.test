import React from 'react'
import { mount } from 'enzyme'
import { DropdownMenu as Menu } from '../Dropdown.Menu'
import { hasClass } from '../../../tests/helpers/enzyme'

const baseSelector = 'div.c-DropdownMenu'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<Menu />)
    const el = wrapper.find(baseSelector)

    expect(hasClass(el, 'c-DropdownMenu')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Menu className="ron" />)
    const el = wrapper.find(baseSelector)

    expect(hasClass(el, 'ron')).toBe(true)
  })
})

describe('children', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Menu>
        <div className="ron">Ron</div>
      </Menu>
    )

    expect(wrapper.find('div.ron').length).toBeTruthy()
  })
})

describe('ref', () => {
  test('Can set an ref to a DOM node', () => {
    const spy = jest.fn()
    mount(<Menu innerRef={spy} />)

    expect(spy).toHaveBeenCalled()
  })
})

describe('subMenu', () => {
  test('Renders sub-menu class, if isSubMenu', () => {
    const wrapper = mount(<Menu className="ron" isSubMenu />)
    const el = wrapper.find(baseSelector)

    expect(hasClass(el, 'is-subMenu')).toBe(true)
  })
})

describe('ScrollLock', () => {
  test('Renders with ScrollLock by default', () => {
    const wrapper = mount(<Menu />)
    const el = wrapper.find('ScrollLock')

    expect(el.length).toBeTruthy()
  })

  test('ScrollLocking can be disabled', () => {
    const wrapper = mount(<Menu withScrollLock={false} />)
    const el = wrapper.find('ScrollLock')

    expect(el.length).toBeFalsy()
  })
})
