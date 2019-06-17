import * as React from 'react'
import { cy } from '@helpscout/cyan'
import EmojiItem from '../EmojiPicker.Item'

describe('render', () => {
  test('has default content', () => {
    cy.render(<EmojiItem />)
    expect(cy.get('.c-EmojiPickerItem').exists()).toBeTruthy()
  })
})
