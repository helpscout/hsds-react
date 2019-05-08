import * as React from 'react'
import { mount } from 'enzyme'
import SideNavigation from '../SideNavigation'
import {} from '../styles/SideNavigation.css'
import Dropdown from '../../Dropdown/DropdownV2'
import { Trigger } from '../../Dropdown/V2/Dropdown.Trigger'
import Icon from '../../Icon/Icon'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<SideNavigation.DropdownFooter />)

    expect(
      wrapper
        .find(Dropdown)
        .getDOMNode()
        .classList.contains('c-SideNavigation__DropdownFooter')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(
      <SideNavigation.DropdownFooter className={customClass} />
    )

    expect(
      wrapper
        .find(Dropdown)
        .getDOMNode()
        .classList.contains(customClass)
    ).toBeTruthy()
  })
})

describe('Children', () => {
  test('Sets SideNavigation.Button as the trigger', () => {
    const wrapper = mount(
      <SideNavigation.DropdownFooter>
        <span>Hello</span>
      </SideNavigation.DropdownFooter>
    )

    const el = wrapper.find(SideNavigation.Button)
    expect(el.length).toBeTruthy()
  })

  test('Sets Icon name on SideNavigation.Button trigger', () => {
    const wrapper = mount(
      <SideNavigation.DropdownFooter iconName="user">
        <span>Hello</span>
      </SideNavigation.DropdownFooter>
    )

    const el = wrapper.find(SideNavigation.Button)
    expect(el.find(Icon).prop('name')).toBe('user')
  })
})

describe('ID', () => {
  test('Has a unique ID', () => {
    const wrapper = mount(<SideNavigation.DropdownFooter />)
    expect(wrapper.instance().wrappedInstance.id).toBeTruthy()
  })
})

describe('Actions', () => {
  test('Calls props on open/close', () => {
    const forceNavVisibleOn = jest.fn()
    const forceNavVisibleOff = jest.fn()
    const wrapper = mount(
      <SideNavigation.DropdownFooter
        forceNavVisibleOn={forceNavVisibleOn}
        forceNavVisibleOff={forceNavVisibleOff}
      />
    )

    const id = wrapper.instance().wrappedInstance.id

    wrapper.find(Trigger).simulate('click')
    wrapper.find(Trigger).simulate('click')

    expect(forceNavVisibleOn).toHaveBeenCalledWith(id)
    expect(forceNavVisibleOff).toHaveBeenCalledWith(id)
  })
})
