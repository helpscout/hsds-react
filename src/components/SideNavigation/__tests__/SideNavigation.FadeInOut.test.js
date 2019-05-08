import * as React from 'react'
import { mount } from 'enzyme'
import SideNavigation from '../SideNavigation'
import { FadeInOutUI } from '../styles/SideNavigation.css'

describe('ClassName', () => {
  test('Has default className if collapsable', () => {
    const wrapper = mount(
      <SideNavigation.FadeInOut collapsable={true}>
        <div>child</div>
      </SideNavigation.FadeInOut>
    )

    expect(
      wrapper.getDOMNode().classList.contains('c-SideNavigation__FadeInOut')
    ).toBeTruthy()
  })

  test('Applies custom className if specified and collapsable', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(
      <SideNavigation.FadeInOut collapsable={true} className={customClass}>
        <div>child</div>
      </SideNavigation.FadeInOut>
    )

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content without FadeInOutUI if not collasable', () => {
    const wrapper = mount(
      <SideNavigation.FadeInOut>
        <div className="child">Hello</div>
      </SideNavigation.FadeInOut>
    )
    const el = wrapper.find(FadeInOutUI)

    expect(el.length).toBeFalsy()
    expect(wrapper.text()).toContain('Hello')
  })

  test('Renders child content with FadeInOutUI if collasable', () => {
    const wrapper = mount(
      <SideNavigation.FadeInOut collapsable={true}>
        <div className="child">Hello</div>
      </SideNavigation.FadeInOut>
    )
    const el = wrapper.find(FadeInOutUI)

    expect(el.length).toBeTruthy()
    expect(el.text()).toContain('Hello')
  })
})
