import * as React from 'react'
import { mount } from 'enzyme'

import Actions from '../Form.Actions'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Actions />)
    expect(wrapper.getDOMNode().classList.contains('c-FormActions')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'skynet'
    const wrapper = mount(<Actions className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Does not renders child content', () => {
    const text = 'Battlestar'
    const wrapper = mount(<Actions>text</Actions>)

    expect(wrapper.text()).not.toBe(text)
  })
})

describe('Direction', () => {
  test('Renders right-aligned, by default', () => {
    const wrapper = mount(<Actions />)
    const el = wrapper.find('.c-FormActions')

    expect(el.hostNodes().hasClass('is-right')).toBe(true)
    expect(el.hostNodes().hasClass('is-left')).toBe(false)
  })

  test('Can render left-aligned, if specified', () => {
    const wrapper = mount(<Actions direction="left" />)
    const el = wrapper.find('.c-FormActions')

    expect(el.hostNodes().hasClass('is-right')).toBe(false)
    expect(el.hostNodes().hasClass('is-left')).toBe(true)
  })
})

describe('Slots', () => {
  test('Can render in primary slot', () => {
    const wrapper = mount(<Actions primary={<button id="primary" />} />)
    const el = wrapper.find('.c-FormActions')
    const primaryButton = wrapper.find('#primary')

    expect(el.hostNodes().hasClass('withPrimary')).toBe(true)
    expect(primaryButton).toHaveLength(1)
  })

  test('Can render in secondary slot', () => {
    const wrapper = mount(
      <Actions
        primary={<button id="primary" />}
        secondary={<button id="secondary" />}
      />
    )
    const el = wrapper.find('.c-FormActions')
    const primaryButton = wrapper.find('#primary')
    const secondaryButton = wrapper.find('#secondary')

    expect(el.hostNodes().hasClass('withPrimary')).toBe(true)
    expect(el.hostNodes().hasClass('withSecondary')).toBe(true)
    expect(primaryButton).toHaveLength(1)
    expect(secondaryButton).toHaveLength(1)
  })

  test('Can render in serious slot', () => {
    const wrapper = mount(
      <Actions
        primary={<button id="primary" />}
        secondary={<button id="secondary" />}
        serious={<button id="serious" />}
      />
    )
    const el = wrapper.find('.c-FormActions')
    const primaryButton = wrapper.find('#primary')
    const secondaryButton = wrapper.find('#secondary')
    const seriousButton = wrapper.find('#serious')

    expect(el.hostNodes().hasClass('withPrimary')).toBe(true)
    expect(el.hostNodes().hasClass('withSecondary')).toBe(true)
    expect(el.hostNodes().hasClass('withSerious')).toBe(true)
    expect(primaryButton).toHaveLength(1)
    expect(secondaryButton).toHaveLength(1)
    expect(seriousButton).toHaveLength(1)
  })
})
