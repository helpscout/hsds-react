import * as React from 'react'
import { mount } from 'enzyme'
import FormGroup from '../FormGroup'

describe('FormGroup', () => {
  describe('ClassName', () => {
    test('Applies custom className if specified', () => {
      const customClass = 'piano-key-neck-tie'
      const wrapper = mount(<FormGroup className={customClass} />)

      expect(wrapper.getDOMNode().classList.contains(customClass)).toBe(true)
    })
  })

  describe('Children', () => {
    test('Renders child content', () => {
      const wrapper = mount(
        <FormGroup>
          <div className="child">Hello</div>
        </FormGroup>
      )
      const el = wrapper.find('div.child')

      expect(el.text()).toContain('Hello')
    })
  })
})
