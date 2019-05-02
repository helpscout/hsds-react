import * as React from 'react'
import { mount } from 'enzyme'
import Sidenav from '../HsApp.Sidenav'
import SideNavigation from '../../SideNavigation'
import Button from '../../Button'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Sidenav />)
    expect(wrapper.getDOMNode().classList.contains('c-HsApp__Sidenav')).toBe(
      true
    )
  })
})

describe('Rendering', () => {
  test('Renders a header', () => {
    const wrapper = mount(<Sidenav />)
    expect(wrapper.find(SideNavigation.Header).length).toBe(1)
  })
  test('Renders a section', () => {
    const wrapper = mount(<Sidenav />)
    expect(wrapper.find(SideNavigation.Section).length).toBeTruthy()
  })
  test('Renders a footer', () => {
    const wrapper = mount(<Sidenav />)
    expect(wrapper.find(SideNavigation.Footer).length).toBe(1)
  })
  test('Renders folders section', () => {
    const wrapper = mount(<Sidenav />)
    expect(
      wrapper
        .find(SideNavigation.Section)
        .last()
        .prop('title')
    ).toBe('Folders')
  })

  test('Does not render a dropdown if collapsable', () => {
    const wrapper = mount(<Sidenav collapsable />)
    expect(wrapper.find(SideNavigation.DropdownHeader).length).toBe(0)
  })
})

describe('Actions', () => {
  test('Sets current active item on click', () => {
    const wrapper = mount(<Sidenav />)
    const actualItem = wrapper.state('active')
    const section = wrapper.find(SideNavigation.Section).first()

    const item = section.find(SideNavigation.Item).last()
    item.find(Button).simulate('click')

    expect(actualItem).not.toBe(wrapper.state('active'))
  })
})
