import React from 'react'
import { mount } from 'enzyme'
import FormGroupChoice from '../Choice'

describe('FormGroupChoice', () => {
  describe('ClassName', () => {
    test('Applies custom className if specified', () => {
      const customClass = 'piano-key-neck-tie'
      const wrapper = mount(<FormGroupChoice className={customClass} />)

      expect(wrapper.prop('className')).toContain(customClass)
    })
  })

  describe('Children', () => {
    test('Renders child content', () => {
      const wrapper = mount(
        <FormGroupChoice>
          <div className="child">Hello</div>
        </FormGroupChoice>
      )
      const el = wrapper.find('div.child')

      expect(el.text()).toContain('Hello')
    })
  })

  describe('Styles', () => {
    test('Renders responsive styles, if specified', () => {
      const wrapper = mount(<FormGroupChoice isResponsive />)

      expect(wrapper.hasClass('is-responsive')).toBe(true)
    })
  })
})
