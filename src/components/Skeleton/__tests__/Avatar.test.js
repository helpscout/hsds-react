import * as React from 'react'
import { mount } from 'enzyme'
import Avatar from '../Skeleton.Avatar'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<Avatar />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonAvatar')
    ).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Avatar className="ron" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonAvatar')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('ron')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Can render size styles, if defined', () => {
    const wrapper = mount(<Avatar size="sm" />)

    expect(wrapper.getDOMNode().classList.contains('is-sm')).toBeTruthy()
  })

  test('Can render shape styles, if defined', () => {
    const wrapper = mount(<Avatar shape="square" />)

    expect(wrapper.getDOMNode().classList.contains('is-square')).toBeTruthy()
  })
})
