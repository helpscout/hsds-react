import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import Control from '../Skeleton.Control'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<Control />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonControl')
    ).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Control className="ron" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonControl')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('ron')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Can render size styles, if defined', () => {
    const wrapper = mount(<Control size="sm" />)

    expect(wrapper.getDOMNode().classList.contains('is-sm')).toBeTruthy()
  })
})
