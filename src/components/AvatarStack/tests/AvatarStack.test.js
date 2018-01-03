import React from 'react'
import { shallow } from 'enzyme'
import AvatarStack from '..'
import Avatar from '../../Avatar'

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
    const wrapper = shallow(<AvatarStack avatars={avatars} className='channel4' />)

    const classNames = wrapper.prop('className')

    expect(classNames).toContain('channel4')
  })
})

describe('Avatars', () => {
  test('Renders Avatars', () => {
    const wrapper = shallow(<AvatarStack avatars={avatars} />)
    const avatar = wrapper.find(Avatar)

    expect(avatar.length).toBe(4)
  })

  test('Passes avatarsClassName to Avatar', () => {
    const wrapper = shallow(
      <AvatarStack avatars={avatars} avatarsClassName='ron' />
    )
    const avatar = wrapper.find(Avatar).first()

    expect(avatar.hasClass('ron')).toBe(true)
  })
})

describe('Border Color', () => {
  test('Has a default borderColor', () => {
    const wrapper = shallow(<AvatarStack avatars={avatars} />)
    const avatar = wrapper.find(Avatar).first()
    const borderColor = avatar.props().borderColor

    expect(borderColor).toBeTruthy()
  })

  test('Can customize borderColor', () => {
    const wrapper = shallow(<AvatarStack avatars={avatars} borderColor='red' />)
    const avatar = wrapper.find(Avatar).first()
    const borderColor = avatar.props().borderColor

    expect(borderColor).toBe('red')
  })
})

describe('Limit', () => {
  test('Can limit the amount of avatars', () => {
    const wrapper = shallow(<AvatarStack avatars={avatars} max={2} />)
    const avatar = wrapper.find(Avatar)
    const additionalCounter = avatar.last()
    const limitCount = 3 // to account for the additional counter

    expect(avatar.length).toBe(limitCount)
    expect(additionalCounter.html()).toContain('+2')
  })

  test('Cannot set limit to zero (0)', () => {
    const wrapper = shallow(<AvatarStack avatars={avatars} max={0} />)
    const avatar = wrapper.find(Avatar)
    const additionalCounter = avatar.last()

    expect(avatar.length).toBe(avatars.length)
    expect(additionalCounter.text()).not.toBe('+2')
  })
})

describe('Size', () => {
  test('Should have a default size', () => {
    const wrapper = shallow(<AvatarStack avatars={avatars} />)
    const avatar = wrapper.find(Avatar).first()

    expect(avatar.props().size).toBe('md')
  })

  test('Apply size classes', () => {
    const wrapper = shallow(<AvatarStack avatars={avatars} size='lg' />)
    const avatar = wrapper.find(Avatar).first()

    expect(avatar.props().size).toBe('lg')
  })
})
