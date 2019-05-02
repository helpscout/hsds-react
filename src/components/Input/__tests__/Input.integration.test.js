import * as React from 'react'
import { cy } from '@helpscout/cyan'
import Input from '../Input'

describe('Input', () => {
  describe('Rendering', () => {
    test('Can render an error icon and tooltip upon error', () => {
      const props = {
        state: 'error',
        errorMessage: 'some error',
      }
      cy.render(<Input {...props} />)

      expect(cy.get('.c-Input__errorIcon').exists()).toBeTruthy()
    })

    test('Can style the input to be red upon an error', () => {
      cy.render(<Input state={'error'} />)
      const input = cy.get('.c-InputField.is-error')

      expect(input.exists()).toBeTruthy()
      expect(input.style('color')).toBe('rgb(157, 31, 26)')
    })

    test('Can render a placeholder', () => {
      cy.render(<Input placeholder={'ho ho ho!'} />)
      const input = cy.get('input')

      expect(input.hasAttribute('placeholder')).toBeTruthy()
      expect(input.attr('placeholder')).toBe('ho ho ho!')
    })

    test('Can render a label and sub label (help text)', () => {
      const props = {
        label: 'label text',
        helpText: 'sub text',
      }
      cy.render(<Input {...props} />)

      expect(cy.get('label').text('label text')).toBeTruthy()
      expect(cy.get('.c-HelpText').text('sub text')).toBeTruthy()
    })

    test('Can render a multiline input with a max-height', () => {
      cy.render(<Input maxHeight={420} multiline={true} />)

      expect(cy.get('textArea').style('max-height')).toBe('420px')
    })
  })
})
