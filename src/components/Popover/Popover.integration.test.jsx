import React from 'react'
import PropTypes from 'prop-types'
import { cy } from '@helpscout/cyan'
import Popover from './index'

cy.useFakeTimers()
cy.useFakePromises()

const fastForwardTimers = () => {
  cy.runAllPromises()
  jest.runAllTimers()
}

describe('Interactions', () => {
  test('Can be closed on body click', () => {
    cy.render(<Popover isOpen />)

    expect(cy.getByCy('PopoverContent').exists()).toBeTruthy()

    document.body.click()
    fastForwardTimers()

    expect(cy.getByCy('PopoverContent').exists()).toBeFalsy()
  })

  test('Can be closed on ESC keypress', () => {
    cy.render(<Popover isOpen />)

    cy.type('{esc}')

    expect(cy.getByCy('PopoverContent').exists()).toBeFalsy()
  })

  test('Can be closed on content click', async () => {
    cy.render(<Popover isOpen closeOnContentClick={true} />)

    await cy.getByCy('PopoverPopper').click()
    fastForwardTimers()

    expect(cy.getByCy('PopoverContent').exists()).toBeFalsy()
  })
})

describe('shouldOpen/shouldClose', () => {
  test('Can allow for Popover to open with shouldOpen', async () => {
    const shouldOpen = () => true
    cy.render(<Popover triggerOn="click" shouldOpen={shouldOpen} />)

    await cy.getByCy('Popover').click()
    fastForwardTimers()

    expect(cy.getByCy('PopoverContent').exists()).toBeTruthy()
  })

  test('Can prevent Popover from opening with shouldOpen', async () => {
    const shouldOpen = () => false
    cy.render(<Popover triggerOn="click" shouldOpen={shouldOpen} />)

    await cy.getByCy('Popover').click()
    fastForwardTimers()

    expect(cy.getByCy('PopoverContent').exists()).toBeFalsy()
  })

  test('Can allow for Popover to close with shouldClose', async () => {
    const shouldClose = () => true
    cy.render(<Popover isOpen={true} shouldClose={shouldClose} />)

    await document.body.click()
    fastForwardTimers()

    expect(cy.getByCy('PopoverContent').exists()).toBeFalsy()
  })

  test('Can prevent Popover from closing with shouldClose', async () => {
    const shouldClose = () => false
    cy.render(<Popover isOpen={true} shouldClose={shouldClose} />)

    await document.body.click()
    fastForwardTimers()

    expect(cy.getByCy('PopoverContent').exists()).toBeTruthy()
  })
})
