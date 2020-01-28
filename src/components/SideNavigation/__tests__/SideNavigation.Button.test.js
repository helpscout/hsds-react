import * as React from 'react'
import { mount } from 'enzyme'
import SideNavigation, { SideNavigationContext } from '../SideNavigation'
import { ButtonUI, ButtonFooterUI } from '../SideNavigation.css'
import Icon from '../../Icon'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<SideNavigation.Button />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SideNavigation__Button')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<SideNavigation.Button className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child if inside floating menu', () => {
    const wrapper = mount(
      <SideNavigationContext.Provider value={{ floatingMenu: true }}>
        <SideNavigation.Button>
          <div className="child">Hello</div>
        </SideNavigation.Button>
      </SideNavigationContext.Provider>
    )
    const el = wrapper.find('div.child')

    expect(el.length).toBeTruthy()
  })

  test('Does not render child if not inside floating menu', () => {
    const wrapper = mount(
      <SideNavigation.Button>
        <div className="child">Hello</div>
      </SideNavigation.Button>
    )
    const el = wrapper.find('div.child')

    expect(el.length).toBeFalsy()
  })
})

describe('Icon', () => {
  test('Renders icon component if available', () => {
    const wrapper = mount(<SideNavigation.Button icon={<Icon name="user" />} />)
    const el = wrapper.find(Icon)

    expect(el.length).toBeTruthy()
  })

  test('Does not render icon if not available', () => {
    const wrapper = mount(<SideNavigation.Button />)
    const el = wrapper.find(Icon)

    expect(el.length).toBeFalsy()
  })

  test('Renders an icon if iconName is defined', () => {
    const wrapper = mount(<SideNavigation.Button iconName="user" />)
    const el = wrapper.find(Icon)

    expect(el.length).toBeTruthy()
  })
})

describe('Element', () => {
  test('Renders ButtonFooterUI if not floating menu', () => {
    const wrapper = mount(<SideNavigation.Button />)
    const el = wrapper.find(ButtonFooterUI)

    expect(el.length).toBeTruthy()
  })

  test('Renders ButtonUI if floating menu', () => {
    const wrapper = mount(
      <SideNavigationContext.Provider value={{ floatingMenu: true }}>
        <SideNavigation.Button />
      </SideNavigationContext.Provider>
    )
    const el = wrapper.find(ButtonUI)

    expect(el.length).toBeTruthy()
  })
})
