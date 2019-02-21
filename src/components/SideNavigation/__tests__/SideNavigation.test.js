import * as React from 'react'
import { mount } from 'enzyme'
import { SideNavigation } from '../SideNavigation'
import { hasClass } from '../../../tests/helpers/enzyme'
import { SideNavigationUI } from '../SideNavigation.css'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<SideNavigation />)

    expect(hasClass(wrapper, 'c-SideNavigation')).toBe(true)
  })
  test('Add custom className', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<SideNavigation className={customClass} />)

    expect(hasClass(wrapper, customClass)).toBe(true)
  })

  test('Applies is-collapsed className if collapsed', () => {
    const wrapper = mount(<SideNavigation collapsed={true} />)

    expect(wrapper.getDOMNode().classList.contains('is-collapsed')).toBeTruthy()
  })
})

describe('Width', () => {
  test('Sets a custom width to the component', () => {
    const width = 150
    const wrapper = mount(<SideNavigation width={width} />)
    const el = wrapper.find(SideNavigationUI)
    expect(el.prop('style').width).toBe(`${width}px`)
  })
})
