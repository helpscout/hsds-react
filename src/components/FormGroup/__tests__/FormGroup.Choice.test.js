import React from 'react'
import { shallow } from 'enzyme'
import FormGroupChoice from '../Choice'

describe('FormGroupChoice', () => {
  describe('ClassName', () => {
    test('Applies custom className if specified', () => {
      const customClass = 'piano-key-neck-tie'
      const wrapper = shallow(<FormGroupChoice className={customClass} />)

      expect(wrapper.prop('className')).toContain(customClass)
    })
  })

  describe('Children', () => {
    test('Renders child content', () => {
      const wrapper = shallow(
        <FormGroupChoice>
          <div className="child">Hello</div>
        </FormGroupChoice>
      )
      const el = wrapper.find('div.child')

      expect(el.text()).toContain('Hello')
    })
  })
})
