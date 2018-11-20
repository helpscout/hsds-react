import React from 'react'
import { mount } from 'enzyme'
import { AvatarList } from '../AvatarList'
import { Animate, Avatar, Text } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<AvatarList />)
    const o = wrapper.find('div.c-AvatarList')

    expect(o.hasClass('c-AvatarList')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<AvatarList className={customClass} />)
    const o = wrapper.find('div.c-AvatarList')

    expect(o.hasClass(customClass)).toBe(true)
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

describe('Children', () => {
  test('Discards non-Avatar children', () => {
    const wrapper = mount(
      <AvatarList>
        <Avatar />
        <Text />
      </AvatarList>
    )
    const avatar = wrapper.find(Avatar)
    const text = wrapper.find(Text)

    expect(avatar.length).toBeTruthy()
    expect(text.length).toBe(0)
  })
})

describe('Limit', () => {
  test('Can limit the amount of avatars', () => {
    const wrapper = mount(
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

describe('Avatar Props', () => {
  test('Passes props to Avatar', () => {
    const wrapper = mount(
      <AvatarList
        borderColor="red"
        outerBorderColor="blue"
        showStatusBorderColor={true}
      >
        <Avatar />
      </AvatarList>
    )
    const avatar = wrapper.find('Avatar').first()

    expect(avatar.prop('borderColor')).toBe('red')
    expect(avatar.prop('outerBorderColor')).toBe('blue')
    expect(avatar.prop('showStatusBorderColor')).toBe(true)
  })
})
