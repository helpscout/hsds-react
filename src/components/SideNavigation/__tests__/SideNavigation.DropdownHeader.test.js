import React from 'react'
import { mount } from 'enzyme'
import SideNavigation from '../SideNavigation'
import {} from '../SideNavigation.css'
import Icon from '../../Icon'
import AutoDropdown from '../../AutoDropdown/AutoDropdown'
import { ItemSpec } from '../../../../stories/DropdownV2.stories'
import { Trigger } from '../../Dropdown/V2/Dropdown.Trigger'

const items = ItemSpec.generate(3)

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<SideNavigation.DropdownHeader />)

    expect(
      wrapper
        .find(AutoDropdown)
        .getDOMNode()
        .classList.contains('c-SideNavigation__DropdownHeader')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(
      <SideNavigation.DropdownHeader className={customClass} />
    )

    expect(
      wrapper
        .find(AutoDropdown)
        .getDOMNode()
        .classList.contains(customClass)
    ).toBeTruthy()
  })
})

describe('Children', () => {
  test('Wrap children with a SideNavigation.Heading', () => {
    const wrapper = mount(
      <SideNavigation.DropdownHeader>
        <span>Hello</span>
      </SideNavigation.DropdownHeader>
    )

    const el = wrapper.find(SideNavigation.Heading)
    expect(el.length).toBeTruthy()
    expect(el.text()).toContain('Hello')
  })
})

describe('ID', () => {
  test('Has a unique ID', () => {
    const wrapper = mount(<SideNavigation.DropdownHeader />)
    expect(wrapper.instance().wrappedInstance.id).toBeTruthy()
  })
})

describe('Actions', () => {
  test('Calls props on open/close', () => {
    const forceNavVisibleOn = jest.fn()
    const forceNavVisibleOff = jest.fn()
    const wrapper = mount(
      <SideNavigation.DropdownHeader
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
