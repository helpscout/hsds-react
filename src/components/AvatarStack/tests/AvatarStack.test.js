import React from 'react'
import { shallow } from 'enzyme'
import AvatarStack from '..'
import { AnimateGroup, Animate, Avatar, Text } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<AvatarStack />)
    const o = wrapper.find('.c-AvatarStack')

    expect(o.hasClass('c-AvatarStack')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<AvatarStack className={customClass} />)
    const o = wrapper.find('.c-AvatarStack')

    expect(o.prop('className')).toContain(customClass)
  })
})

describe('Animation', () => {
  test('Wraps children in an Animate, within an AnimateGroup', () => {
    const wrapper = shallow(
      <AvatarStack>
        <Avatar />
      </AvatarStack>
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
      <AvatarStack>
        <Avatar />
      </AvatarStack>
    )
    const props = wrapper.find(AnimateGroup).props()

    expect(props.stagger).toBe(true)
    expect(props.staggerDelay).not.toBe(null)
  })

  test('Can set custom AnimateGroup props', () => {
    const wrapper = shallow(
      <AvatarStack animationStagger={1000}>
        <Avatar />
      </AvatarStack>
    )
    const props = wrapper.find(AnimateGroup).props()

    expect(props.staggerDelay).toBe(1000)
  })

  test('Can set custom Animate sequences', () => {
    const wrapper = shallow(
      <AvatarStack animationSequence='fade'>
        <Avatar />
      </AvatarStack>
    )
    const props = wrapper.find(Animate).props()

    expect(props.sequence).toBe('fade')
  })
})

describe('Children', () => {
  test('Discards non-Avatar children', () => {
    const wrapper = shallow(
      <AvatarStack>
        <Avatar />
        <Text />
      </AvatarStack>
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
      <AvatarStack max={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const avatar = wrapper.find(Avatar)
    const additionalCounter = avatar.last()
    const limitCount = 3 // to account for the additional counter

    expect(avatar.length).toBe(limitCount)
    expect(additionalCounter.html()).toContain('+2')
  })

  test('Cannot set limit to zero (0)', () => {
    const wrapper = shallow(
      <AvatarStack max={0}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const avatar = wrapper.find(Avatar)
    const additionalCounter = avatar.last()

    expect(avatar.length).toBe(4)
    expect(additionalCounter.text()).not.toBe('+2')
  })
})
