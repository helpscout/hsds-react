import * as React from 'react'
import { cy } from '@helpscout/cyan'
import EditableField from '../EditableField'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<EditableField />)

    expect(wrapper.hasClass('c-EditableField')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(<EditableField className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    cy.render(<EditableField data-cy="BlueBlueBlue" />)
    const el = cy.getByCy('BlueBlueBlue')

    expect(el.exists()).toBeTruthy()
  })
})
