import * as React from 'react'
import { cy } from '@helpscout/cyan'
import Actions from '../Page.Actions'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = cy.render(<Actions />)
    const el = wrapper.find('.c-PageActions')

    expect(el.exists()).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = cy.render(<Actions className={className} />)
    const el = wrapper.find('.c-PageActions')

    expect(el.hasClass(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Does not renders child content', () => {
    const wrapper = cy.render(<Actions>Channel 4</Actions>)

    expect(wrapper.text()).not.toBe('Channel 4')
  })
})

describe('Direction', () => {
  test('Renders right-aligned, by default', () => {
    const wrapper = cy.render(<Actions />)
    const el = wrapper.find('.c-PageActions')

    expect(el.hasClass('is-right')).toBe(true)
  })

  test('Can render left-aligned, if specified', () => {
    const wrapper = cy.render(<Actions direction="left" />)
    const el = wrapper.find('.c-PageActions')

    expect(el.hasClass('is-right')).toBe(false)
    expect(el.hasClass('is-left')).toBe(true)
  })
})

describe('Slots', () => {
  test('Can render in primary slot', () => {
    const wrapper = cy.render(<Actions primary={<button />} />)
    const el = wrapper.find('.c-PageActions')

    expect(cy.get('button').length).toBe(1)
    expect(el.hasClass('withPrimary')).toBe(true)
  })

  test('Can render in secondary slot', () => {
    const wrapper = cy.render(
      <Actions
        primary={<button id="primary" />}
        secondary={<button id="secondary" />}
      />
    )
    const el = wrapper.find('.c-PageActions')

    expect(cy.get('#primary').exists()).toBeTruthy()
    expect(cy.get('#secondary').exists()).toBeTruthy()

    expect(el.hasClass('withPrimary')).toBe(true)
    expect(el.hasClass('withSecondary')).toBe(true)
  })

  test('Can render in serious slot', () => {
    const wrapper = cy.render(
      <Actions
        primary={<button id="primary" />}
        secondary={<button id="secondary" />}
        serious={<button id="serious" />}
      />
    )
    const el = wrapper.find('.c-PageActions')

    expect(cy.get('#primary').exists()).toBeTruthy()
    expect(cy.get('#secondary').exists()).toBeTruthy()
    expect(cy.get('#serious').exists()).toBeTruthy()

    expect(el.hasClass('withPrimary')).toBe(true)
    expect(el.hasClass('withSecondary')).toBe(true)
    expect(el.hasClass('withSerious')).toBe(true)
  })
})

describe('Sticky', () => {
  test('Does not render sticky wrapper, by default', () => {
    const wrapper = cy.render(<Actions />)
    const el = wrapper.find('.c-PageActions__stickyWrapper')

    expect(el.exists()).toBeFalsy()
  })
})
