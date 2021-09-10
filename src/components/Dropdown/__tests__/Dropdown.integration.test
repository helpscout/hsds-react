import React from 'react'
import { render, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import Dropdown from '../index'

jest.useFakeTimers()

describe('Opening', () => {
  test('Can be opened by clicking Trigger', async () => {
    const { queryByRole, getByRole } = render(<Dropdown />)

    expect(queryByRole('listbox')).toBe(null)

    await waitFor(() => {
      user.click(getByRole('button'))
    })

    expect(getByRole('listbox')).toBeInTheDocument()
  })
})

describe('Closing', () => {
  test('Can close with ESC key press', async () => {
    const { getByText, baseElement } = render(<Dropdown isOpen />)

    expect(getByText(/is opened/i)).toBeInTheDocument()

    user.type(baseElement, '{esc}')

    await waitFor(() => {
      expect(getByText(/is closed/i)).toBeInTheDocument()
    })
  })
})

describe('Focus', () => {
  test('Can refocuses trigger on close, by default', async () => {
    const spy = jest.fn()
    const { container } = render(<Dropdown onFocus={spy} isOpen={true} />)

    expect(spy).not.toHaveBeenCalled()

    user.type(container, '{esc}')

    await waitFor(() => {
      expect(spy).toHaveBeenCalled()
    })
  })

  test('Can not trigger on close, with custom shouldRefocusOnClose', async () => {
    const spy = jest.fn()
    const shouldRefocusOnClose = () => false

    const { container } = render(
      <Dropdown
        isOpen={true}
        onFocus={spy}
        shouldRefocusOnClose={shouldRefocusOnClose}
      />
    )

    user.type(container, '{esc}')

    await waitFor(() => {
      expect(spy).not.toHaveBeenCalled()
    })
  })
})

describe('Accessibility', () => {
  test('Aria live (polite) announces when open/closed', () => {
    const { container, getByRole } = render(<Dropdown label="Blue select" />)

    const el = container.querySelector('[data-cy="DropdownAriaLive"]')

    expect(el.getAttribute('aria-live')).toBe('polite')
    expect(el.getAttribute('role')).toBe('region')
    expect(el.textContent).toContain('Blue select')

    expect(el.textContent).toContain('closed')

    user.click(getByRole('button'))

    expect(el.textContent).toContain('opened')

    user.click(getByRole('button'))

    expect(el.textContent).toContain('closed')
  })
})
