import * as React from 'react'
import { cy } from '@helpscout/cyan'
import <%= name %> from '../<%= name %>'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<<%= name %> />)

    expect(wrapper.hasClass('c-<%= name %>')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(<<%= name %> className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    cy.render(<<%= name %> data-cy="BlueBlueBlue" />)
    const el = cy.getByCy('BlueBlueBlue')

    expect(el.exists()).toBeTruthy()
  })
})
