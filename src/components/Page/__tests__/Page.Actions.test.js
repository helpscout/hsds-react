import * as React from 'react'
import { cy } from '@helpscout/cyan'
import Page from '../Page'
import Actions from '../Page.Actions'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<Actions />)
    const el = wrapper.find('.c-PageActions')

    expect(el.exists()).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = cy.render(<Actions className={className} />)
    const el = wrapper.find('.c-PageActions')

    expect(el.hasClass(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Does not renders child content', () => {
    const wrapper = cy.render(<Actions>Channel 4</Actions>)

    expect(wrapper.text()).not.toBe('Channel 4')
  })
})

describe('Direction', () => {
  test('Renders right-aligned, by default', () => {
    const wrapper = cy.render(<Actions />)
    const el = wrapper.find('.c-PageActions')

    expect(el.hasClass('is-right')).toBe(true)
  })

  test('Can render left-aligned, if specified', () => {
    const wrapper = cy.render(<Actions direction="left" />)
    const el = wrapper.find('.c-PageActions')

    expect(el.hasClass('is-right')).toBe(false)
    expect(el.hasClass('is-left')).toBe(true)
  })
})

describe('Slots', () => {
  test('Can render in primary slot', () => {
    const wrapper = cy.render(<Actions primary={<button />} />)
    const el = wrapper.find('.c-PageActions')

    expect(cy.get('button').length).toBe(1)
    expect(el.hasClass('withPrimary')).toBe(true)
  })

  test('Can render in secondary slot', () => {
    const wrapper = cy.render(
      <Actions
        primary={<button id="primary" />}
        secondary={<button id="secondary" />}
      />
    )
    const el = wrapper.find('.c-PageActions')

    expect(cy.get('#primary').exists()).toBeTruthy()
    expect(cy.get('#secondary').exists()).toBeTruthy()

    expect(el.hasClass('withPrimary')).toBe(true)
    expect(el.hasClass('withSecondary')).toBe(true)
  })

  test('Can render in serious slot', () => {
    const wrapper = cy.render(
      <Actions
        primary={<button id="primary" />}
        secondary={<button id="secondary" />}
        serious={<button id="serious" />}
      />
    )
    const el = wrapper.find('.c-PageActions')

    expect(cy.get('#primary').exists()).toBeTruthy()
    expect(cy.get('#secondary').exists()).toBeTruthy()
    expect(cy.get('#serious').exists()).toBeTruthy()

    expect(el.hasClass('withPrimary')).toBe(true)
    expect(el.hasClass('withSecondary')).toBe(true)
    expect(el.hasClass('withSerious')).toBe(true)
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
    const wrapper = cy.render(<Actions />)
    const el = wrapper.find('.c-PageActions__stickyWrapper')

    expect(el.exists()).toBeFalsy()
  })

  test('Renders sticky wrapper, if defined', () => {
    const wrapper = cy.render(<Actions isSticky={true} />)
    const el = wrapper.find('.c-PageActions__stickyWrapper')

    expect(el.exists()).toBeTruthy()
  })

  test('Can remove sticky wrapper', () => {
    const wrapper = cy.render(<Actions isSticky={true} />)

    wrapper.setProps({ isSticky: false })

    const el = wrapper.find('.c-PageActions__stickyWrapper')

    expect(el.exists()).toBeFalsy()
  })

  test('Renders a responsive (inner) Page component that wraps sticky actions', () => {
    cy.render(
      <Page isResponsive={true}>
        <Actions isSticky />
      </Page>
    )

    let el = cy.get('.c-Page .c-Page')
    expect(el.hasClass('is-responsive')).toBeTruthy()

    cy.render(
      <Page isResponsive={false}>
        <Actions isSticky />
      </Page>
    )

    el = cy.get('.c-Page .c-Page')
    expect(el.hasClass('is-responsive')).toBeFalsy()
  })

  test('Starts an IntersectionObserver on render', () => {
    const spy = jest.fn()
    window.IntersectionObserver = () => ({
      observe: spy,
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })

    cy.render(<Actions isSticky />)

    expect(spy).toHaveBeenCalled()
  })

  test('Stops an IntersectionObserver on unmount', () => {
    const spy = jest.fn()

    window.IntersectionObserver = () => ({
      observe: jest.fn(),
      unobserve: spy,
      disconnect: jest.fn(),
    })

    const wrapper = cy.render(<Actions isSticky />)

    expect(spy).not.toHaveBeenCalled()

    wrapper.unmount()

    expect(spy).toHaveBeenCalled()
  })

  test('onStickyStart/onStickyEnd callback works', () => {
    const startSpy = jest.fn()
    const endSpy = jest.fn()
    let changes

    window.IntersectionObserver = MockIntersectionObserver

    cy.render(
      <Actions isSticky onStickyStart={startSpy} onStickyEnd={endSpy} />
    )

    // Mock the IntersectionObserver event
    changes = [
      {
        isIntersecting: true,
      },
    ]
    handler(changes)

    expect(endSpy).toHaveBeenCalled()
    expect(startSpy).not.toHaveBeenCalled()

    // Mock the IntersectionObserver event
    changes = [
      {
        isIntersecting: false,
      },
    ]
    handler(changes)

    expect(startSpy).toHaveBeenCalled()
  })
})
