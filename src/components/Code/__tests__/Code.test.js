import * as React from 'react'
import { mount } from 'enzyme'
import Code from '../Code'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Code />)
    const el = wrapper.find('code.c-Code')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Code className={customClass} />)
    const el = wrapper.find('code.c-Code')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child', () => {
    const wrapper = mount(
      <Code>
        <div className="child">Hello</div>
      </Code>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})
