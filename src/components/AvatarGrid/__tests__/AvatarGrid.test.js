import React from 'react'
import { mount } from 'enzyme'
import AvatarGrid from '../AvatarGrid'
import { Animate, Avatar, Text } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<AvatarGrid />)
    const o = wrapper.find('div.c-AvatarGrid')

    expect(o.hasClass('c-AvatarGrid')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<AvatarGrid className={customClass} />)
    const o = wrapper.find('div.c-AvatarGrid')

    expect(o.prop('className')).toContain(customClass)
  })
})

describe('Animation', () => {
  test('Can set custom Animate sequences', () => {
    const wrapper = mount(
      <AvatarGrid animationSequence="fade">
        <Avatar />
      </AvatarGrid>
    )
    const props = wrapper.find(Animate).props()

    expect(props.sequence).toBe('fade')
  })
})

describe('Limit', () => {
  test('Can limit the amount of avatars', () => {
    const wrapper = mount(
      <AvatarGrid max={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGrid>
    )
    const avatar = wrapper.find(Avatar)
    const additionalCounter = avatar.last()
    const limitCount = 2 // to account for the additional counter

    expect(avatar.length).toBe(limitCount)
    expect(additionalCounter.html()).toContain('+3')
  })

  test('Cannot set limit to zero (0)', () => {
    const wrapper = mount(
      <AvatarGrid max={0}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarGrid>
    )
    const avatar = wrapper.find(Avatar)
    const additionalCounter = avatar.last()

    expect(avatar.length).toBe(4)
    expect(additionalCounter.text()).not.toBe('+2')
  })
})

describe('Avatar Props', () => {
  test('Passes props to Avatar', () => {
    const wrapper = mount(
      <AvatarGrid
        borderColor="red"
        outerBorderColor="blue"
        showStatusBorderColor={true}
      >
        <Avatar />
      </AvatarGrid>
    )
    const avatar = wrapper.find(Avatar)

    expect(avatar.prop('borderColor')).toBe('red')
    expect(avatar.prop('outerBorderColor')).toBe('blue')
    expect(avatar.prop('showStatusBorderColor')).toBe(true)
  })
})
