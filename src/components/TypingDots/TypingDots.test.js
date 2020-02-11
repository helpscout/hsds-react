import React from 'react'
import { cy } from '@helpscout/cyan'
import TypingDots from '..'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<TypingDots />)

    expect(wrapper.hasClass('c-TypingDots')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(<TypingDots className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    cy.render(<TypingDots data-cy="BlueBlueBlue" />)
    const el = cy.getByCy('BlueBlueBlue')

    expect(el.exists()).toBeTruthy()
  })
})
