import React from 'react'
import { mount } from 'enzyme'
import AvatarList, { getAvatarSize } from './AvatarList'
import { Animate, Avatar, Tooltip } from '../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<AvatarList />)
    const el = wrapper.find('.c-AvatarList')

    expect(el.length).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<AvatarList className={customClass} />)
    const el = wrapper.find(`.${customClass}`)

    expect(el.length).toBeTruthy()
  })

  test('Adds horizontal stack class when appropriate', () => {
    const wrapper = mount(<AvatarList stack="horizontal" />)
    const el = wrapper.find('.horizontally-stacked')

    expect(el.length).toBeTruthy()
  })

  test('Adds vertical stack class when appropriate', () => {
    const wrapper = mount(<AvatarList stack="vertical" />)
    const el = wrapper.find('.vertically-stacked')

    expect(el.length).toBeTruthy()
  })

  test('Adds grid class when appropriate', () => {
    const wrapper = mount(<AvatarList grid />)
    const el = wrapper.find('.is-grid')

    expect(el.length).toBeTruthy()
  })

  test('Adds center class when appropriate', () => {
    const wrapper = mount(<AvatarList center />)
    const el = wrapper.find('.is-center')

    expect(el.length).toBeTruthy()
  })
})

describe('AvatarList', () => {
  test('get correct avatar size when horizontally stacked', () => {
    expect(getAvatarSize({ stack: 'horizontal', count: 3, max: 2 })).toBe('lg')
    expect(getAvatarSize({ stack: 'horizontal', count: 3, max: 3 })).toBe('md')
    expect(getAvatarSize({ stack: 'horizontal', count: 1, max: 2 })).toBe('xl')
  })
})

describe('Animation', () => {
  test('Wraps children in an Animate', () => {
    const wrapper = mount(
      <AvatarList>
        <Avatar />
      </AvatarList>
    )
    const anime = wrapper.find(Animate)
    const avatar = wrapper.find(Avatar)

    expect(anime.length).toBeTruthy()
    expect(avatar.length).toBeTruthy()
  })
})

describe('Limit', () => {
  test('Can limit the amount of avatars', () => {
    const max = 2
    const wrapper = mount(
      <AvatarList max={max}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarList>
    )
    const avatar = wrapper.find(Avatar)
    const additionalCounter = avatar.last()

    expect(avatar.length).toBe(max)
    expect(additionalCounter.text()).toContain('+3')
  })

  test('Cannot set limit to zero (0)', () => {
    const wrapper = mount(
      <AvatarList max={0}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarList>
    )
    const avatar = wrapper.find(Avatar)
    const additionalCounter = avatar.last()

    expect(avatar.length).toBe(4)
    expect(additionalCounter.text()).not.toBe('+2')
  })

  test('should add a tooltip to the extra avatar', () => {
    const max = 2
    const wrapper = mount(
      <AvatarList
        stack="vertical"
        max={max}
        extraTooltipProps={{
          title: ['John', 'Paul', 'Ringo'].join('\n'),
          placement: 'bottom',
        }}
      >
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarList>
    )
    const tooltip = wrapper.find(Tooltip)

    expect(tooltip.length).toBe(1)
  })
})
