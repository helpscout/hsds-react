import React from 'react'
import { mount } from 'enzyme'
import Heading from '../Heading'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<Heading />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonHeading')
    ).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Heading className="ron" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonHeading')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('ron')).toBeTruthy()
  })
})
