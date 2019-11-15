import React from 'react'
import { mount } from 'enzyme'
import Form from '../Form'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Form />)

    expect(wrapper.getDOMNode().classList.contains('c-Form')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'schrute'
    const wrapper = mount(<Form className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const text = 'Hello'
    const wrapper = mount(
      <Form>
        <div className="child">{text}</div>
      </Form>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain(text)
  })
})
