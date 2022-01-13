import React from 'react'
import { render, act } from '@testing-library/react'
import CopyButton from './CopyButton'
import userEvent from '@testing-library/user-event'

jest.useFakeTimers()

describe('ClassName', () => {
  test('Has default component className', () => {
    const { getByTestId } = render(<CopyButton />)

    expect(getByTestId('Button')).toHaveClass('c-CopyButton')
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const { getByTestId } = render(<CopyButton className={className} />)

    expect(getByTestId('Button')).toHaveClass(className)
  })
})

describe('Timeout', () => {
  test('Clears timeout on unmount', () => {
    const spy = jest.spyOn(window, 'clearTimeout')
    const { getByTestId, unmount } = render(<CopyButton />)
    act(() => {
      userEvent.click(getByTestId('Button'))
      unmount()
    })
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  test('Clears timeout on the second click', () => {
    const spy = jest.spyOn(window, 'clearTimeout')
    const { getByTestId } = render(<CopyButton />)
    act(() => {
      userEvent.click(getByTestId('Button'))
      userEvent.click(getByTestId('Button'))
    })

    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })

  test('Renders, then resets confirmation UI on click', () => {
    const { getByTestId } = render(<CopyButton />)
    act(() => {
      userEvent.click(getByTestId('Button'))
    })
    expect(getByTestId('Button')).toHaveClass('is-copyConfirmed')

    act(() => {
      jest.runAllTimers()
    })
    expect(getByTestId('Button')).not.toHaveClass('is-copyConfirmed')
  })

  test('Fires onReset callback when timeout completes', () => {
    const spy = jest.fn()
    const { getByTestId } = render(<CopyButton onReset={spy} />)
    act(() => {
      userEvent.click(getByTestId('Button'))

      jest.runAllTimers()
    })
    expect(spy).toHaveBeenCalled()
  })
})
