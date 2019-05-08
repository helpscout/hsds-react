import * as React from 'react'
import { mount } from 'enzyme'
import SideNavigation from '../SideNavigation'
import FadeInOut from '../SideNavigation.FadeInOut'
import { BadgeUI } from '../styles/SideNavigation.css'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<SideNavigation.Header />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SideNavigation__Header')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<SideNavigation.Header className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <SideNavigation.Header>
        <div className="child">Hello</div>
      </SideNavigation.Header>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
  test('Wrap children with FadeInOut', () => {
    const wrapper = mount(
      <SideNavigation.Header collapsable={true}>
        <div className="child">Hello</div>
      </SideNavigation.Header>
    )
    const el = wrapper.find(FadeInOut).find('div.child')

    expect(el.length).toBeTruthy()
  })

  test('Renders a label', () => {
    const label = 'Hello'
    const wrapper = mount(<SideNavigation.Header label={label} />)

    expect(wrapper.text()).toContain(label)
  })

  test('Renders a link with href prop', () => {
    const url = 'https://duckduckgo.com'
    const label = 'Hello'
    const wrapper = mount(<SideNavigation.Header href={url} label={label} />)
    const el = wrapper.find('a')

    expect(el.text()).toContain(label)
    expect(el.prop('href')).toBe(url)
  })
})

describe('Badge', () => {
  test('Does not render when component is not collapsable', () => {
    const badge = 'TE'
    const label = 'Hello'

    const wrapper = mount(<SideNavigation.Header badge={badge} label={label} />)

    expect(wrapper.find(BadgeUI).length).toBeFalsy()
    expect(wrapper.text()).toBe(label)
  })

  test('Renders when component is collapsable', () => {
    const badge = 'TE'
    const label = 'Hello'

    const wrapper = mount(
      <SideNavigation.Header badge={badge} label={label} collapsable={true} />
    )
    const el = wrapper.find(BadgeUI)
    expect(el.length).toBeTruthy()
    expect(el.text()).toBe(badge)
  })

  test('Is uppercased', () => {
    const badge = 'te'
    const label = 'Hello'

    const wrapper = mount(
      <SideNavigation.Header badge={badge} label={label} collapsable={true} />
    )
    const el = wrapper.find(BadgeUI)
    expect(el.text()).toBe(badge.toUpperCase())
  })

  test('Sets badge based on label first letter', () => {
    const label = 'Hello'

    const wrapper = mount(
      <SideNavigation.Header label={label} collapsable={true} />
    )
    const el = wrapper.find(BadgeUI)
    expect(el.text()).toBe('H')
  })

  test('Sets badge based on label multiple word', () => {
    const label = 'Hi there'

    const wrapper = mount(
      <SideNavigation.Header label={label} collapsable={true} />
    )
    const el = wrapper.find(BadgeUI)
    expect(el.text()).toBe('HT')
  })

  test('Hides badge if no label and badge are setted', () => {
    const wrapper = mount(<SideNavigation.Header collapsable={true} />)
    const el = wrapper.find(BadgeUI)
    expect(el.length).toBeFalsy()
  })
})
