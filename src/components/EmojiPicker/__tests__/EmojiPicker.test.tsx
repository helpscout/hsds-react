import * as React from 'react'
import { cy } from '@helpscout/cyan'
import Dropdown from '../../Dropdown/V2'
import EmojiPicker from '../index'

cy.useFakeTimers()

// describe('className', () => {
//   test('Has default className', () => {
//     const wrapper = cy.render(<EmojiPicker />)

//     expect(wrapper.hasClass('c-EmojiPicker')).toBeTruthy()
//   })

//   test('Can render custom className', () => {
//     const customClassName = 'blue'
//     const wrapper = cy.render(<EmojiPicker className={customClassName} />)

//     expect(wrapper.hasClass(customClassName)).toBeTruthy()
//   })
// })

// describe('renderTrigger', () => {
//   test('Has default trigger component', () => {
//     cy.render(<EmojiPicker />)
//     const trigger = cy.get('.c-EmojiPickerTrigger')

//     expect(trigger.exists()).toBeTruthy()
//   })

//   test('Can render custom trigger', () => {
//     cy.render(
//       <EmojiPicker
//         renderTrigger={() => (
//           <span className="custom-trigger">Custom Trigger</span>
//         )}
//       />
//     )
//     const defaultTrigger = cy.get('.c-EmojiPickerTrigger')
//     const customTrigger = cy.get('.custom-trigger')

//     expect(defaultTrigger.exists()).toBeFalsy()
//     expect(customTrigger.exists()).toBeTruthy()
//   })
// })

describe('renderMenu', () => {
  test('Can render custom menu', () => {
    const customMenu = ({ children }) => {
      return (
        <Dropdown.Card className="c-custom-dropdown">
          <Dropdown.Menu>{children}</Dropdown.Menu>
        </Dropdown.Card>
      )
    }

    cy.render(<EmojiPicker renderMenu={customMenu} isOpen />)

    // cy.getByCy('EmojiPickerTrigger').click()

    // expect(cy.get('.c-custom-dropdown').exists()).toBeTruthy()
  })
})

// describe('HTML props', () => {
//   test('Can render default HTML props', () => {
//     cy.render(<EmojiPicker data-cy="BlueBlueBlue" />)
//     const el = cy.getByCy('BlueBlueBlue')

//     expect(el.exists()).toBeTruthy()
//   })
// })
