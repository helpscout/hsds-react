import * as React from 'react'
import { mount } from 'enzyme'
import Actions from '../Page.Actions'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Actions />)

    expect(wrapper.getDOMNode().classList.contains('c-PageActions')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Actions className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Does not renders child content', () => {
    const wrapper = mount(<Actions>Channel 4</Actions>)

    expect(wrapper.text()).not.toBe('Channel 4')
  })
})

describe('Direction', () => {
  test('Renders right-aligned, by default', () => {
    const wrapper = mount(<Actions />)

    expect(wrapper.getDOMNode().classList.contains('is-right')).toBe(true)
  })

  test('Can render left-aligned, if specified', () => {
    const wrapper = mount(<Actions direction="left" />)

    expect(wrapper.getDOMNode().classList.contains('is-right')).toBe(false)
    expect(wrapper.getDOMNode().classList.contains('is-left')).toBe(true)
  })
})

describe('Slots', () => {
  test('Can render in primary slot', () => {
    const wrapper = mount(<Actions primary={<button />} />)

    expect(wrapper.find('button').length).toBe(1)
    expect(wrapper.getDOMNode().classList.contains('withPrimary')).toBe(true)
  })

  test('Can render in secondary slot', () => {
    const wrapper = mount(
      <Actions
        primary={<button id="primary" />}
        secondary={<button id="secondary" />}
      />
    )

    expect(wrapper.find('#primary').length).toBe(1)
    expect(wrapper.find('#secondary').length).toBe(1)
    expect(wrapper.getDOMNode().classList.contains('withPrimary')).toBe(true)
    expect(wrapper.getDOMNode().classList.contains('withSecondary')).toBe(true)
  })

  test('Can render in serious slot', () => {
    const wrapper = mount(
      <Actions
        primary={<button id="primary" />}
        secondary={<button id="secondary" />}
        serious={<button id="serious" />}
      />
    )

    expect(wrapper.find('#primary').length).toBe(1)
    expect(wrapper.find('#secondary').length).toBe(1)
    expect(wrapper.find('#serious').length).toBe(1)
    expect(wrapper.getDOMNode().classList.contains('withPrimary')).toBe(true)
    expect(wrapper.getDOMNode().classList.contains('withSecondary')).toBe(true)
    expect(wrapper.getDOMNode().classList.contains('withSerious')).toBe(true)
  })
})
