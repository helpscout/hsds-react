import React from 'react'
import { mount } from 'enzyme'
import VisuallyHidden from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<VisuallyHidden />)

    expect(wrapper.hasClass('c-VisuallyHidden')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<VisuallyHidden className={customClass} />)

    expect(wrapper.hasClass(customClass)).toBe(true)
  })
})

describe('Content', () => {
  test('Renders child text', () => {
    const wrapper = mount(<VisuallyHidden>Foamy White Latte</VisuallyHidden>)

    expect(wrapper.text()).toBe('Foamy White Latte')
  })

  test('Renders child component', () => {
    const wrapper = mount(
      <VisuallyHidden>
        <div>Foamy White Latte</div>
      </VisuallyHidden>
    )
    const o = wrapper.find('div')

    expect(o.text()).toBe('Foamy White Latte')
  })
})

describe('States', () => {
  test('Adds focusable styles if applied', () => {
    const wrapper = mount(<VisuallyHidden focusable />)

    expect(wrapper.hasClass('is-focusable')).toBe(true)
    expect(wrapper.html()).toContain('tabindex')
  })
})
