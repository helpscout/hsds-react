import * as React from 'react'
import { mount } from 'enzyme'
import Heading from '../Skeleton.Heading'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<Heading />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonHeading')
    ).toBeTruthy()
  })

  test('Has size className', () => {
    const wrapper = mount(<Heading size="sm" />)
    expect(wrapper.getDOMNode().classList.contains('is-sm')).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Heading className="ron" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SkeletonHeading')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('ron')).toBeTruthy()
  })
})
