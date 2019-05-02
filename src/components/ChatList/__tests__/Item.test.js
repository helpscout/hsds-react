import * as React from 'react'
import { mount } from 'enzyme'
import Item from '../Item'
import {
  Animate,
  Avatar,
  Badge,
  Link,
  LoadingDots,
  Overflow,
  Skeleton,
  Tag,
  Timestamp,
} from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Item />)
    const o = wrapper.find('a.c-ChatListItem')

    expect(o.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Item className={customClass} />)
    const o = wrapper.find('a.c-ChatListItem')

    expect(o.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Does not render children content', () => {
    const wrapper = mount(
      <Item>
        <div className="child">Hello</div>
      </Item>
    )
    const o = wrapper.find('div.child')

    expect(o.length).toBe(0)
  })
})

describe('Animate', () => {
  test('Is wrapped with Animate', () => {
    const wrapper = mount(<Item />)
    const animate = wrapper.find(Animate)
    const o = animate.find('a.c-ChatListItem')

    expect(animate.length).toBe(1)
    expect(o.length).toBe(1)
  })
})

describe('Assigned', () => {
  test('Is not assigned by default', () => {
    const wrapper = mount(<Item />)
    const o = wrapper.find(Link)

    expect(wrapper.props().isAssigned).toBe(false)
    expect(o.hasClass('is-assigned')).toBe(false)
  })

  test('Applies assigned styles, if defined', () => {
    const wrapper = mount(<Item isAssigned />)
    const o = wrapper.find(Link)

    expect(o.hasClass('is-assigned')).toBe(true)
  })
})

describe('Avatar', () => {
  test('Does not render an avatar block by default', () => {
    const wrapper = mount(<Item />)
    const o = wrapper.find('div.c-ChatListItem__avatar')

    expect(o.length).toBe(0)
  })

  test('Renders an Avatar within an Animate component', () => {
    const avatarMarkup = <Avatar name="Ron" />
    const wrapper = mount(
      <Item avatar={avatarMarkup} name="Ron" message="Stay classy!" />
    )
    const o = wrapper.find('div.c-ChatListItem__avatar')
    const animate = o.find(Animate)
    const avatar = animate.find(Avatar)

    expect(o.length).toBe(1)
    expect(animate.length).toBe(1)
    expect(avatar.length).toBe(1)
  })
})

describe('Focus', () => {
  test('Is not focused by default', () => {
    const wrapper = mount(<Item />)
    const o = wrapper.find(Link)

    expect(wrapper.props().isFocused).toBe(false)
    expect(o.hasClass('is-focused')).toBe(false)
  })

  test('Applies focus styles, if defined', () => {
    const wrapper = mount(<Item isFocused />)
    const o = wrapper.find(Link)

    expect(o.hasClass('is-focused')).toBe(true)
  })
})

describe('Link', () => {
  test('Main component is a Link', () => {
    const wrapper = mount(<Item />)
    const animate = wrapper.find(Animate)
    const o = animate.find(Link)

    expect(o.length).toBe(1)
    expect(o.hasClass('c-ChatListItem')).toBe(true)
  })

  test('Link is properly styled', () => {
    const wrapper = mount(<Item />)
    const o = wrapper.find(Link)
    const props = o.props()

    expect(props.block).toBe(true)
    expect(props.noUnderline).toBe(true)
  })
})

describe('MessageCount', () => {
  test('Does not render message count by default', () => {
    const wrapper = mount(<Item name="Ron" message="Stay classy!" />)
    const o = wrapper.find('div.c-ChatListItem__messageCount')

    expect(o.length).toBe(0)
  })

  test('Renders messageCount within an animated badge', () => {
    const wrapper = mount(
      <Item name="Ron" message="Stay classy!" newMessageCount={330} />
    )
    const o = wrapper.find('div.c-ChatListItem__messageCount')
    const animate = o.find(Animate)
    const badge = animate.find(Badge)

    expect(o.length).toBe(1)
    expect(animate.length).toBe(1)
    expect(badge.length).toBe(1)
    expect(badge.html()).toContain(330)
  })
})

describe('Loading', () => {
  test('Renders Skeletons by default', () => {
    const wrapper = mount(<Item />)
    const o = wrapper.find(Skeleton.Text)

    expect(o.length).toBeTruthy()
  })

  test('Renders Skeletons, if name prop is missing', () => {
    const wrapper = mount(<Item message="Hello" />)
    const o = wrapper.find(Skeleton.Text)

    expect(o.length).toBeTruthy()
  })

  test('Renders Skeletons, if message prop is missing', () => {
    const wrapper = mount(<Item name="Ron" />)
    const o = wrapper.find(Skeleton.Text)

    expect(o.length).toBeTruthy()
  })

  test('Does not render Skeleton if message prop is missing, but isTyping', () => {
    const wrapper = mount(<Item name="Ron" isTyping />)
    const o = wrapper.find(Skeleton.Text)

    expect(o.length).not.toBeTruthy()
  })

  test('Does not render meta content if isLoading', () => {
    const wrapper = mount(<Item />)
    const o = wrapper.find('div.c-ChatListItem__meta')

    expect(o.length).toBe(0)
  })

  test('Adds isLoading styles', () => {
    const wrapper = mount(<Item />)
    const o = wrapper.find(Link)

    expect(o.hasClass('is-loading')).toBeTruthy()
  })
})

describe('Timestamp', () => {
  test('Does not render if isLoading', () => {
    const wrapper = mount(<Item name="Ron" />)
    const o = wrapper.find(Timestamp)

    expect(o.length).toBe(0)
  })

  test('Renders if defined', () => {
    const wrapper = mount(
      <Item name="Ron" message="Stay classy!" timestamp="noon" />
    )
    const o = wrapper.find(Timestamp)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('noon')
  })
})

describe('Tags', () => {
  test('Does not render tags by default', () => {
    const wrapper = mount(<Item name="Ron" message="Stay classy!" />)
    const o = wrapper.find('div.c-ChatListItem__tags')

    expect(o.length).toBe(0)
  })

  test('Renders tags within an Overflow', () => {
    const tagData = [
      {
        color: 'red',
        children: 'RED',
      },
    ]

    const wrapper = mount(
      <Item name="Ron" message="Stay classy!" tags={tagData} />
    )

    const overflow = wrapper.find(Overflow)
    const tags = overflow.find(Tag)

    expect(overflow.length).toBe(1)
    expect(tags.length).toBe(1)
    expect(tags.props().color).toBe('red')
    expect(tags.props().children).toBe('RED')
  })
})

describe('Typing', () => {
  test('Does not show LoadingDots by default', () => {
    const wrapper = mount(<Item />)
    const o = wrapper.find(LoadingDots)

    expect(o.length).toBe(0)
  })

  test('Renders LoadingDots if isTyping', () => {
    const wrapper = mount(<Item name="Ron" isTyping />)
    const o = wrapper.find(LoadingDots)

    expect(o.length).toBe(1)
  })
})

describe('Viewing', () => {
  test('Does not render isViewing styles by default', () => {
    const wrapper = mount(<Item name="Ron" message="Stay classy!" />)
    const o = wrapper.find(Link)

    expect(o.hasClass('is-viewing')).toBe(false)
  })

  test('Renders isViewing flag, if defined', () => {
    const wrapper = mount(<Item name="Ron" message="Stay classy!" isViewing />)
    const o = wrapper.find(Link)
    const viewing = wrapper.find('div.c-ChatListItem__viewing')
    const animate = viewing.find(Animate)
    const flag = viewing.find('div.c-ChatListItem__viewingFlag')

    expect(o.hasClass('is-viewing')).toBe(true)
    expect(viewing.length).toBe(1)
    expect(animate.length).toBe(1)
    expect(flag.length).toBe(1)
  })
})

describe('Waiting', () => {
  test('Does not render isWaiting styles by default', () => {
    const wrapper = mount(<Item name="Ron" message="Stay classy!" />)
    const o = wrapper.find(Link)

    expect(o.hasClass('is-waiting')).toBe(false)
  })

  test('Renders Waiting tag, if defined', () => {
    const wrapper = mount(<Item name="Ron" message="Stay classy!" isWaiting />)
    const o = wrapper.find(Link)
    const waiting = wrapper.find('div.c-ChatListItem__waiting')
    const animate = waiting.find(Animate)
    const tag = animate.find(Tag)

    expect(o.hasClass('is-waiting')).toBe(true)
    expect(waiting.length).toBe(1)
    expect(tag.length).toBe(1)
    expect(tag.props().pulsing).toBe(true)
  })
})
