import React from 'react'
import { mount } from 'enzyme'
import Content from '../Content'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Content />)

    expect(
      wrapper.getDOMNode().classList.contains('c-ModalContent')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Content className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBe(true)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Content>
        <div className="child">Hello</div>
      </Content>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })

  test('Can handle null content', () => {
    const wrapper = mount(<Content>{[null]}</Content>)

    expect(wrapper).toBeTruthy()
  })
})
