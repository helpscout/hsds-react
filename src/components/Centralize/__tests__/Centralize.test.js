import React from 'react'
import { mount } from 'enzyme'
import { Centralize } from '../Centralize'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Centralize />)
    const el = wrapper.find('div.c-Centralize')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Centralize className={customClass} />)
    const el = wrapper.find('div.c-Centralize')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Centralize>
        <div className="child">Hello</div>
      </Centralize>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})
