import React from 'react'
import { isComponentOneOfType, isNativeSpanType, isNativeBlockType } from '../types'

describe('isComponentOneOfType', () => {
  test('Returns false for non-React elements', () => {
    expect(isComponentOneOfType(true)).toBeFalsy()
    expect(isComponentOneOfType({})).toBeFalsy()
    expect(isComponentOneOfType({type: 'a'})).toBeFalsy()
  })

  test('Returns false if React element does not contain type/does not match', () => {
    const o = React.createElement('a')
    expect(isComponentOneOfType(o)).toBeFalsy()
    expect(isComponentOneOfType(o, 'span')).toBeFalsy()
  })

  test('Accepts an array for second argument', () => {
    const o = React.createElement('a')
    expect(isComponentOneOfType(o, ['a', 'span'])).toBeTruthy()
  })

  test('Accepts a string for second argument', () => {
    const o = React.createElement('a')
    expect(isComponentOneOfType(o, 'a')).toBeTruthy()
  })
})

describe('isNativeSpanType', () => {
  test('Can recognize span React elements', () => {
    const types = [
      'a',
      'b',
      'bold',
      'em',
      'i',
      'span',
      'strong',
      'u'
    ]

    types.forEach(type => {
      const o = React.createElement(type)
      expect(isNativeSpanType(o)).toBeTruthy()
    })
  })
})

describe('isNativeBlockType', () => {
  test('Can recognize block React elements', () => {
    const types = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'blockquote',
      'header', 'main', 'section', 'aside',
      'figure',
      'div'
    ]

    types.forEach(type => {
      const o = React.createElement(type)
      expect(isNativeBlockType(o)).toBeTruthy()
    })
  })
})
