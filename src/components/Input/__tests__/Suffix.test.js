import React from 'react'
import { mount } from 'enzyme'
import Suffix from '../Suffix'

describe('Input/Suffix', () => {
  describe('ClassName', () => {
    test('Has the correct CSS class', () => {
      const wrapper = mount(<Suffix />)

      expect(wrapper.hasClass('c-InputSuffix')).toBeTruthy()
    })

    test('Accepts additional classNames', () => {
      const wrapper = mount(<Suffix className="mugatu" />)

      expect(wrapper.hasClass('mugatu')).toBeTruthy()
    })
  })

  describe('Style', () => {
    test('Can render seamless styles', () => {
      const wrapper = mount(<Suffix isSeamless />)

      expect(wrapper.hasClass('is-seamless')).toBe(true)
    })
  })
})
