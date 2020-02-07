import React from 'react'
import { mount } from 'enzyme'
import { AvatarStack } from './AvatarStack'
import { Animate, Avatar } from '../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<AvatarStack />)
    const o = wrapper.find('div.c-AvatarStack')

    expect(o.hasClass('c-AvatarStack')).toBeTruthy()
    expect(o.hasClass('is-withLayerStack')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<AvatarStack className={customClass} />)
    const o = wrapper.find('div.c-AvatarStack')

    expect(o.prop('className')).toContain(customClass)
  })
})

describe('Animation', () => {
  test('Can set custom Animate sequences', () => {
    const wrapper = mount(
      <AvatarStack animationSequence="fade">
        <Avatar />
      </AvatarStack>
    )
    const props = wrapper.find(Animate).props()

    expect(props.sequence).toBe('fade')
  })
})

describe('Limit', () => {
  test('Can limit the amount of avatars', () => {
    const wrapper = mount(
      <AvatarStack max={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const avatar = wrapper.find(Avatar)
    const limitCount = 2 // to account for the additional counter

    expect(avatar.length).toBe(limitCount)
  })

  test('Cannot set limit to zero (0)', () => {
    const wrapper = mount(
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

describe('Avatar Props', () => {
  test('Passes props to Avatar', () => {
    const wrapper = mount(
      <AvatarStack
        borderColor="red"
        outerBorderColor="blue"
        showStatusBorderColor={true}
      >
        <Avatar />
      </AvatarStack>
    )
    // Account for HOC
    const avatar = wrapper
      .find(Avatar)
      .find('Avatar')
      .last()

    expect(avatar.prop('borderColor')).toBe('red')
    expect(avatar.prop('outerBorderColor')).toBe('blue')
    expect(avatar.prop('showStatusBorderColor')).toBe(true)
  })
})

describe('Avatar stacking', () => {
  test('Adds layer stack className', () => {
    const wrapper = mount(
      <AvatarStack>
        <Avatar />
      </AvatarStack>
    )
    const el = wrapper.find('div.c-AvatarStack__item')

    expect(el.hasClass('is-withLayerStack')).toBe(true)
  })

  test('Single avatars render xl sizes', () => {
    const wrapper = mount(
      <AvatarStack>
        <Avatar />
      </AvatarStack>
    )
    const comp = wrapper.find('Avatar').last()

    expect(comp.prop('size')).toBe('xl')
  })

  test('2 avatars render lg sizes', () => {
    const wrapper = mount(
      <AvatarStack>
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const comp = wrapper.find('Avatar').last()

    expect(comp.prop('size')).toBe('lg')
  })

  test('3 avatars render md sizes', () => {
    const wrapper = mount(
      <AvatarStack>
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const comp = wrapper.find('Avatar').last()

    expect(comp.prop('size')).toBe('md')
  })

  test('3+ avatars render md sizes', () => {
    const wrapper = mount(
      <AvatarStack>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const comp = wrapper.find('Avatar').last()

    expect(comp.prop('size')).toBe('md')
  })

  test('Adjusts z-index with layering for odd avatar counts', () => {
    const wrapper = mount(
      <AvatarStack>
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const els = wrapper.find('div.c-AvatarStack__item')
    const one = els.at(0)
    const two = els.at(1)
    const three = els.at(2)

    expect(two.prop('style').zIndex).toBeGreaterThan(one.prop('style').zIndex)
    expect(two.prop('style').zIndex).toBeGreaterThan(three.prop('style').zIndex)
    expect(one.prop('style').zIndex).toBeGreaterThan(three.prop('style').zIndex)
  })

  test('Adjusts z-index linearly for even avatar counts', () => {
    const wrapper = mount(
      <AvatarStack>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const els = wrapper.find('div.c-AvatarStack__item')
    const one = els.at(0)
    const two = els.at(1)
    const three = els.at(2)
    const four = els.at(3)

    expect(three.prop('style').zIndex).toBeGreaterThan(
      four.prop('style').zIndex
    )
    expect(two.prop('style').zIndex).toBeGreaterThan(three.prop('style').zIndex)
    expect(one.prop('style').zIndex).toBeGreaterThan(two.prop('style').zIndex)
  })
})
