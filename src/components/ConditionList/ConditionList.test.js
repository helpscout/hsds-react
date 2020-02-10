import React from 'react'
import PropTypes from 'prop-types'
import { cy } from '@helpscout/cyan'
import ConditionList from './ConditionList'
import Condition from '../Condition'
import Page from '../Page'

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

describe('AddButton', () => {
  test('Renders an AddButton by default', () => {
    cy.render(<ConditionList />)
    const el = cy.getByCy('ConditionListAddButton')

    expect(el.exists()).toBeTruthy()
  })

  test('Can be disabled', () => {
    cy.render(<ConditionList isAddEnabled={false} />)
    const el = cy.getByCy('ConditionListAddButton')

    expect(el.exists()).toBeFalsy()
  })

  test('onAdd callback can be triggered', () => {
    const spy = jest.fn()
    cy.render(<ConditionList onAdd={spy} />)

    expect(spy).not.toHaveBeenCalled()

    cy.getByCy('ConditionListAddButton').click()

    expect(spy).toHaveBeenCalled()
  })
})

describe('And', () => {
  test('Does not render an And for no conditions', () => {
    cy.render(<ConditionList />)
    const el = cy.get('ConditionAnd')

    expect(el.exists()).toBeFalsy()
  })

  test('Does not render an And for one condition', () => {
    cy.render(
      <ConditionList>
        <Condition />
      </ConditionList>
    )
    const el = cy.get('ConditionAnd')

    expect(el.exists()).toBeFalsy()
  })

  test('Renders an And for more two conditions', () => {
    cy.render(
      <ConditionList>
        <Condition />
        <Condition />
      </ConditionList>
    )
    const el = cy.getByCy('ConditionAnd')

    expect(el.exists()).toBeTruthy()
  })

  test('Renders one less And for every condition', () => {
    cy.render(
      <ConditionList>
        <Condition />
        <Condition />
        <Condition />
        <Condition />
      </ConditionList>
    )
    const el = cy.getByCy('ConditionAnd')

    expect(el.length).toBe(3)
  })
})

describe('Offset', () => {
  test('Does not render with offset by default', () => {
    const wrapper = cy.render(<ConditionList />)

    expect(wrapper.hasClass('is-withOffset')).toBeFalsy()
  })

  test('Can render with offset', () => {
    const wrapper = cy.render(<ConditionList isWithOffset={true} />)

    expect(wrapper.hasClass('is-withOffset')).toBeTruthy()
  })

  test('Renders with offset within Page', () => {
    cy.render(
      <Page>
        <ConditionList />
      </Page>
    )
    const el = cy.getByCy('ConditionList')

    expect(el.hasClass('is-withOffset')).toBeTruthy()
  })
})
