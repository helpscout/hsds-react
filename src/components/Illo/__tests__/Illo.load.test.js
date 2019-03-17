import React from 'react'
import { mount } from 'enzyme'
import Illo, { svgSet, load } from '../Illo'

test('Is not set by default', () => {
  expect(svgSet).toEqual({})

  const wrapper = mount(<Illo name="bulb" />)
  expect(wrapper.html()).not.toContain('svg')
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
