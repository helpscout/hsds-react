import React from 'react'
import { mount, render } from 'enzyme'
import { AvatarList } from './AvatarList'
import { Animate, Avatar } from '../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = render(<AvatarList />)
    const el = wrapper.find('.c-AvatarList')

    expect(el.length).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = render(<AvatarList className={customClass} />)
    const el = wrapper.find('.c-AvatarList')

    expect(el.hasClass(customClass)).toBe(true)
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
})
