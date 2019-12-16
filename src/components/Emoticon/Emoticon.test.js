import React from 'react'
import { mount } from 'enzyme'
import { Emoticon } from './Emoticon'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Emoticon name="happy" />)

    expect(wrapper.getDOMNode().classList.contains('c-Emoticon')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Emoticon name="happy" className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Interactions', () => {
  test('Add ignoreClick styles if applied', () => {
    const wrapper = mount(<Emoticon name="emoji" clickable={false} />)

    expect(wrapper.getDOMNode().classList.contains('is-noInteract')).toBe(true)
  })
})

describe('Sizes', () => {
  test('Add sizing styles if applied', () => {
    const wrapper = mount(<Emoticon name="happy" size="sm" />)

    expect(wrapper.getDOMNode().classList.contains('is-sm')).toBe(true)
  })

  test('Has size md', () => {
    const wrapper = mount(<Emoticon name="happy" size="md" />)

    expect(wrapper.getDOMNode().classList.contains('is-md')).toBe(true)
  })
})

describe('Styles', () => {
  test('Add center styles if applied', () => {
    const wrapper = mount(<Emoticon name="happy" center />)

    expect(wrapper.getDOMNode().classList.contains('is-center')).toBe(true)
  })

  test('Add inline styles if applied', () => {
    const wrapper = mount(<Emoticon name="happy" inline />)

    expect(wrapper.getDOMNode().classList.contains('is-inline')).toBe(true)
  })

  test('Add active styles if applied', () => {
    const wrapper = mount(<Emoticon name="happy" isActive />)

    expect(wrapper.getDOMNode().classList.contains('is-active')).toBe(true)
  })

  test('Add disabled styles if applied', () => {
    const wrapper = mount(<Emoticon name="happy" isDisabled />)

    expect(wrapper.getDOMNode().classList.contains('is-disabled')).toBe(true)
  })

  test('Removes active styles if applied', () => {
    const wrapper = mount(<Emoticon name="happy" isActive={false} />)

    expect(wrapper.getDOMNode().classList.contains('is-active')).not.toBe(true)
  })
})
