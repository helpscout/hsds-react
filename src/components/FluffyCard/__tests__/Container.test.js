import React from 'react'
import { mount } from 'enzyme'
import Container from '../Container'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Container />)

    expect(
      wrapper.getDOMNode().classList.contains('c-FluffyCardContainer')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Container className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Container>
        <div className="child">Hello</div>
      </Container>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})
