import React from 'react'
import { render } from '@testing-library/react'
import TypingDots from './TypingDots'

describe('Dots', () => {
  test('Should render dots', () => {
    const { container } = render(<TypingDots />)
    const dots = container.querySelectorAll('.Dot')

    expect(dots.length).toBe(3)
    expect(window.getComputedStyle(dots[0]).animationDelay).toBe('0s')
    expect(window.getComputedStyle(dots[1]).animationDelay).toBe('-1.1s')
    expect(window.getComputedStyle(dots[2]).animationDelay).toBe('-0.9s')
    expect(window.getComputedStyle(dots[0]).opacity).toBe('1')
    expect(window.getComputedStyle(dots[1]).opacity).toBe('0.6')
    expect(window.getComputedStyle(dots[2]).opacity).toBe('0.2')
  })
})
