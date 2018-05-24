import React from 'react'
import { shallow } from 'enzyme'
import Block from '../Block'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Block />)

    expect(wrapper.hasClass('c-SkeletonBlock')).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Block className="ron" />)

    expect(wrapper.hasClass('c-SkeletonBlock')).toBeTruthy()
    expect(wrapper.hasClass('ron')).toBeTruthy()
  })
})

describe('Accessibility', () => {
  test('Has role defined', () => {
    const wrapper = shallow(<Block />)

    expect(wrapper.props().role).toBe('presentation')
  })
})

describe('Styles', () => {
  test('Can render custom styles', () => {
    const wrapper = shallow(<Block style={{ background: 'red' }} />)

    expect(wrapper.props().style.background).toBe('red')
  })
})
