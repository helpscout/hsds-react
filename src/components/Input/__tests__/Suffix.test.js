import React from 'react'
import { mount } from 'enzyme'
import Suffix from '../Suffix'

describe('Input/Suffix', () => {
  describe('ClassName', () => {
    test('Has the correct CSS class', () => {
      const wrapper = mount(<Suffix />)

      expect(
        wrapper.getDOMNode().classList.contains('c-InputSuffix')
      ).toBeTruthy()
    })

    test('Accepts additional classNames', () => {
      const wrapper = mount(<Suffix className="mugatu" />)

      expect(wrapper.getDOMNode().classList.contains('mugatu')).toBeTruthy()
    })
  })

  describe('Style', () => {
    test('Can render seamless styles', () => {
      const wrapper = mount(<Suffix isSeamless />)

      expect(wrapper.getDOMNode().classList.contains('is-seamless')).toBe(true)
    })

    test('Can render action styles', () => {
      const wrapper = mount(<Suffix isAction />)

      expect(wrapper.getDOMNode().classList.contains('is-action')).toBe(true)
    })
  })
})
