import * as React from 'react'
import { cy } from '@helpscout/cyan'
import Dropdown from '../../Dropdown/V2'
import EmojiPickerMenu from '../EmojiPicker.Menu'
import EmojiItem from '../EmojiPicker.Item'
import { emojiSet } from '../emojiSet'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<EmojiPickerMenu />)

    expect(wrapper.hasClass('c-EmojiPickerMenu')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(<EmojiPickerMenu className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('renderMenu', () => {
  test('has default menu content', () => {
    cy.render(<EmojiPickerMenu />)
    expect(cy.get('.c-EmojiPickerMenu').exists()).toBeTruthy()
  })

  test('Can render custom menu', () => {
    const customMenu = ({ items, getItemProps }) => {
      return (
        <Dropdown.Card className="c-custom-dropdown">
          <Dropdown.Menu>
            {items.map((item, index) => {
              const itemProps = getItemProps(item, index)

              return <EmojiItem {...itemProps} />
            })}
          </Dropdown.Menu>
        </Dropdown.Card>
      )
    }

    cy.render(<EmojiPickerMenu renderMenu={customMenu} />)
    expect(cy.get('.c-custom-dropdown').exists()).toBeTruthy()
  })
})

describe('items', () => {
  test('Renders Items', () => {
    cy.render(<EmojiPickerMenu items={emojiSet} />)

    expect(cy.get('.c-EmojiPickerMenu').exists()).toBeTruthy()
    expect(cy.get('.c-emojiPickerItem').length).toBeTruthy()
  })
})
