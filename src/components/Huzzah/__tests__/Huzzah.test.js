import React from 'react'
import { mount, shallow } from 'enzyme'
import Huzzah, { DEFAULT_HUZZAH } from '../index'

describe('ClassName', () => {
  test('Renders default className', () => {
    const wrapper = mount(<Huzzah />)

    expect(wrapper.hasClass('c-Huzzah')).toBe(true)
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Huzzah className="gator" />)

    expect(wrapper.hasClass('c-Huzzah')).toBe(true)
    expect(wrapper.hasClass('gator')).toBe(true)
  })
})

describe('Huzzah: Name', () => {
  test('Renders Huzzah SVG, if defined', () => {
    const wrapper = mount(<Huzzah name="rocket" />)

    expect(wrapper.html()).toContain('rocket')
    expect(wrapper.html()).toContain('svg')
  })

  test('Renders fallback Huzzah SVG', () => {
    const wrapper = mount(<Huzzah />)

    expect(wrapper.html()).toContain(DEFAULT_HUZZAH)
    expect(wrapper.html()).toContain('svg')
  })
})

describe('Random', () => {
  test('Can render a random Huzzah', () => {
    const wrapper = mount(<Huzzah isRandom />)

    expect(wrapper.html()).toContain('svg')
  })
})

describe('Size', () => {
  test('Can render an alternative size style', () => {
    const wrapper = mount(<Huzzah size="sm" />)

    expect(wrapper.hasClass('is-sm')).toBe(true)
  })
})
