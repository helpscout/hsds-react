import React from 'react'
import { mount } from 'enzyme'
import Backdrop from '../Input.BackdropV2'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Backdrop />)

    expect(wrapper.getDOMNode().classList.contains('c-InputBackdropV2')).toBe(
      true
    )
  })

  test('Accepts custom className', () => {
    const className = 'milk-was-a-bad-choice'
    const wrapper = mount(<Backdrop className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Styles', () => {
  test('Can render isFirst styles', () => {
    const wrapper = mount(<Backdrop isFirst />)

    expect(wrapper.getDOMNode().classList.contains('is-first')).toBe(true)
    expect(wrapper.getDOMNode().classList.contains('is-notOnly')).toBe(false)
    expect(wrapper.getDOMNode().classList.contains('is-last')).toBe(false)
  })

  test('Can render isNotOnly styles', () => {
    const wrapper = mount(<Backdrop isNotOnly />)

    expect(wrapper.getDOMNode().classList.contains('is-first')).toBe(false)
    expect(wrapper.getDOMNode().classList.contains('is-notOnly')).toBe(true)
    expect(wrapper.getDOMNode().classList.contains('is-last')).toBe(false)
  })

  test('Can render isLast styles', () => {
    const wrapper = mount(<Backdrop isLast />)

    expect(wrapper.getDOMNode().classList.contains('is-first')).toBe(false)
    expect(wrapper.getDOMNode().classList.contains('is-notOnly')).toBe(false)
    expect(wrapper.getDOMNode().classList.contains('is-last')).toBe(true)
  })

  test('Can render choiceKind styles', () => {
    const wrapper = mount(<Backdrop choiceKind="checkbox" />)

    expect(wrapper.getDOMNode().classList.contains('is-checkbox')).toBe(true)
  })

  test('Can render read-only styles', () => {
    const wrapper = mount(<Backdrop readOnly />)

    expect(wrapper.getDOMNode().classList.contains('is-readonly')).toBe(true)
  })

  test('Can render is-radio styles', () => {
    const wrapper = mount(<Backdrop choiceKind="radio" />)

    expect(wrapper.getDOMNode().classList.contains('is-radio')).toBe(true)
  })

  test('Can render disabled styles', () => {
    const wrapper = mount(<Backdrop disabled />)

    expect(wrapper.getDOMNode().classList.contains('is-disabled')).toBe(true)
  })

  test('Can render filled styles', () => {
    const wrapper = mount(<Backdrop isFilled />)

    expect(wrapper.getDOMNode().classList.contains('is-filled')).toBe(true)
  })

  test('Can render kind styles', () => {
    const wrapper = mount(<Backdrop kind="custom" />)

    expect(wrapper.getDOMNode().classList.contains('is-custom')).toBe(true)
  })
})

describe('Focus', () => {
  test('Can render focus styles', () => {
    const wrapper = mount(<Backdrop isFocused />)

    expect(wrapper.getDOMNode().classList.contains('is-focused')).toBe(true)
  })

  test('Does not render focus styles, if specified', () => {
    const wrapper = mount(<Backdrop isFocused showFocus={false} />)

    expect(wrapper.getDOMNode().classList.contains('is-focused')).toBe(false)
    expect(wrapper.find('FocusUI').length).toBe(0)
  })

  test('Does not render focus styles, if seamless', () => {
    const wrapper = mount(<Backdrop isFocused showFocus={true} isSeamless />)

    expect(wrapper.getDOMNode().classList.contains('is-focused')).toBe(false)
    expect(wrapper.find('FocusUI').length).toBe(0)
  })

  test('Can render isFirst styles', () => {
    const wrapper = mount(<Backdrop isFocused isFirst />)
    const o = wrapper.find('.c-InputBackdropV2__focus').first()

    expect(o.getDOMNode().classList.contains('is-first')).toBe(true)
    expect(o.getDOMNode().classList.contains('is-notOnly')).toBe(false)
    expect(o.getDOMNode().classList.contains('is-last')).toBe(false)
  })

  test('Can render isNotOnly styles', () => {
    const wrapper = mount(<Backdrop isFocused isNotOnly />)
    const o = wrapper.find('.c-InputBackdropV2__focus').first()

    expect(o.getDOMNode().classList.contains('is-first')).toBe(false)
    expect(o.getDOMNode().classList.contains('is-notOnly')).toBe(true)
    expect(o.getDOMNode().classList.contains('is-last')).toBe(false)
  })

  test('Can render isLast styles', () => {
    const wrapper = mount(<Backdrop isFocused isLast />)
    const o = wrapper.find('.c-InputBackdropV2__focus').first()

    expect(o.getDOMNode().classList.contains('is-first')).toBe(false)
    expect(o.getDOMNode().classList.contains('is-notOnly')).toBe(false)
    expect(o.getDOMNode().classList.contains('is-last')).toBe(true)
  })

  test('Can render error state styles', () => {
    const wrapper = mount(<Backdrop isFocused state="error" />)
    const o = wrapper.find('.c-InputBackdropV2__focus').first()

    expect(o.getDOMNode().classList.contains('is-error')).toBe(true)
  })
})
