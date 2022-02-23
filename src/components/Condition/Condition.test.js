import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Condition from './Condition'
import userEvent from '@testing-library/user-event'
import { isNodeWithinViewport } from './Condition.AddButton'

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
      screen.getByRole('button', {
        name: 'conditions toggle menu, Ron currently selected',
      })
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
      screen.getByRole('button', { name: /conditions toggle menu/ })
    )

    await waitFor(() => expect(screen.getAllByRole('option').length).toBe(2))

    userEvent.click(screen.getByRole('option', { name: 'Brick' }))

    await waitFor(() => expect(mock).toHaveBeenCalledWith('brick'))
  })

  test('Does not render DropList when flag provided', () => {
    const options = [{ value: 'brick', label: 'Brick' }]

    render(<Condition options={options} value="brick" noSelect={true} />)

    expect(
      screen.queryByRole('button', { name: /conditions toggle menu/ })
    ).not.toBeInTheDocument()
  })

  test('Renders DropList when flag is false', () => {
    const options = [{ value: 'brick', label: 'Brick' }]

    render(<Condition options={options} value="brick" noSelect={false} />)

    expect(
      screen.getByRole('button', { name: /conditions toggle menu/ })
    ).toBeInTheDocument()
  })

  test('Allows to set aria-describedby for toggle menu', () => {
    const options = [{ value: 'brick', label: 'Brick' }]

    render(
      <Condition options={options} value="brick" ariaDescribedBy="some-id" />
    )

    expect(
      screen.getByRole('button', { name: /conditions toggle menu/ })
    ).toHaveAttribute('aria-describedby', 'some-id')
  })
})

describe('isNodeWithinViewport', () => {
  test('Returns false if node is not valid', () => {
    expect(isNodeWithinViewport({ node: false })).toBe(false)
    expect(isNodeWithinViewport({ node: {} })).toBe(false)
  })

  test('Returns false if node is not within viewport', () => {
    const mockNode = {
      nodeType: 1,
      getBoundingClientRect: () => ({
        y: 1000,
      }),
    }

    window.scrollY = 0

    window.innerHeight = 600

    expect(isNodeWithinViewport({ node: mockNode })).toBe(false)
  })

  test('Returns true if node is within viewport', () => {
    const mockNode = {
      nodeType: 1,
      getBoundingClientRect: () => ({
        y: 10,
      }),
    }

    window.scrollY = 0

    window.innerHeight = 1000

    expect(isNodeWithinViewport({ node: mockNode })).toBe(true)
  })
})
