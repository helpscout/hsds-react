import * as React from 'react'
import { cy } from '@helpscout/cyan'
import ConditionList from '../ConditionList'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<ConditionList />)

    expect(wrapper.hasClass('c-ConditionList')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(<ConditionList className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    cy.render(<ConditionList data-cy="BlueBlueBlue" />)
    const el = cy.getByCy('BlueBlueBlue')

    expect(el.exists()).toBeTruthy()
  })
})
