import React from 'react'
import { mount } from 'enzyme'
import Header from '../ChatInbox.Header'
import { Icon, Heading, Hr } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Header />)
    const el = wrapper.find('div.c-ChatInboxHeader')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Header className={customClass} />)
    const el = wrapper.find('div.c-ChatInboxHeader')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child', () => {
    const wrapper = mount(
      <Header>
        <div className="child">Hello</div>
      </Header>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

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

    expect(count.length).toBeTruthy()
    expect(o.length).toBeTruthy()
    expect(o.first().html()).toContain('55')
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
    const o = wrapper.find('.c-ChatInboxHeader__title').first()

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
