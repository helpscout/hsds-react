import React from 'react'
import { shallow } from 'enzyme'
import Heading from '../Heading'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = shallow(
      <Heading />
    )

    expect(wrapper.hasClass('c-SkeletonHeading')).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(
      <Heading className='ron' />
    )

    expect(wrapper.hasClass('c-SkeletonHeading')).toBeTruthy()
    expect(wrapper.hasClass('ron')).toBeTruthy()
  })
})
