import React from 'react'
import { render } from '@testing-library/react'
import Truncated from '../EditableField.Truncated'
import { TRUNCATED_CLASSNAMES } from '../EditableField.utils'

describe('Editable Field truncate', () => {
  test('should truncate with HSDS truncate if no splitter provided', () => {
    const { container } = render(<Truncated string="001122334455677889900" />)

    expect(
      container.querySelector(`.${TRUNCATED_CLASSNAMES.component}`)
    ).toBeInTheDocument()
  })

  test('should truncate with with splitter if provided', () => {
    const { container } = render(
      <Truncated string="email@something.com" splitter="@" />
    )

    expect(
      container.querySelector(`.${TRUNCATED_CLASSNAMES.withSplitter}`)
    ).toBeInTheDocument()
    expect(
      container.querySelector(`.${TRUNCATED_CLASSNAMES.firstChunk}`)
    ).toBeInTheDocument()
    expect(
      container.querySelector(`.${TRUNCATED_CLASSNAMES.secondChunk}`)
    ).toBeInTheDocument()
    expect(
      container.querySelector(`.${TRUNCATED_CLASSNAMES.firstChunk}`).textContent
    ).toBe('email')
    expect(
      container.querySelector(`.${TRUNCATED_CLASSNAMES.secondChunk}`)
        .textContent
    ).toBe('@something.com')
  })
})
