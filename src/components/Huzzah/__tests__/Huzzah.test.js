import React from 'react'
import { mount } from 'enzyme'
import Huzzah from '../Huzzah'
import { DEFAULT_HUZZAH } from '../Huzzah.utils'

describe('ClassName', () => {
  test('Renders default className', () => {
    const wrapper = mount(<Huzzah />)

    expect(wrapper.getDOMNode().classList.contains('c-Huzzah')).toBe(true)
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Huzzah className="gator" />)

    expect(wrapper.getDOMNode().classList.contains('c-Huzzah')).toBe(true)
    expect(wrapper.getDOMNode().classList.contains('gator')).toBe(true)
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

    expect(wrapper.getDOMNode().classList.contains('is-sm')).toBe(true)
  })
})
