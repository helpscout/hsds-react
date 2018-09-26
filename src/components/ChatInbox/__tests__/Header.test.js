import React from 'react'
import { mount } from 'enzyme'
import Header from '../Header'
import { Icon, Heading, Hr } from '../../index'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-ChatInboxHeader',
}

baseComponentTest(Header, baseComponentOptions)

describe('Avatar/Collapse', () => {
  const avatars = <div className="avatar-stub" />

  test('Can render avatars', () => {
    const wrapper = mount(<Header avatars={avatars} />)
    const o = wrapper.find('.avatar-stub')

    expect(o.length).toBe(1)
  })

  test('Renders avatar instead of icon, when collapsed', () => {
    const wrapper = mount(
      <Header avatars={avatars} isCollapsible isCollapsed />
    )
    const o = wrapper.find('.c-ChatInboxHeader__action')
    const ava = o.find('.avatar-stub')
    const icon = o.find(Icon)

    expect(ava.length).toBe(1)
    expect(icon.length).toBe(0)
  })

  test('Renders icon instead of avatar, when expanded', () => {
    const wrapper = mount(
      <Header avatars={avatars} isCollapsible isCollapsed={false} />
    )
    const o = wrapper.find('.c-ChatInboxHeader__action')
    const ava = o.find('.avatar-stub')
    const icon = o.find(Icon)

    expect(ava.length).toBe(0)
    expect(icon.length).toBe(1)
  })
})

describe('Count', () => {
  test('Does not render a count by default', () => {
    const wrapper = mount(<Header />)
    const o = wrapper.find('.c-ChatInboxHeader__count')

    expect(o.length).toBe(0)
  })

  test('Renders a count, if defined', () => {
    const wrapper = mount(<Header count={55} />)
    const count = wrapper.find('.c-ChatInboxHeader__count')
    const o = count.find(Heading)

    expect(count.length).toBe(1)
    expect(o.length).toBe(1)
    expect(o.html()).toContain('55')
  })

  test('Does not render a count, if count is zero (0)', () => {
    const wrapper = mount(<Header count={0} />)
    const o = wrapper.find('.c-ChatInboxHeader__count')

    expect(o.length).toBe(0)
  })
})

describe('Children', () => {
  test('Renders children within Heading', () => {
    const wrapper = mount(<Header>Hello</Header>)
    const o = wrapper.find('.c-ChatInboxHeader__title')

    expect(o.html()).toContain('Hello')
  })
})

describe('Collapsible', () => {
  test('Is not collapsible by default', () => {
    const wrapper = mount(<Header />)
    const hr = wrapper.find(Hr)

    expect(wrapper.hasClass('is-collapsible')).toBe(false)
    expect(hr.length).toBe(1)
  })

  test('Is not collapsible by default', () => {
    const wrapper = mount(<Header />)
    const hr = wrapper.find(Hr)

    expect(wrapper.hasClass('is-collapsible')).toBe(false)
    expect(hr.length).toBe(1)
  })

  test('Show divider if collapsible + expanded', () => {
    const wrapper = mount(<Header isCollapsible isCollapsed={false} />)
    const hr = wrapper.find(Hr)

    expect(hr.length).toBe(1)
  })

  test('Hide divider if collapsible + collapsed', () => {
    const wrapper = mount(<Header isCollapsible isCollapsed={true} />)
    const hr = wrapper.find(Hr)

    expect(hr.length).toBe(0)
  })
})
