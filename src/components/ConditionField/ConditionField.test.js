import React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import ConditionField from './ConditionField'

describe('onRemove', () => {
  test('Renders a remove button', () => {
    const { getByRole, getByTitle } = render(<ConditionField />)

    expect(getByRole('button')).toBeInTheDocument()
    expect(getByTitle('collapse')).toBeInTheDocument()
  })

  test('Does not render a remove button', () => {
    const { queryByRole, queryByTitle } = render(
      <ConditionField isWithRemove={false} />
    )

    expect(queryByRole('button')).toBe(null)
    expect(queryByTitle('collapse')).toBe(null)
  })

  test('Fires onRemove callback when remove button is clicked', async () => {
    const spy = jest.fn()
    const { getByRole } = render(<ConditionField onRemove={spy} />)

    user.click(getByRole('button'))

    await waitFor(() => {
      expect(spy).toHaveBeenCalled()
    })
  })
})

describe('Group', () => {
  test('Renders an AddButton by default', () => {
    const { getByRole } = render(<ConditionField.Group />)

    expect(getByRole('button')).toBeInTheDocument()
  })

  test('Can hide AddButton', () => {
    const { queryByRole } = render(
      <ConditionField.Group isAddEnabled={false} />
    )

    expect(queryByRole('button')).toBe(null)
  })

  test('Can render ConditionField within a Group', () => {
    render(
      <ConditionField.Group>
        <ConditionField />
      </ConditionField.Group>
    )
  })

  test('Does not render OR operator if there are no children', () => {
    const { container } = render(<ConditionField.Group />)

    expect(container.querySelector('.c-ConditionOr')).toBe(null)
  })

  test('Does not render OR operator if there is one child', () => {
    const { container } = render(
      <ConditionField.Group>
        <ConditionField />
      </ConditionField.Group>
    )

    expect(container.querySelector('.c-ConditionOr')).toBe(null)
  })

  test('Renders OR operator if there is two children', () => {
    const { container } = render(
      <ConditionField.Group>
        <ConditionField />
        <ConditionField />
      </ConditionField.Group>
    )

    expect(container.querySelector('.is-or')).toBeInTheDocument()
  })

  test('Renders one fewer OR operator compared to children', () => {
    const { container } = render(
      <ConditionField.Group>
        <ConditionField />
        <ConditionField />
        <ConditionField />
        <ConditionField />
      </ConditionField.Group>
    )

    expect(
      container.querySelectorAll('[data-cy="ConditionFieldOr"]').length
    ).toBe(3)
  })
})

describe('Tooltip', () => {
  test('Renders a Tooltip', () => {
    const { container } = render(<ConditionField />)

    expect(
      container.querySelectorAll('[data-cy="Tooltip"]').length
    ).toBeTruthy()
  })
})

describe('With selectable conjunction', () => {
  test('should display selectable conjunction button with AND/OR options', () => {
    render(
      <ConditionField.Group canChangeConjunction>
        <ConditionField />
      </ConditionField.Group>
    )

    expect(dropdownTrigger()).toBeInTheDocument()

    user.click(dropdownTrigger())

    expect(conjunctionMenu()).toBeInTheDocument()
    expect(
      within(conjunctionMenu())
        .getAllByRole('option')
        .map(el => el.textContent)
    ).toEqual(['OR', 'AND'])
  })

  test('should display OR selected when no conjunction provided', () => {
    render(
      <ConditionField.Group canChangeConjunction>
        <ConditionField />
      </ConditionField.Group>
    )

    user.click(dropdownTrigger())
    expect(screen.getByRole('button', { name: 'or' })).toBeInTheDocument()
    // expect(getSelectedConjunctionOption()).toHaveTextContent('OR')
  })

  test('should display AND conjunction selected', () => {
    render(
      <ConditionField.Group canChangeConjunction conjunction={'and'}>
        <ConditionField />
      </ConditionField.Group>
    )

    user.click(dropdownTrigger())
    expect(screen.getByRole('button', { name: 'and' })).toBeInTheDocument()
    // expect(getSelectedConjunctionOption()).toHaveTextContent('AND')
  })

  test('should make a callback when conjunction changed', () => {
    const mock = jest.fn()
    render(
      <ConditionField.Group canChangeConjunction onConjunctionChange={mock}>
        <ConditionField />
      </ConditionField.Group>
    )

    user.click(dropdownTrigger())
    user.click(within(conjunctionMenu()).getByRole('option', { name: 'AND' }))
    expect(mock).toHaveBeenCalledWith('and')
  })

  test('should render OR conjunction by default when more than one Field', () => {
    const { container } = render(
      <ConditionField.Group canChangeConjunction>
        <ConditionField />
        <ConditionField />
      </ConditionField.Group>
    )

    expect(getOrConjunctions(container)).toHaveLength(1)
    expect(getAndConjunctions(container)).toHaveLength(0)
  })

  test('should render AND conjunction when more than one Field', () => {
    const { container } = render(
      <ConditionField.Group canChangeConjunction conjunction={'and'}>
        <ConditionField />
        <ConditionField />
      </ConditionField.Group>
    )

    expect(getAndConjunctions(container)).toHaveLength(1)
    expect(getOrConjunctions(container)).toHaveLength(0)
  })

  test('should disable button to add, but not switch', () => {
    render(
      <ConditionField.Group canChangeConjunction isAddEnabled={false}>
        <ConditionField />
        <ConditionField />
      </ConditionField.Group>
    )

    expect(dropdownTrigger()).not.toBeDisabled()
    expect(screen.getByRole('button', { name: 'or' })).toBeDisabled()
  })

  test('should not display dropdown when flag is set to false', () => {
    render(
      <ConditionField.Group canChangeConjunction={false}>
        <ConditionField />
        <ConditionField />
      </ConditionField.Group>
    )

    expect(dropdownTrigger()).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'or' })).toBeInTheDocument()
  })

  const dropdownTrigger = () =>
    screen.queryByRole('button', {
      name: 'toggle menu',
    })

  const conjunctionMenu = () => screen.getByRole('listbox')

  function getSelectedConjunctionOption() {
    return within(conjunctionMenu()).getByRole('option', { selected: true })
  }

  function getOrConjunctions(container) {
    return container.querySelectorAll('.c-ConditionOperator.is-or')
  }

  function getAndConjunctions(container) {
    return container.querySelectorAll('.c-ConditionOperator.is-and')
  }
})
