import React from 'react'
import { mount } from 'enzyme'
import Backdrop from '../Backdrop'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Backdrop />)

    expect(wrapper.hasClass('c-InputBackdrop')).toBe(true)
  })

  test('Accepts custom className', () => {
    const className = 'milk-was-a-bad-choice'
    const wrapper = mount(<Backdrop className={className} />)

    expect(wrapper.hasClass(className)).toBe(true)
  })
})

describe('Styles', () => {
  test('Can render isFirst styles', () => {
    const wrapper = mount(<Backdrop isFirst />)

    expect(wrapper.hasClass('is-first')).toBe(true)
    expect(wrapper.hasClass('is-notOnly')).toBe(false)
    expect(wrapper.hasClass('is-last')).toBe(false)
  })

  test('Can render isNotOnly styles', () => {
    const wrapper = mount(<Backdrop isNotOnly />)

    expect(wrapper.hasClass('is-first')).toBe(false)
    expect(wrapper.hasClass('is-notOnly')).toBe(true)
    expect(wrapper.hasClass('is-last')).toBe(false)
  })

  test('Can render isLast styles', () => {
    const wrapper = mount(<Backdrop isLast />)

    expect(wrapper.hasClass('is-first')).toBe(false)
    expect(wrapper.hasClass('is-notOnly')).toBe(false)
    expect(wrapper.hasClass('is-last')).toBe(true)
  })

  test('Can render checkbox styles', () => {
    const wrapper = mount(<Backdrop checkbox />)

    expect(wrapper.hasClass('is-checkbox')).toBe(true)
  })
})
