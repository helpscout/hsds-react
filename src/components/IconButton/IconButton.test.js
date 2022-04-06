import React from 'react'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import IconButton from './IconButton'
import '../../adapters/app'

describe('Icon', () => {
  test('Renders an Icon component', () => {
    const { container } = render(<IconButton />)

    expect(container.querySelector('.c-Icon')).toBeTruthy()
  })

  test('Renders an Icon SVG', () => {
    const { container } = render(<IconButton />)

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  test('Can customize Icon SVG', () => {
    const { container } = render(<IconButton icon="chat" />)

    expect(
      container.querySelector('[data-icon-name="chat"]')
    ).toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})

describe('Button', () => {
  test('Renders a button', () => {
    const { getByRole } = render(<IconButton />)

    expect(getByRole('button')).toBeInTheDocument()
  })

  test('Renders a button with various theme', () => {
    const { getByRole, rerender } = render(<IconButton theme="blue" />)

    expect(getByRole('button').classList.contains('is-theme-blue')).toBeTruthy()

    rerender(<IconButton theme="grey" />)

    expect(getByRole('button').classList.contains('is-theme-grey')).toBeTruthy()
  })

  test('Renders a button with various sizes', () => {
    const { getByRole, rerender } = render(<IconButton size="lg" />)

    expect(getByRole('button').classList.contains('is-size-lg')).toBeTruthy()

    rerender(<IconButton size="sm" />)

    expect(getByRole('button').classList.contains('is-size-sm')).toBeTruthy()

    rerender(<IconButton size="xl" />)

    expect(getByRole('button').classList.contains('is-size-xl')).toBeTruthy()
  })
})

describe('Events', () => {
  test('onClick callback still works', () => {
    const spy = jest.fn()
    const { getByRole } = render(<IconButton onClick={spy} />)

    user.click(getByRole('button'))

    expect(spy).toHaveBeenCalled()
  })

  test('onBlur callback still works', () => {
    const spy = jest.fn()
    const { getByRole } = render(<IconButton onBlur={spy} />)

    getByRole('button').focus()
    getByRole('button').blur()

    expect(spy).toHaveBeenCalled()
  })

  test('onFocus callback still works', () => {
    const spy = jest.fn()
    const { getByRole } = render(<IconButton onFocus={spy} />)

    getByRole('button').focus()

    expect(spy).toHaveBeenCalled()
  })

  test('Clicking on the Icon propagates event to Button', () => {
    const spy = jest.fn()
    const { container } = render(<IconButton onClick={spy} />)

    user.click(container.querySelector('.c-Icon'))

    expect(spy).toHaveBeenCalled()
  })
})

describe('Status', () => {
  test('Does not render a status indicator by default', () => {
    const { getByRole, queryByTestId } = render(<IconButton size="xl" />)

    expect(getByRole('button').classList.contains('with-status')).toBeFalsy()
    expect(queryByTestId('IconButton.Status')).toBeFalsy()
  })

  test('Does render a status indicator', () => {
    const { getByRole, queryByTestId } = render(
      <IconButton status={true} size="xl" />
    )

    expect(getByRole('button').classList.contains('with-status')).toBeTruthy()
    expect(queryByTestId('IconButton.Status')).toBeTruthy()
  })
})
