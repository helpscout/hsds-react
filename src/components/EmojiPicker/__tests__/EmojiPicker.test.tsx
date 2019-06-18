import * as React from 'react'
import { cy } from '@helpscout/cyan'
import EmojiPicker from '../index'

cy.useFakeTimers()

describe('className', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<EmojiPicker />)

    expect(wrapper.hasClass('c-EmojiPicker')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = cy.render(<EmojiPicker className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    cy.render(<EmojiPicker data-cy="BlueBlueBlue" />)
    const el = cy.getByCy('BlueBlueBlue')

    expect(el.exists()).toBeTruthy()
  })
})

describe('renderTrigger', () => {
  test('Has default trigger component', () => {
    cy.render(<EmojiPicker />)
    const trigger = cy.get('.c-EmojiPickerTrigger')

    expect(trigger.exists()).toBeTruthy()
  })

  test('Can render custom trigger', () => {
    cy.render(
      <EmojiPicker
        renderTrigger={() => (
          <span className="custom-trigger">Custom Trigger</span>
        )}
      />
    )
    const defaultTrigger = cy.get('.c-EmojiPickerTrigger')
    const customTrigger = cy.get('.custom-trigger')

    expect(defaultTrigger.exists()).toBeFalsy()
    expect(customTrigger.exists()).toBeTruthy()
  })
})

describe('Menu/Item', () => {
  test('Renders an Emoji correctly within a Menu/Item', () => {
    cy.render(<EmojiPicker isOpen={true} />)

    expect(cy.getByCy('EmojiPickerMenu').exists()).toBeTruthy()
    expect(cy.getByCy('EmojiPickerItem').exists()).toBeTruthy()

    expect(
      cy
        .getByCy('EmojiPickerItem')
        .find('[data-cy="EmojiPickerEmoji"]')
        .exists()
    ).toBeTruthy()
  })
})
