import React from 'react'
import { mount } from 'enzyme'
import Title from '../DetailList.Title'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Title />)
    const el = wrapper.find('dt.c-DetailListTitle')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Title className={customClass} />)
    const el = wrapper.find('dt.c-DetailListTitle')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child', () => {
    const wrapper = mount(
      <Title>
        <div className="child">Hello</div>
      </Title>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})
