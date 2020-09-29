import React from 'react'
import { render, act } from '@testing-library/react'
import Page from '../Page'
import Actions from '../Page.Actions'

describe('Direction', () => {
  test('Renders right-aligned, by default', () => {
    const { container } = render(<Actions />)
    const el = container.querySelector('.c-PageActions')

    expect(el.classList.contains('is-right')).toBeTruthy()
  })

  test('Can render left-aligned, if specified', () => {
    const { container } = render(<Actions direction="left" />)
    const el = container.querySelector('.c-PageActions')

    expect(el.classList.contains('is-right')).toBeFalsy()
    expect(el.classList.contains('is-left')).toBeTruthy()
  })
})

describe('Slots', () => {
  test('Can render in primary slot', () => {
    const { container } = render(<Actions primary={<button />} />)
    const el = container.querySelector('.c-PageActions')

    expect(container.querySelector('button')).toBeInTheDocument()
    expect(el.classList.contains('withPrimary')).toBeTruthy()
  })

  test('Can render in secondary slot', () => {
    const { container } = render(
      <Actions
        primary={<button id="primary" />}
        secondary={<button id="secondary" />}
      />
    )
    const el = container.querySelector('.c-PageActions')

    expect(container.querySelector('#primary')).toBeTruthy()
    expect(container.querySelector('#secondary')).toBeTruthy()

    expect(el.classList.contains('withPrimary')).toBeTruthy()
    expect(el.classList.contains('withSecondary')).toBeTruthy()
  })

  test('Can render in serious slot', () => {
    const { container } = render(
      <Actions
        primary={<button id="primary" />}
        secondary={<button id="secondary" />}
        serious={<button id="serious" />}
      />
    )
    const el = container.querySelector('.c-PageActions')

    expect(container.querySelector('#primary')).toBeTruthy()
    expect(container.querySelector('#secondary')).toBeTruthy()
    expect(container.querySelector('#serious')).toBeTruthy()

    expect(el.classList.contains('withPrimary')).toBeTruthy()
    expect(el.classList.contains('withSecondary')).toBeTruthy()
    expect(el.classList.contains('withSerious')).toBeTruthy()
  })
})

describe('Sticky', () => {
  let handler
  class MockIntersectionObserver {
    constructor(fn) {
      handler = fn
    }

    observe() {
      return null
    }
    unobserve() {
      return null
    }
    disconnect() {
      return null
    }
  }

  afterEach(() => {
    handler = undefined
  })

  test('Does not render sticky wrapper, by default', () => {
    const { container } = render(<Actions />)
    const el = container.querySelector('.c-PageActions__stickyWrapper')

    expect(el).toBe(null)
  })

  test('Renders sticky wrapper, if defined', () => {
    const { container } = render(<Actions isSticky={true} />)
    const el = container.querySelector('.c-PageActions__stickyWrapper')

    expect(el).toBeTruthy()
  })

  test('Can remove sticky wrapper', () => {
    const { container, rerender } = render(<Actions isSticky />)

    rerender(<Actions isSticky={false} />)

    const el = container.querySelector('.c-PageActions__stickyWrapper')

    expect(el).toBe(null)
  })

  test('Renders a responsive (inner) Page component that wraps sticky actions', () => {
    const { container, rerender } = render(
      <Page isResponsive>
        <Actions isSticky />
      </Page>
    )

    let el = container.querySelector('.c-Page .c-Page')
    expect(el.classList.contains('is-responsive')).toBeTruthy()

    rerender(
      <Page isResponsive={false}>
        <Actions isSticky />
      </Page>
    )

    el = container.querySelector('.c-Page .c-Page')
    expect(el.classList.contains('is-responsive')).toBeFalsy()
  })

  test('Starts an IntersectionObserver on render', () => {
    const spy = jest.fn()
    window.IntersectionObserver = () => ({
      observe: spy,
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })

    render(<Actions isSticky />)

    expect(spy).toHaveBeenCalled()
  })

  test('Stops an IntersectionObserver on unmount', () => {
    const spy = jest.fn()

    window.IntersectionObserver = () => ({
      observe: jest.fn(),
      unobserve: spy,
      disconnect: jest.fn(),
    })

    const { unmount } = render(<Actions isSticky />)

    expect(spy).not.toHaveBeenCalled()

    unmount()

    expect(spy).toHaveBeenCalled()
  })

  test('onStickyStart/onStickyEnd callback works', () => {
    const startSpy = jest.fn()
    const endSpy = jest.fn()
    let changes

    window.IntersectionObserver = MockIntersectionObserver

    render(<Actions isSticky onStickyStart={startSpy} onStickyEnd={endSpy} />)

    act(() => {
      // Mock the IntersectionObserver event
      changes = [
        {
          intersectionRatio: 1,
        },
      ]
      handler(changes)
    })

    expect(endSpy).toHaveBeenCalled()
    expect(startSpy).not.toHaveBeenCalled()

    act(() => {
      changes = [
        {
          intersectionRatio: 0.977,
        },
      ]
      handler(changes)
    })

    expect(startSpy).toHaveBeenCalled()
  })
})
