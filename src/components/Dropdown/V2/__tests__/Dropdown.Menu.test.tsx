import * as React from 'react'
import { mount } from 'enzyme'
import { Menu } from '../Dropdown.Menu'
import { hasClass } from './Dropdown.testHelpers'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<Menu />)

    expect(hasClass(wrapper, 'c-DropdownV2Menu')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Menu className="ron" />)

    expect(hasClass(wrapper, 'ron')).toBe(true)
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

describe('innerRef', () => {
  test('Can set an innerRef to a DOM node', () => {
    const spy = jest.fn()
    mount(<Menu innerRef={spy} />)

    expect(spy).toHaveBeenCalled()
  })
})

describe('subMenu', () => {
  test('Renders sub-menu class, if isSubMenu', () => {
    const wrapper = mount(<Menu className="ron" isSubMenu />)

    expect(hasClass(wrapper, 'is-subMenu')).toBe(true)
  })
})

describe('styles', () => {
  test('Can render custom styles', () => {
    const wrapper = mount(
      <Menu className="ron" style={{ background: 'blue' }} />
    )
    const el: any = wrapper.getDOMNode()

    expect(el.style.background).toBe('blue')
  })

  test('Adds custom dimension styles from props', () => {
    const wrapper = mount(
      <Menu
        className="ron"
        style={{ background: 'blue' }}
        minWidth={600}
        maxWidth={650}
        minHeight={300}
        maxHeight={500}
        zIndex={44}
      />
    )
    const el: any = wrapper.getDOMNode()

    expect(el.style.background).toBe('blue')
    expect(el.style.minWidth).toBe('600px')
    expect(el.style.maxWidth).toBe('650px')
    expect(el.style.minHeight).toBe('300px')
    expect(el.style.maxHeight).toBe('500px')
    expect(el.style.zIndex).toBe('44')
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
