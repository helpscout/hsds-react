import React from 'react'
import { render, waitFor } from '@testing-library/react'
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
    const { getByRole, getByTitle } = render(<ConditionField.Group />)

    expect(getByRole('button')).toBeInTheDocument()
    expect(getByTitle('plus-small')).toBeInTheDocument()
  })

  test('Can hide AddButton', () => {
    const { queryByRole, queryByTitle } = render(
      <ConditionField.Group isAddEnabled={false} />
    )

    expect(queryByRole('button')).toBe(null)
    expect(queryByTitle('plus-small')).toBe(null)
  })

  test('Can render ConditionField within a Group', () => {
    const { container } = render(
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
