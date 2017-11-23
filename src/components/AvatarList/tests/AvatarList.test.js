import React from 'react'
import { shallow } from 'enzyme'
import AvatarList from '..'
import { Avatar, AnimateGroup, Animate } from '../../index'

const avatars = [
  {
    name: 'Ron Burgandy'
  },
  {
    name: 'Champ Kind'
  },
  {
    name: 'Brian Fantana'
  },
  {
    name: 'Brick Tamland'
  }
]

describe('ClassNames', () => {
  test('Accept classNames', () => {
    const wrapper = shallow(<AvatarList avatars={avatars} className='channel4' />)

    const classNames = wrapper.prop('className')

    expect(classNames).toContain('channel4')
  })
})

describe('Avatars', () => {
  test('Renders Avatars', () => {
    const wrapper = shallow(<AvatarList avatars={avatars} />)
    const avatar = wrapper.find(Avatar)

    expect(avatar.length).toBe(4)
  })
})

describe('Animate', () => {
  test('Avatar are Animated, and added within an AnimateGroup', () => {
    const wrapper = shallow(<AvatarList avatars={avatars} />)
    const animateGroup = wrapper.find(AnimateGroup)
    const animate = wrapper.find(Animate)

    expect(animateGroup.length).toBeTruthy()
    expect(animate.length).toBe(4)
    expect(animate.first().find(Avatar).length).toBeTruthy()
  })
})

describe('Limit', () => {
  test('Can limit the amount of avatars', () => {
    const wrapper = shallow(<AvatarList avatars={avatars} max={2} />)
    const avatar = wrapper.find(Avatar)
    const additionalCounter = avatar.last()
    const limitCount = 3 // to account for the additional counter

    expect(avatar.length).toBe(limitCount)
    expect(additionalCounter.html()).toContain('+2')
  })

  test('Cannot set limit to zero (0)', () => {
    const wrapper = shallow(<AvatarList avatars={avatars} max={0} />)
    const avatar = wrapper.find(Avatar)
    const additionalCounter = avatar.last()

    expect(avatar.length).toBe(avatars.length)
    expect(additionalCounter.text()).not.toBe('+2')
  })
})

describe('Size', () => {
  test('Renders a sm size by default', () => {
    const wrapper = shallow(<AvatarList avatars={avatars} />)
    const avatar = wrapper.find(Avatar).first()

    expect(avatar.props().size).toBe('sm')
  })

  test('Apply size classes', () => {
    const wrapper = shallow(<AvatarList avatars={avatars} size='lg' />)
    const avatar = wrapper.find(Avatar).first()

    expect(avatar.props().size).toBe('lg')
  })
})
