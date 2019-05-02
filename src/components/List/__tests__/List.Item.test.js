import * as React from 'react'
import { mount, render } from 'enzyme'
import { Item } from '../List.Item'

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
    const wrapper = mount(<Item />)

    expect(wrapper.find('li').length).toBeTruthy()
  })

  test('Renders listItem style, if defined', () => {
    const wrapper = render(<Item isListItem />)

    expect(wrapper.hasClass('is-listItem')).toBeTruthy()
  })
})

describe('Accessibility', () => {
  test('Has an aria-role by default', () => {
    const wrapper = mount(<Item />)

    expect(wrapper.find('li').props().role).toBe('listitem')
  })

  test('Role can be overridden', () => {
    const wrapper = mount(<Item role="presentation" />)

    expect(wrapper.find('li').props().role).toBe('presentation')
  })
})

describe('borderStyle', () => {
  test('Adds border class if borderStyle, is defined', () => {
    const wrapper = render(<Item borderStyle="dot" />)

    expect(wrapper.hasClass('is-bordered')).toBeTruthy()
  })

  test('Adds borderStyle class, is defined', () => {
    const wrapper = render(<Item borderStyle="line" />)

    expect(wrapper.hasClass('is-border-line')).toBeTruthy()
  })
})
