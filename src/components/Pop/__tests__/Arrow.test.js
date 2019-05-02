import * as React from 'react'
import { mount } from 'enzyme'
import Arrow, { getPlacement, getPosition, sanitizeStyles } from '../Pop.Arrow'
import { resetStyles } from '../../styled/testHelpers'

describe('Arrow', () => {
  afterEach(() => {
    resetStyles()
  })

  describe('Styles', () => {
    test('Renders placement styles', () => {
      const wrapper = mount(<Arrow placement="top" />)
      const el = wrapper.find('div.c-PopArrow').first()

      expect(el.getDOMNode().classList.contains('is-top')).toBe(true)

      wrapper.setProps({ placement: 'bottom' })

      expect(el.getDOMNode().classList.contains('is-top')).toBe(false)
      expect(el.getDOMNode().classList.contains('is-bottom')).toBe(true)
    })

    test('Renders placement/position styles', () => {
      const wrapper = mount(<Arrow placement="top-start" />)
      const el = wrapper.find('div.c-PopArrow').first()

      expect(el.getDOMNode().classList.contains('is-top')).toBe(true)
      expect(el.getDOMNode().classList.contains('is-start')).toBe(true)

      wrapper.setProps({ placement: 'bottom-end' })

      expect(el.getDOMNode().classList.contains('is-top')).toBe(false)
      expect(el.getDOMNode().classList.contains('is-start')).toBe(false)
      expect(el.getDOMNode().classList.contains('is-bottom')).toBe(true)
      expect(el.getDOMNode().classList.contains('is-end')).toBe(true)
    })

    test('Renders visible styles', () => {
      const wrapper = mount(<Arrow showArrow={false} />)
      const el = wrapper.find('.c-PopPopperArrowWrapper').first()

      expect(el.getDOMNode().classList.contains('is-hidden')).toBe(true)

      wrapper.setProps({ showArrow: true })

      expect(el.getDOMNode().classList.contains('is-hidden')).toBe(false)
    })
  })
})

describe('getPlacement', () => {
  test('Returns placement from a single placement source', () => {
    expect(getPlacement()).toBe('')
    expect(getPlacement('top')).toBe('top')
    expect(getPlacement('right')).toBe('right')
    expect(getPlacement('bottom')).toBe('bottom')
    expect(getPlacement('left')).toBe('left')
  })

  test('Returns placement from a combined placement source', () => {
    expect(getPlacement('top-start')).toBe('top')
    expect(getPlacement('right-end')).toBe('right')
    expect(getPlacement('bottom-start')).toBe('bottom')
    expect(getPlacement('left-end')).toBe('left')
  })
})

describe('getPosition', () => {
  test('Returns blank from a single placement source', () => {
    expect(getPosition()).toBe('')
    expect(getPosition('top')).toBe('')
    expect(getPosition('right')).toBe('')
    expect(getPosition('bottom')).toBe('')
    expect(getPosition('left')).toBe('')
  })

  test('Returns position from a combined placement source', () => {
    expect(getPosition('top-start')).toBe('start')
    expect(getPosition('right-end')).toBe('end')
    expect(getPosition('bottom-start')).toBe('start')
    expect(getPosition('left-end')).toBe('end')
  })
})

describe('sanitizeStyles', () => {
  test('Returns NaN as zero', () => {
    const results = sanitizeStyles({ top: NaN, left: NaN })

    expect(results.top).toBe(0)
    expect(results.left).toBe(0)
  })

  test('Return zero as zero', () => {
    const results = sanitizeStyles({ top: 0, left: 0 })

    expect(results.top).toBe(0)
    expect(results.left).toBe(0)
  })

  test('Return number as number', () => {
    const results = sanitizeStyles({ top: 123, left: 456 })

    expect(results.top).toBe(123)
    expect(results.left).toBe(456)
  })
})
