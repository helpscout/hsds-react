import React from 'react'
import { shallow } from 'enzyme'
import Control from '../Control'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Control />)

    expect(wrapper.hasClass('c-SkeletonControl')).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Control className="ron" />)

    expect(wrapper.hasClass('c-SkeletonControl')).toBeTruthy()
    expect(wrapper.hasClass('ron')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Can render size styles, if defined', () => {
    const wrapper = shallow(<Control size="sm" />)

    expect(wrapper.hasClass('is-sm')).toBeTruthy()
  })
})
