import * as React from 'react'
import { mount } from 'enzyme'
import { SideNavigation } from '../SideNavigation'
import { hasClass } from '../../../tests/helpers/enzyme'
import {
  SideNavigationUI,
  SideNavigationCollapsableUI,
} from '../SideNavigation.css'

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

  test('Applies is-collapsable className if collapsed', () => {
    const wrapper = mount(<SideNavigation collapsable={true} />)

    expect(
      wrapper
        .find(SideNavigationUI)
        .getDOMNode()
        .classList.contains('is-collapsable')
    ).toBeTruthy()
  })

  test('Wraps the component with SideNavigationCollapsableUI', () => {
    const wrapper = mount(<SideNavigation collapsable={true} />)

    expect(wrapper.find(SideNavigationCollapsableUI).length).toBeTruthy()
  })
})

describe('Width', () => {
  test('Sets a custom width to the css styled component', () => {
    const width = 150
    const wrapper = mount(<SideNavigation width={width} />)
    const el = wrapper.find(SideNavigationUI)
    expect(el.prop('width')).toBe(width)
  })
})
