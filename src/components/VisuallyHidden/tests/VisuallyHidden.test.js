import React from 'react'
import { shallow } from 'enzyme'
import VisuallyHidden from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<VisuallyHidden />)

    expect(wrapper.prop('className')).toContain('c-VisuallyHidden')
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<VisuallyHidden className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Content', () => {
  test('Renders child text', () => {
    const wrapper = shallow(<VisuallyHidden>Foamy White Latte</VisuallyHidden>)

    expect(wrapper.text()).toBe('Foamy White Latte')
  })

  test('Renders child component', () => {
    const wrapper = shallow(
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
    const wrapper = shallow(<VisuallyHidden focusable />)

    expect(wrapper.prop('className')).toContain('is-focusable')
    expect(wrapper.prop('tabIndex')).toBe(1)
  })
})
