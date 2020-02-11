import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import SkeletonAvatar from '../Skeleton.Avatar'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<SkeletonAvatar />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonAvatar')
    ).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<SkeletonAvatar className="ron" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonAvatar')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('ron')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Can render size styles, if defined', () => {
    const wrapper = mount(<SkeletonAvatar size="sm" />)

    expect(wrapper.getDOMNode().classList.contains('is-sm')).toBeTruthy()
  })

  test('Can render shape styles, if defined', () => {
    const wrapper = mount(<SkeletonAvatar shape="square" />)

    expect(wrapper.getDOMNode().classList.contains('is-square')).toBeTruthy()
  })
})
