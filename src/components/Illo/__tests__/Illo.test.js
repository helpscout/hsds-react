import React from 'react'
import { mount } from 'enzyme'
import Illo from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Illo name="chatListBlankSlate" />)

    expect(wrapper.hasClass('c-Illo')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(
      <Illo name="chatListBlankSlate" className={className} />
    )

    expect(wrapper.hasClass(className)).toBe(true)
  })
})

describe('Color', () => {
  test('Adds a custom color style, if supplied', () => {
    const wrapper = mount(<Illo name="tick" size="40" color="red" />)
    const el = wrapper.find('span').first()

    expect(wrapper.hasClass('has-color')).toBe(true)
    expect(el.prop('style').color).toContain('red')
  })

  test('Adds a custom secondary color className, if supplied', () => {
    const wrapper = mount(
      <Illo name="tick" size="40" color="red" colorSecondary="blue" />
    )
    const el = wrapper.find('span').first()

    expect(wrapper.hasClass('has-colorSecondary')).toBe(true)
    expect(el.prop('style').color).toContain('red')
  })
})

describe('Sizes', () => {
  test('Add sizing styles if applied', () => {
    const wrapper = mount(<Illo name="chatListBlankSlate" size="40" />)

    expect(wrapper.hasClass('is-40')).toBe(true)
  })
})
