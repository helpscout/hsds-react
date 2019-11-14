import React from 'react'
import { mount } from 'enzyme'
import Form from '../Form'

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
