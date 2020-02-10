import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import Image from '../Skeleton.Image'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<Image />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonImage')
    ).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Image className="ron" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonImage')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('ron')).toBeTruthy()
  })
})
