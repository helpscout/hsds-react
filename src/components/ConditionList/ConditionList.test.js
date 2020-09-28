import React from 'react'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import ConditionList from './ConditionList'
import Condition from '../Condition'
import Page from '../Page'

describe('AddButton', () => {
  test('Renders an AddButton by default', () => {
    const { getByRole } = render(<ConditionList />)

    expect(getByRole('button')).toBeInTheDocument()
  })

  test('Can be disabled', () => {
    const { queryByRole } = render(<ConditionList isAddEnabled={false} />)

    expect(queryByRole('button')).toBe(null)
  })

  test('onAdd callback can be triggered', () => {
    const spy = jest.fn()
    const { getByRole } = render(<ConditionList onAdd={spy} />)

    expect(spy).not.toHaveBeenCalled()

    user.click(getByRole('button'))

    expect(spy).toHaveBeenCalled()
  })
})

describe('And', () => {
  test('Does not render an And for no conditions', () => {
    const { container } = render(<ConditionList />)

    expect(container.querySelector('.c-ConditionAnd')).toBe(null)
  })

  test('Does not render an And for one condition', () => {
    const { container } = render(
      <ConditionList>
        <Condition />
      </ConditionList>
    )

    expect(container.querySelector('.c-ConditionAnd')).toBe(null)
  })

  test('Renders an And for more two conditions', () => {
    const { container } = render(
      <ConditionList>
        <Condition />
        <Condition />
      </ConditionList>
    )

    expect(container.querySelector('.c-ConditionAnd')).toBeTruthy()
  })

  test('Renders one less And for every condition', () => {
    const { container } = render(
      <ConditionList>
        <Condition />
        <Condition />
        <Condition />
        <Condition />
      </ConditionList>
    )

    expect(container.querySelectorAll('[data-cy="ConditionAnd"]').length).toBe(
      3
    )
  })
})

describe('Offset', () => {
  test('Does not render with offset by default', () => {
    const { container } = render(<ConditionList />)

    expect(container.querySelector('.is-withOffset')).toBe(null)
  })

  test('Can render with offset', () => {
    const { container } = render(<ConditionList isWithOffset />)

    expect(container.querySelector('.is-withOffset')).toBeTruthy()
  })

  test('Renders with offset within Page', () => {
    const { container } = render(
      <Page>
        <ConditionList />
      </Page>
    )

    expect(container.querySelector('.is-withOffset')).toBeTruthy()
  })
})
