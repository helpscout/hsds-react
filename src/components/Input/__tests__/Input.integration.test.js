import React from 'react'
import { render } from '@testing-library/react'
import Input from '../index'

describe('Input', () => {
  describe('Rendering', () => {
    test('Can render an error icon and tooltip upon error', () => {
      const props = {
        state: 'error',
        errorMessage: 'some error',
      }
      const { container } = render(<Input {...props} />)

      expect(container.querySelector('.c-Input__errorIcon')).toBeInTheDocument()
    })

    test('Can style the input to be red upon an error', () => {
      const { container } = render(<Input state={'error'} />)
      const input = container.querySelector('.c-InputField.is-error')

      expect(input).toBeInTheDocument()
      expect(window.getComputedStyle(input).color).toBe('rgb(157, 31, 26)')
    })

    test('Can render a placeholder', () => {
      const { container } = render(<Input placeholder={'ho ho ho!'} />)
      const input = container.querySelector('input')

      expect(input.getAttribute('placeholder')).toBe('ho ho ho!')
    })

    test('Can render a label and sub label (help text)', () => {
      const props = {
        label: 'label text',
        helpText: 'sub text',
      }
      const { container } = render(<Input {...props} />)

      expect(container.querySelector('label').textContent).toBe('label text')
      expect(container.querySelector('.c-HelpText').textContent).toBe(
        'sub text'
      )
    })

    test('Can render a multiline input with a max-height', () => {
      const { container } = render(<Input maxHeight={420} multiline={true} />)

      expect(
        window.getComputedStyle(container.querySelector('textArea')).maxHeight
      ).toBe('420px')
    })
  })
})
