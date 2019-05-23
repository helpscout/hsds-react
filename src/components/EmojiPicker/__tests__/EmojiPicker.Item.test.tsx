import * as React from 'react'
import { cy } from '@helpscout/cyan'
import Dropdown from '../../Dropdown/V2'
import EmojiItem from '../EmojiPicker.Item'

describe('renderItem', () => {
  test('has default menu content', () => {
    cy.render(<EmojiItem />)
    expect(cy.get('.c-emojiPickerItem').exists()).toBeTruthy()
  })

  test('Can render custom menu', () => {
    const customItem = props => {
      return (
        <Dropdown.Item
          {...props}
          value={props.symbol}
          className="c-custom-item"
        />
      )
    }

    cy.render(<EmojiItem renderItem={customItem} />)
    expect(cy.get('.c-custom-item').exists()).toBeTruthy()
  })
})
