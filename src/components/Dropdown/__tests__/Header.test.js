import * as React from 'react'
import { mount } from 'enzyme'
import Header from '../Dropdown.Header'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Header />)
    const el = wrapper.find('div.c-DropdownHeader')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Header className={customClass} />)
    const el = wrapper.find('div.c-DropdownHeader')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child', () => {
    const wrapper = mount(
      <Header>
        <div className="child">Hello</div>
      </Header>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})
