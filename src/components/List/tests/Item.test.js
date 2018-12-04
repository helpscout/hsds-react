import React from 'react'
import { shallow, mount } from 'enzyme'
import Item from '../Item'
import { baseComponentTest } from '../../../tests/helpers/components'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Item />)
    const el = wrapper.find('li.c-List__item')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Item className={customClass} />)
    const el = wrapper.find('li.c-List__item')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Item>
        <div className="child">Hello</div>
      </Item>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})
describe('Selector', () => {
  test('Renders an li', () => {
    const wrapper = shallow(<Item />)

    expect(wrapper.find('li').length).toBeTruthy()
  })
})

describe('Accessibility', () => {
  test('Has an aria-role by default', () => {
    const wrapper = shallow(<Item />)

    expect(wrapper.find('li').props().role).toBe('listitem')
  })

  test('Role can be overridden', () => {
    const wrapper = shallow(<Item role="presentation" />)

    expect(wrapper.find('li').props().role).toBe('presentation')
  })
})
