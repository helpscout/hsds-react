import React from 'react'
import { shallow } from 'enzyme'
import AvatarList from '..'
import { AnimateGroup, Animate, Avatar, Text } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<AvatarList />)
    const o = wrapper.find('.c-AvatarList')

    expect(o.hasClass('c-AvatarList')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<AvatarList className={customClass} />)
    const o = wrapper.find('.c-AvatarList')

    expect(o.prop('className')).toContain(customClass)
  })
})

describe('Animation', () => {
  test('Wraps children in an Animate, within an AnimateGroup', () => {
    const wrapper = shallow(
      <AvatarList>
        <Avatar />
      </AvatarList>
    )
    const o = wrapper.find(AnimateGroup)
    const anime = o.find(Animate)
    const avatar = o.find(Avatar)

    expect(o.length).toBe(1)
    expect(anime.length).toBe(1)
    expect(avatar.length).toBe(1)
  })

  test('Passes staggering props to AnimateGroup', () => {
    const wrapper = shallow(
      <AvatarList>
        <Avatar />
      </AvatarList>
    )
    const props = wrapper.find(AnimateGroup).props()

    expect(props.stagger).toBe(true)
    expect(props.staggerDelay).toBeTruthy()
  })

  test('Can set custom AnimateGroup props', () => {
    const wrapper = shallow(
      <AvatarList animationStagger={1000}>
        <Avatar />
      </AvatarList>
    )
    const props = wrapper.find(AnimateGroup).props()

    expect(props.staggerDelay).toBe(1000)
  })

  test('Can set custom Animate sequences', () => {
    const wrapper = shallow(
      <AvatarList animationSequence='fade'>
        <Avatar />
      </AvatarList>
    )
    const props = wrapper.find(Animate).props()

    expect(props.sequence).toBe('fade')
  })
})

describe('Children', () => {
  test('Discards non-Avatar children', () => {
    const wrapper = shallow(
      <AvatarList>
        <Avatar />
        <Text />
      </AvatarList>
    )
    const avatar = wrapper.find(Avatar)
    const text = wrapper.find(Text)

    expect(avatar.length).toBe(1)
    expect(text.length).toBe(0)
  })
})

describe('Limit', () => {
  test('Can limit the amount of avatars', () => {
    const wrapper = shallow(
      <AvatarList max={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarList>
    )
    const avatar = wrapper.find(Avatar)
    const additionalCounter = avatar.last()
    const limitCount = 2 // to account for the additional counter

    expect(avatar.length).toBe(limitCount)
    expect(additionalCounter.html()).toContain('+3')
  })

  test('Cannot set limit to zero (0)', () => {
    const wrapper = shallow(
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
})
