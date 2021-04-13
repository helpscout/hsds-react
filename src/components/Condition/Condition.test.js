import React from 'react'
import { render, screen } from '@testing-library/react'
import Condition from './Condition'

describe('Select', () => {
  test('Renders a Select with options', () => {
    const options = [
      { value: 'brick', label: 'Brick' },
      { value: 'ron', label: 'Ron' },
    ]
    const { getAllByRole } = render(<Condition options={options} />)
    const optionsNodes = getAllByRole('option')

    expect(optionsNodes.length).toBe(2)
    expect(optionsNodes[0].textContent).toBe('Brick')
  })

  test('Can set the value of the Select', () => {
    const options = [
      { value: 'brick', label: 'Brick' },
      { value: 'ron', label: 'Ron' },
    ]
    const { container } = render(<Condition options={options} value="ron" />)

    expect(container.querySelector('select').value).toBe('ron')
  })

  test('Does not render select when flag provided', () => {
    const options = [{ value: 'brick', label: 'Brick' }]

    render(<Condition options={options} value="brick" noSelect={true} />)

    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })

  test('Renders select when flag is false', () => {
    const options = [{ value: 'brick', label: 'Brick' }]

    render(<Condition options={options} value="brick" noSelect={false} />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
