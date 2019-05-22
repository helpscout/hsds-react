import * as React from 'react'
import { cy } from '@helpscout/cyan'
import ConditionList from '../ConditionList'
import Condition from '../../Condition'

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
    const el = cy.get('ConditionListAnd')

    expect(el.exists()).toBeFalsy()
  })

  test('Does not render an And for one condition', () => {
    cy.render(
      <ConditionList>
        <Condition />
      </ConditionList>
    )
    const el = cy.get('ConditionListAnd')

    expect(el.exists()).toBeFalsy()
  })

  test('Renders an And for more two conditions', () => {
    cy.render(
      <ConditionList>
        <Condition />
        <Condition />
      </ConditionList>
    )
    const el = cy.getByCy('ConditionListAnd')

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
    const el = cy.getByCy('ConditionListAnd')

    expect(el.length).toBe(3)
  })
})
