import React from 'react'
import { mount } from 'enzyme'
import Backdrop from '../BackdropV2'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Backdrop />)

    expect(wrapper.hasClass('c-InputBackdropV2')).toBe(true)
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

  test('Can render choiceKind styles', () => {
    const wrapper = mount(<Backdrop choiceKind="checkbox" />)

    expect(wrapper.hasClass('is-checkbox')).toBe(true)
  })

  test('Can render read-only styles', () => {
    const wrapper = mount(<Backdrop readOnly />)

    expect(wrapper.hasClass('is-readonly')).toBe(true)
  })

  test('Can render disabled styles', () => {
    const wrapper = mount(<Backdrop disabled />)

    expect(wrapper.hasClass('is-disabled')).toBe(true)
  })

  test('Can render filled styles', () => {
    const wrapper = mount(<Backdrop isFilled />)

    expect(wrapper.hasClass('is-filled')).toBe(true)
  })

  test('Can render kind styles', () => {
    const wrapper = mount(<Backdrop kind="custom" />)

    expect(wrapper.hasClass('is-custom')).toBe(true)
  })
})

describe('Focus', () => {
  test('Can render focus styles', () => {
    const wrapper = mount(<Backdrop isFocused />)

    expect(wrapper.hasClass('is-focused')).toBe(true)
  })

  test('Does not render focus styles, if specified', () => {
    const wrapper = mount(<Backdrop isFocused showFocus={false} />)

    expect(wrapper.hasClass('is-focused')).toBe(false)
    expect(wrapper.find('FocusUI').length).toBe(0)
  })

  test('Does not render focus styles, if seamless', () => {
    const wrapper = mount(<Backdrop isFocused showFocus={true} isSeamless />)

    expect(wrapper.hasClass('is-focused')).toBe(false)
    expect(wrapper.find('FocusUI').length).toBe(0)
  })

  test('Can render isFirst styles', () => {
    const wrapper = mount(<Backdrop isFocused isFirst />)
    const o = wrapper.find('.c-InputBackdropV2__focus')

    expect(o.hasClass('is-first')).toBe(true)
    expect(o.hasClass('is-notOnly')).toBe(false)
    expect(o.hasClass('is-last')).toBe(false)
  })

  test('Can render isNotOnly styles', () => {
    const wrapper = mount(<Backdrop isFocused isNotOnly />)
    const o = wrapper.find('.c-InputBackdropV2__focus')

    expect(o.hasClass('is-first')).toBe(false)
    expect(o.hasClass('is-notOnly')).toBe(true)
    expect(o.hasClass('is-last')).toBe(false)
  })

  test('Can render isLast styles', () => {
    const wrapper = mount(<Backdrop isFocused isLast />)
    const o = wrapper.find('.c-InputBackdropV2__focus')

    expect(o.hasClass('is-first')).toBe(false)
    expect(o.hasClass('is-notOnly')).toBe(false)
    expect(o.hasClass('is-last')).toBe(true)
  })
})
