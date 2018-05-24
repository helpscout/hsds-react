import React from 'react'
import { shallow } from 'enzyme'
import Avatar from '../Avatar'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Avatar />)

    expect(wrapper.hasClass('c-SkeletonAvatar')).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Avatar className="ron" />)

    expect(wrapper.hasClass('c-SkeletonAvatar')).toBeTruthy()
    expect(wrapper.hasClass('ron')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Can render size styles, if defined', () => {
    const wrapper = shallow(<Avatar size="sm" />)

    expect(wrapper.hasClass('is-sm')).toBeTruthy()
  })

  test('Can render shape styles, if defined', () => {
    const wrapper = shallow(<Avatar shape="square" />)

    expect(wrapper.hasClass('is-square')).toBeTruthy()
  })
})
