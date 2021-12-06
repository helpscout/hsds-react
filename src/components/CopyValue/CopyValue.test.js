import React from 'react'
import { render, act } from '@testing-library/react'
import CopyValue from './CopyValue'
import userEvent from '@testing-library/user-event'

jest.useFakeTimers()

beforeAll(() => {
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  })
})

describe('ClassName', () => {
  test('Has default component className', () => {
    const { getByTestId } = render(<CopyValue value="test" />)

    expect(getByTestId('CopyValue')).toHaveClass('c-CopyValue')
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const { getByTestId } = render(
      <CopyValue className={className} value="test" />
    )

    expect(getByTestId('CopyValue')).toHaveClass(className)
  })
})

describe('Timeout', () => {
  test('Clears timeout on unmount', () => {
    const spy = jest.spyOn(window, 'clearTimeout')
    const { getByTestId, unmount } = render(<CopyValue value="test" />)
    act(() => {
      userEvent.click(getByTestId('IconButton'))
      unmount()
    })
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  test('Clears timeout on the second click', () => {
    const spy = jest.spyOn(window, 'clearTimeout')
    const { getByTestId } = render(<CopyValue value="test" />)
    act(() => {
      userEvent.click(getByTestId('IconButton'))
      userEvent.click(getByTestId('IconButton'))
    })

    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })

  test('Renders, then resets confirmation UI on click', () => {
    const { getByTestId } = render(<CopyValue value="test" />)
    act(() => {
      userEvent.click(getByTestId('IconButton'))
    })
    expect(getByTestId('IconButton')).toHaveClass('is-copyConfirmed')

    act(() => {
      jest.runAllTimers()
    })
    expect(getByTestId('IconButton')).not.toHaveClass('is-copyConfirmed')
  })

  test('Fires onReset callback when timeout completes', () => {
    const spy = jest.fn()
    const { getByTestId } = render(<CopyValue value="test" onReset={spy} />)
    act(() => {
      userEvent.click(getByTestId('IconButton'))

      jest.runAllTimers()
    })
    expect(spy).toHaveBeenCalled()
  })
})

describe('clipboard', () => {
  test('Clicking the button will copy the value to the clipboard', () => {
    const spy = jest.spyOn(window.navigator.clipboard, 'writeText')
    const { getByTestId } = render(<CopyValue value="test" />)
    act(() => {
      userEvent.click(getByTestId('IconButton'))
    })
    expect(spy).toHaveBeenCalledWith('test')
    spy.mockRestore()
  })
})

describe('renderValue', () => {
  test('renders the value through the renderValue', () => {
    const renderValue = value => <span data-testid="customRender">{value}</span>

    const { getByTestId } = render(
      <CopyValue value="test" renderValue={renderValue} />
    )
    expect(getByTestId('customRender')).toBeTruthy()
    expect(getByTestId('customRender')).toHaveTextContent('test')
  })
})

describe('prefix', () => {
  test('renders a prefix before the value', () => {
    const { getByTestId } = render(<CopyValue value="test" prefix="#" />)
    expect(getByTestId('CopyValue')).toHaveTextContent('#')
  })
})
