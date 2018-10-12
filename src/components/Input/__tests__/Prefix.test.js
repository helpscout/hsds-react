import React from 'react'
import { mount } from 'enzyme'
import Prefix from '../Prefix'

describe('Input/Prefix', () => {
  describe('ClassName', () => {
    test('Has the correct CSS class', () => {
      const wrapper = mount(<Prefix />)

      expect(wrapper.hasClass('c-InputPrefix')).toBeTruthy()
    })

    test('Accepts additional classNames', () => {
      const wrapper = mount(<Prefix className="mugatu" />)

      expect(wrapper.hasClass('mugatu')).toBeTruthy()
    })
  })

  describe('Style', () => {
    test('Can render seamless styles', () => {
      const wrapper = mount(<Prefix isSeamless />)

      expect(wrapper.hasClass('is-seamless')).toBe(true)
    })
  })
})
