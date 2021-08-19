import React from 'react'
import { render } from '@testing-library/react'
import KeyboardBadge from '.'

describe('ClassName', () => {
  test('Has default className', () => {
    const { getByTestId } = render(<KeyboardBadge value="a" />)
    expect(getByTestId('KeyboardBadge')).toHaveClass('c-KeyboardBadge')
  })

  test('Accepts custom className', () => {
    const { getByTestId } = render(
      <KeyboardBadge value="a" className="zoolander" />
    )
    expect(getByTestId('KeyboardBadge')).toHaveClass('zoolander')
  })
})

describe('Content', () => {
  beforeEach(() => {
    jest.resetModules()

    const navigator = { ...global.navigator }

    Object.defineProperty(global, 'navigator', {
      value: navigator,
      writable: true,
    })
  })
  test('render a simple shortcut', () => {
    const { getByText } = render(<KeyboardBadge value="a" />)
    expect(getByText('a')).toBeTruthy()
  })

  test('on mac, mod is replace with the apple utf8 character', () => {
    global.navigator.userAgent = 'Mac OS X'
    const { getByText } = render(<KeyboardBadge value="mod+a" />)
    expect(getByText('⌘ + a')).toBeTruthy()
  })
  test('add space between the + sign', () => {
    global.navigator.userAgent = 'Mac OS X'
    const { getByText } = render(<KeyboardBadge value="mod+a" />)
    expect(getByText('⌘ + a')).toBeTruthy()
  })

  test('on pc/linux, replace mod with Ctrl', () => {
    global.navigator.userAgent = 'not mac'
    const { getByText } = render(<KeyboardBadge value="mod+a" />)
    expect(getByText('Ctrl + a')).toBeTruthy()
  })
})
