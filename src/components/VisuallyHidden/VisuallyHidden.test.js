import * as React from 'react'
import { mount } from 'enzyme'
import VisuallyHidden from '.'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<VisuallyHidden />)

    expect(wrapper.getDOMNode().classList.contains('c-VisuallyHidden')).toBe(
      true
    )
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<VisuallyHidden className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBe(true)
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

    expect(wrapper.getDOMNode().classList.contains('is-focusable')).toBe(true)
    expect(wrapper.html()).toContain('tabindex')
  })
})
