import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Condition from './Condition'
import userEvent from '@testing-library/user-event'

describe('DropList', () => {
  test('Renders a DropList with options', async () => {
    const options = [
      { value: 'brick', label: 'Brick' },
      { value: 'ron', label: 'Ron' },
    ]
    render(<Condition options={options} />)

    userEvent.click(
      screen.getByRole('button', { name: 'conditions toggle menu' })
    )

    await waitFor(() => expect(screen.getAllByRole('option').length).toBe(2))
    expect(screen.getAllByRole('option')[0].textContent).toBe('Brick')
  })

  test('Can set the value of the DropList', () => {
    const options = [
      { value: 'brick', label: 'Brick' },
      { value: 'ron', label: 'Ron' },
    ]
    render(<Condition options={options} value="ron" />)

    expect(
      screen.getByRole('button', { name: 'conditions toggle menu' })
    ).toHaveTextContent('Ron')
  })

  test('Can change selected value', async () => {
    const options = [
      { value: 'brick', label: 'Brick' },
      { value: 'ron', label: 'Ron' },
    ]
    const mock = jest.fn()
    render(<Condition options={options} value="ron" onChange={mock} />)
    userEvent.click(
      screen.getByRole('button', { name: 'conditions toggle menu' })
    )

    await waitFor(() => expect(screen.getAllByRole('option').length).toBe(2))

    userEvent.click(screen.getByRole('option', { name: 'Brick' }))

    await waitFor(() => expect(mock).toHaveBeenCalledWith('brick'))
  })

  test('Does not render DropList when flag provided', () => {
    const options = [{ value: 'brick', label: 'Brick' }]

    render(<Condition options={options} value="brick" noSelect={true} />)

    expect(
      screen.queryByRole('button', { name: 'conditions toggle menu' })
    ).not.toBeInTheDocument()
  })

  test('Renders DropList when flag is false', () => {
    const options = [{ value: 'brick', label: 'Brick' }]

    render(<Condition options={options} value="brick" noSelect={false} />)

    expect(
      screen.getByRole('button', { name: 'conditions toggle menu' })
    ).toBeInTheDocument()
  })
})
