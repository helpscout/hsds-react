import React from 'react'
import { mount } from 'enzyme'
import SideNavigation, { SideNavigationContext } from '../SideNavigation'
import { FadeInOutUI } from '../styles/SideNavigation.css'

describe('ClassName', () => {
  test('Has default className if collapsable', () => {
    const wrapper = mount(
      <SideNavigationContext.Provider value={{ collapsable: true }}>
        <SideNavigation.FadeInOut>
          <div>child</div>
        </SideNavigation.FadeInOut>
      </SideNavigationContext.Provider>
    )

    expect(
      wrapper.getDOMNode().classList.contains('c-SideNavigation__FadeInOut')
    ).toBeTruthy()
  })

  test('Applies custom className if specified and collapsable', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(
      <SideNavigationContext.Provider value={{ collapsable: true }}>
        <SideNavigation.FadeInOut collapsable={true} className={customClass}>
          <div>child</div>
        </SideNavigation.FadeInOut>
      </SideNavigationContext.Provider>
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
      <SideNavigationContext.Provider value={{ collapsable: true }}>
        <SideNavigation.FadeInOut collapsable={true}>
          <div className="child">Hello</div>
        </SideNavigation.FadeInOut>
      </SideNavigationContext.Provider>
    )
    const el = wrapper.find(FadeInOutUI)

    expect(el.length).toBeTruthy()
    expect(el.text()).toContain('Hello')
  })
})
