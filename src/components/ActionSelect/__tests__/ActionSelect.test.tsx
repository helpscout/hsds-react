import * as React from 'react'
import { cy } from '@helpscout/cyan'
import ActionSelect from '../ActionSelect'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<ActionSelect />)

    expect(wrapper.hasClass('c-ActionSelect')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(<ActionSelect className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = cy.render(<ActionSelect data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})
