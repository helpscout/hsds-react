import React from 'react'
import { mount } from 'enzyme'
import Label from '../Label'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Label />)

    expect(wrapper.getDOMNode().classList.contains('c-Label')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Label className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(<Label>Channel 4</Label>)
    const text = wrapper.find('Text')

    expect(text.exists()).toBeTruthy()
    expect(text.text()).toBe('Channel 4')
  })

  test('Renders React Component as content', () => {
    const wrapper = mount(
      <Label>
        <div className="gator">Gator</div>
      </Label>
    )
    const o = wrapper.find('.gator')

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Gator')
  })
})

describe('For', () => {
  test('Accepts for prop', () => {
    const wrapper = mount(<Label for="channel">Channel 4</Label>)

    expect(wrapper.prop('for')).toBe('channel')
  })
})

describe('States', () => {
  test('Applies error styles if specified', () => {
    const wrapper = mount(<Label state="error" />)

    expect(wrapper.getDOMNode().classList.contains('is-error')).toBe(true)
  })

  test('Applies success styles if specified', () => {
    const wrapper = mount(<Label state="success" />)

    expect(wrapper.getDOMNode().classList.contains('is-success')).toBe(true)
  })

  test('Applies warning styles if specified', () => {
    const wrapper = mount(<Label state="warning" />)

    expect(wrapper.getDOMNode().classList.contains('is-warning')).toBe(true)
  })
})

describe('Styles', () => {
  test('Applies marginless styles if specified', () => {
    const wrapper = mount(<Label isMarginless />)

    expect(wrapper.getDOMNode().classList.contains('is-marginless')).toBe(true)
  })
})
