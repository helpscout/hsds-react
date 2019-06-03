import * as React from 'react'
import { cy } from '@helpscout/cyan'
import Input from '../../Input'
import ConditionField from '../ConditionField'

describe('className', () => {
  test('Has default className', () => {
    cy.render(<ConditionField />)
    const el = cy.getByCy('ConditionField')

    expect(el.hasClass('c-ConditionField')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    cy.render(<ConditionField className={customClassName} />)
    const el = cy.getByCy('ConditionField')

    expect(el.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    cy.render(<ConditionField data-cy="BlueBlueBlue" />)
    const el = cy.getByCy('BlueBlueBlue')

    expect(el.exists()).toBeTruthy()
  })
})

describe('onRemove', () => {
  test('Renders a remove button', () => {
    cy.render(<ConditionField />)
    const el = cy.getByCy('ConditionFieldRemoveButton')

    expect(el.exists()).toBeTruthy()
    expect(el.getTagName()).toBe('button')
  })

  test('Does not render a remove button', () => {
    cy.render(<ConditionField isWithRemove={false} />)
    const el = cy.getByCy('ConditionFieldRemoveButton')

    expect(el.exists()).toBeFalsy()
  })

  test('Fires onRemove callback when remove button is clicked', () => {
    const spy = jest.fn()
    cy.render(<ConditionField onRemove={spy} />)
    const el = cy.getByCy('ConditionFieldRemoveButton')

    el.click()

    expect(spy).toHaveBeenCalled()
  })
})

describe('Item/Block/Static', () => {
  test('Can render sub-components', () => {
    cy.render(
      <ConditionField>
        <ConditionField.Item>
          <Input data-cy="ron" />
        </ConditionField.Item>
        <ConditionField.Block>
          <Input data-cy="brick" />
        </ConditionField.Block>
        <ConditionField.Block>
          <ConditionField.Static>Loud Noises!</ConditionField.Static>
        </ConditionField.Block>
      </ConditionField>
    )

    expect(cy.getByCy('ron').exists()).toBeTruthy()
    expect(cy.getByCy('brick').exists()).toBeTruthy()
    expect(cy.getByCy('ConditionFieldStatic').exists()).toBeTruthy()
    expect(cy.getByCy('ConditionFieldStatic').text()).toBe('Loud Noises!')
  })
})

describe('Group', () => {
  test('Renders an AddButton by default', () => {
    cy.render(<ConditionField.Group />)

    expect(cy.getByCy('ConditionFieldAddButton').exists()).toBeTruthy()
  })

  test('Can hide AddButton', () => {
    cy.render(<ConditionField.Group isAddEnabled={false} />)

    expect(cy.getByCy('ConditionFieldAddButton').exists()).toBeFalsy()
  })

  test('Can render ConditionField within a Group', () => {
    cy.render(
      <ConditionField.Group>
        <ConditionField />
      </ConditionField.Group>
    )

    expect(cy.getByCy('ConditionFieldGroup').exists()).toBeTruthy()
    expect(cy.getByCy('ConditionField').exists()).toBeTruthy()
    expect(cy.getByCy('ConditionField').length).toBe(1)
  })

  test('Does not render OR operator if there are no children', () => {
    cy.render(<ConditionField.Group />)

    expect(cy.getByCy('ConditionFieldOr').exists()).toBeFalsy()
  })

  test('Does not render OR operator if there is one child', () => {
    cy.render(
      <ConditionField.Group>
        <ConditionField />
      </ConditionField.Group>
    )

    expect(cy.getByCy('ConditionFieldOr').exists()).toBeFalsy()
  })

  test('Renders OR operator if there is two children', () => {
    cy.render(
      <ConditionField.Group>
        <ConditionField />
        <ConditionField />
      </ConditionField.Group>
    )

    const el = cy.getByCy('ConditionFieldOr')

    expect(el.exists()).toBeTruthy()
    expect(el.length).toBe(1)
  })

  test('Renders one fewer OR operator compared to children', () => {
    cy.render(
      <ConditionField.Group>
        <ConditionField />
        <ConditionField />
        <ConditionField />
        <ConditionField />
      </ConditionField.Group>
    )

    const el = cy.getByCy('ConditionFieldOr')

    expect(el.exists()).toBeTruthy()
    expect(el.length).toBe(3)
  })
})

describe('Tooltip', () => {
  test('Renders a Tooltip', () => {
    cy.render(<ConditionField />)
    const el = cy.getByCy('Tooltip')

    expect(el.exists()).toBeTruthy()
  })
})
