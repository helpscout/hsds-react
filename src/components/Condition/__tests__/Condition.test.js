import * as React from 'react'
import { cy } from '@helpscout/cyan'
import Condition from '../Condition'

describe('className', () => {
  test('Has default className', () => {
    cy.render(<Condition />)
    const el = cy.getByCy('Condition')

    expect(el.hasClass('c-Condition')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    cy.render(<Condition className={customClassName} />)
    const el = cy.getByCy('Condition')

    expect(el.hasClass(customClassName)).toBeTruthy()
  })
})

describe('Select', () => {
  test('Renders a Select with options', () => {
    const options = [
      { value: 'brick', label: 'Brick' },
      { value: 'ron', label: 'Ron' },
    ]
    cy.render(<Condition options={options} />)

    const els = cy.get('select > option')

    expect(cy.get('select').exists()).toBeTruthy()
    expect(els.length).toBe(2)

    expect(els.first().text()).toBe('Brick')
  })

  test('Can set the value of the Select', () => {
    const options = [
      { value: 'brick', label: 'Brick' },
      { value: 'ron', label: 'Ron' },
    ]
    cy.render(<Condition options={options} value="ron" />)

    expect(cy.get('select').value()).toBe('ron')
  })
})
