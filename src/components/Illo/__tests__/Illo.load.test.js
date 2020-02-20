import React from 'react'
import { mount } from 'enzyme'
import Illo from '../Illo'
import { svgSet, load, unload } from '../Illo.utils'

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
  const bulb = () => '<svg><path></path></svg>'
  const chat = () => '<svg><path></path></svg>'

  const svgs = {
    bulb,
    chat,
  }

  load(svgs)
  expect(svgSet).toEqual(svgs)

  const wrapper = mount(<Illo name="bulb" />)
  expect(wrapper.find(bulb).length).toBeTruthy()
})

test('Can be reset with unload', () => {
  const bulb = () => '<svg><path></path></svg>'
  const chat = () => '<svg><path></path></svg>'

  const svgs = {
    bulb,
    chat,
  }

  load(svgs)
  expect(svgSet).toEqual(svgs)

  unload()

  const wrapper = mount(<Illo name="bulb" />)
  expect(wrapper.find(bulb).length).toBeFalsy()
})
