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

  test('Can customize Icon size', () => {
    const { container } = render(<IconButton icon="chat" iconSize={20} />)
    const icon = container.querySelector('.c-Icon')

    expect(window.getComputedStyle(icon).height).toBe('20px')
    expect(window.getComputedStyle(icon).width).toBe('20px')
  })

  test('Can render with caret', () => {
    const { container } = render(<IconButton withCaret />)
    const icon = container.querySelector('.c-Icon')

    expect(icon.querySelector('.is-caret')).toBeInTheDocument()
  })

  test('Does not render with caret by default', () => {
    const { container } = render(<IconButton />)
    const icon = container.querySelector('.c-Icon')

    expect(icon.querySelector('.is-caret')).toBe(null)
  })

  test('Auto adjusts Icon size, if Button size is smaller', () => {
    const { container, rerender } = render(
      <IconButton icon="chat" iconSize={24} />
    )
    let icon

    rerender(<IconButton icon="chat" iconSize={18} />)

    icon = container.querySelector('.c-Icon')
    expect(window.getComputedStyle(icon).height).toBe('18px')
    expect(window.getComputedStyle(icon).width).toBe('18px')

    rerender(<IconButton icon="chat" iconSize={16} />)

    icon = container.querySelector('.c-Icon')
    expect(window.getComputedStyle(icon).height).toBe('16px')
    expect(window.getComputedStyle(icon).width).toBe('16px')
  })
})

describe('Button', () => {
  test('Renders a button', () => {
    const { getByRole } = render(<IconButton />)

    expect(getByRole('button')).toBeInTheDocument()
  })

  test('Renders a button with various kinds', () => {
    const { getByRole, rerender } = render(<IconButton theme="blue" />)

    expect(getByRole('button').classList.contains('is-primary')).toBeTruthy()

    rerender(<IconButton theme="grey" outlined />)

    expect(getByRole('button').classList.contains('is-secondary')).toBeTruthy()
  })

  test('Renders a button with various sizes', () => {
    const { getByRole, rerender } = render(<IconButton size="lg" />)

    expect(getByRole('button').classList.contains('is-lg')).toBeTruthy()

    rerender(<IconButton size="xs" />)

    expect(getByRole('button').classList.contains('is-xs')).toBeTruthy()
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

describe('Styles', () => {
  test('Renders borderless, by default', () => {
    const { container } = render(<IconButton />)
    expect(
      window.getComputedStyle(container.querySelector('.c-IconButton'))
        .borderColor
    ).toBe('transparent')
  })

  test('Can render with border styles', () => {
    const { container } = render(
      <IconButton theme="grey" outlined isBorderless={false} />
    )

    expect(
      window.getComputedStyle(container.querySelector('.c-IconButton'))
        .borderColor
    ).not.toBe('transparent')
  })

  test('Renders a circle shape, by default', () => {
    const { container } = render(<IconButton />)
    const borderRadius = window.getComputedStyle(
      container.querySelector('.c-IconButton')
    ).borderRadius

    expect(borderRadius).toBe('100%')
  })

  test.only('Shape can be set to not render a circle', () => {
    const { container } = render(<IconButton shape="default" />)
    expect(
      window
        .getComputedStyle(container.querySelector('.c-IconButton'))
        .getPropertyValue('--buttonRadius')
    ).toBe('3px')
  })
})
