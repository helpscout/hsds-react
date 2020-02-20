import React from 'react'
import { cy } from '@helpscout/cyan'
import Dropdown from '../index'

cy.useFakeTimers()

describe('Opening', () => {
  test('Can be opened by clicking Trigger', () => {
    cy.render(<Dropdown />)

    expect(cy.getByCy('DropdownMenu').exists()).toBeFalsy()

    cy.getByCy('DropdownTrigger').click()

    expect(cy.getByCy('DropdownMenu').exists()).toBeTruthy()
  })
})

describe('Closing', () => {
  test('Can close with ESC key press', () => {
    cy.render(<Dropdown isOpen={true} />)

    expect(cy.getByCy('DropdownMenu').exists()).toBeTruthy()

    cy.type('{esc}')

    expect(cy.getByCy('DropdownMenu').exists()).toBeFalsy()
  })
})

describe('Focus', () => {
  test('Can refocuses trigger on close, by default', () => {
    const spy = jest.fn()
    cy.render(<Dropdown onFocus={spy} isOpen={true} />)

    expect(spy).not.toHaveBeenCalled()

    cy.type('{esc}')

    expect(spy).toHaveBeenCalled()
  })

  test('Can not trigger on close, with custom shouldRefocusOnClose', () => {
    const spy = jest.fn()
    const shouldRefocusOnClose = () => false

    cy.render(
      <Dropdown
        isOpen={true}
        onFocus={spy}
        shouldRefocusOnClose={shouldRefocusOnClose}
      />
    )

    cy.type('{esc}')

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('Accessibility', () => {
  test('Aria live (polite) announces when open/closed', () => {
    cy.render(<Dropdown label="Blue select" />)

    const el = cy.getByCy('DropdownAriaLive')

    expect(el.attr('aria-live')).toBe('polite')
    expect(el.attr('role')).toBe('region')
    expect(el.text()).toContain('Blue select')

    expect(el.text()).toContain('closed')

    cy.getByCy('DropdownTrigger').click()

    expect(el.text()).toContain('opened')

    cy.getByCy('DropdownTrigger').click()

    expect(el.text()).toContain('closed')
  })
})
