import React from 'react'
import { shallow } from 'enzyme'
import Image from '../Image'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Image />)

    expect(wrapper.hasClass('c-SkeletonImage')).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Image className="ron" />)

    expect(wrapper.hasClass('c-SkeletonImage')).toBeTruthy()
    expect(wrapper.hasClass('ron')).toBeTruthy()
  })
})
