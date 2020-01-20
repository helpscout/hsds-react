import * as React from 'react'
import { mount } from 'enzyme'
import SideNavigation, { SideNavigationContext } from '../SideNavigation'
import Icon from '../../Icon'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<SideNavigation.Footer />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SideNavigation__Footer')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<SideNavigation.Footer className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })

  test('Applies floating menu classname', () => {
    const wrapper = mount(
      <SideNavigationContext.Provider value={{ floatingMenu: true }}>
        <SideNavigation.Footer />
      </SideNavigationContext.Provider>
    )

    expect(
      wrapper.getDOMNode().classList.contains('is-floating-menu')
    ).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <SideNavigation.Footer>
        <div className="child">Hello</div>
      </SideNavigation.Footer>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })

  test('Renders a three dots icon when collapsed', () => {
    const wrapper = mount(
      <SideNavigationContext.Provider value={{ collapsable: true }}>
        <SideNavigation.Footer />
      </SideNavigationContext.Provider>
    )

    const el = wrapper.find(Icon)

    expect(el.length).toBeTruthy()
    expect(el.prop('name')).toBe('option-dots')
  })
})
