import React from 'react'
import { render } from '@testing-library/react'
import Static from '../Input.Static'

describe('Children', () => {
  test('Can render child components', () => {
    const { container } = render(
      <Static>
        <div className="mugatu" />
      </Static>
    )

    expect(container.querySelector('.mugatu')).toBeInTheDocument()
  })
})

describe('Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const { container } = render(<Static style={style} />)

    expect(container.innerHTML).toContain('style')
    expect(container.innerHTML).toContain('background')
    expect(container.innerHTML).toContain('red')
  })
})

describe('Size', () => {
  test('Can render an additional size', () => {
    const { container } = render(<Static size="md" />)

    expect(
      container.querySelector('.c-InputStatic').classList.contains('is-md')
    ).toBeTruthy()
  })
})

describe('Alignment', () => {
  test('Can be aligned left', () => {
    const { container } = render(<Static align="left" />)

    expect(
      container.querySelector('.c-InputStatic').classList.contains('is-left')
    ).toBeTruthy()
  })

  test('Can be aligned center', () => {
    const { container } = render(<Static align="center" />)

    expect(
      container.querySelector('.c-InputStatic').classList.contains('is-center')
    ).toBeTruthy()
  })

  test('Can be aligned right', () => {
    const { container } = render(<Static align="right" />)

    expect(
      container.querySelector('.c-InputStatic').classList.contains('is-right')
    ).toBeTruthy()
  })
})

describe('Display', () => {
  test('Is not display: block, by default', () => {
    const { container } = render(<Static />)

    expect(
      container.querySelector('.c-InputStatic').classList.contains('is-block')
    ).toBeFalsy()
  })

  test('Can be set to display: block', () => {
    const { container } = render(<Static isBlock />)

    expect(
      container.querySelector('.c-InputStatic').classList.contains('is-block')
    ).toBeTruthy()
  })

  test('Can be set to center align items', () => {
    const { container } = render(<Static isCenterAlign />)
    expect(
      container
        .querySelector('.c-InputStatic')
        .classList.contains('is-centerAlign')
    ).toBeTruthy()
  })
})
