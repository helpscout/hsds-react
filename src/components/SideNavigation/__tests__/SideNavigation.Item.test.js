import * as React from 'react'
import { mount } from 'enzyme'
import SideNavigation from '../SideNavigation'
import { CountUI, ButtonUI } from '../SideNavigation.css'
import Icon from '../../Icon'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<SideNavigation.Item />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SideNavigation__Item')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<SideNavigation.Item className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
  test('Applies is-active className if active', () => {
    const wrapper = mount(<SideNavigation.Item active={true} />)

    expect(wrapper.getDOMNode().classList.contains('is-active')).toBeTruthy()
  })
  test('Applies is-disabled className if disabled', () => {
    const wrapper = mount(<SideNavigation.Item disabled={true} />)

    expect(wrapper.getDOMNode().classList.contains('is-disabled')).toBeTruthy()
  })
  test('Applies is-muted className if muted', () => {
    const wrapper = mount(<SideNavigation.Item muted={true} />)

    expect(wrapper.getDOMNode().classList.contains('is-muted')).toBeTruthy()
  })
  test('Applies is-danger className if danger', () => {
    const wrapper = mount(<SideNavigation.Item danger={true} />)

    expect(wrapper.getDOMNode().classList.contains('is-danger')).toBeTruthy()
    expect(
      wrapper
        .find(ButtonUI)
        .getDOMNode()
        .classList.contains('is-danger')
    ).toBeTruthy()
  })
})

describe('Rendering', () => {
  test('Renders child if not collapsable', () => {
    const wrapper = mount(
      <SideNavigation.Item>
        <div className="child">Hello</div>
      </SideNavigation.Item>
    )
    const el = wrapper.find('div.child')

    expect(el.length).toBeTruthy()
  })
})

describe('Icon', () => {
  test('Renders icon component if available', () => {
    const iconName = 'user'
    const wrapper = mount(<SideNavigation.Item iconName={iconName} />)
    const el = wrapper.find(Icon)

    expect(el.length).toBeTruthy()
    expect(el.props().name).toBe(iconName)
  })

  test('Does not render icon if not available', () => {
    const wrapper = mount(<SideNavigation.Item />)
    const el = wrapper.find(Icon)

    expect(el.length).toBeFalsy()
  })
})

describe('Count', () => {
  test('Renders count if it exists', () => {
    const wrapper = mount(<SideNavigation.Item count={10} />)
    const el = wrapper.find(CountUI)

    expect(el.text()).toBe('10')
  })
})
