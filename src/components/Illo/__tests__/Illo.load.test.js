import React from 'react'
import { mount } from 'enzyme'
import Illo, { svgSet, load, unload } from '../Illo'

afterEach(() => {
  unload()
})

test('Is not set by default', () => {
  expect(svgSet).toEqual({})

  const wrapper = mount(<Illo name="bulb" />)
  expect(wrapper.html()).not.toContain('svg')
})

test('load defaults to an empty object', () => {
  load()
  expect(svgSet).toEqual({})
})

test('Can be set with load', () => {
  const svgs = {
    bulb: '<svg><path></path></svg>',
    chat: '<svg><path></path></svg>',
  }

  load(svgs)
  expect(svgSet).toEqual(svgs)

  const wrapper = mount(<Illo name="bulb" />)
  expect(wrapper.html()).toContain(svgs.bulb)
})

test('Can be reset with unload', () => {
  const svgs = {
    bulb: '<svg><path></path></svg>',
    chat: '<svg><path></path></svg>',
  }

  load(svgs)
  expect(svgSet).toEqual(svgs)

  unload()

  const wrapper = mount(<Illo name="bulb" />)
  expect(wrapper.html()).not.toContain(svgs.bulb)
})
