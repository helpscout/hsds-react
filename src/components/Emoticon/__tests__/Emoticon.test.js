import React from 'react'
import { mount } from 'enzyme'
import Emoticon from '../Emoticon'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Emoticon name="happy" />)

    expect(wrapper.hasClass('c-Emoticon')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Emoticon name="happy" className={className} />)

    expect(wrapper.hasClass(className)).toBe(true)
  })
})

describe('Interactions', () => {
  test('Add ignoreClick styles if applied', () => {
    const wrapper = mount(<Emoticon name="emoji" clickable={false} />)

    expect(wrapper.hasClass('is-noInteract')).toBe(true)
  })
})

describe('Sizes', () => {
  test('Add sizing styles if applied', () => {
    const wrapper = mount(<Emoticon name="happy" size="sm" />)

    expect(wrapper.hasClass('is-sm')).toBe(true)
  })

  test('Has size md', () => {
    const wrapper = mount(<Emoticon name="happy" size="md" />)

    expect(wrapper.hasClass('is-md')).toBe(true)
  })
})

describe('Styles', () => {
  test('Add center styles if applied', () => {
    const wrapper = mount(<Emoticon name="happy" center />)

    expect(wrapper.hasClass('is-center')).toBe(true)
  })

  test('Add inline styles if applied', () => {
    const wrapper = mount(<Emoticon name="happy" inline />)

    expect(wrapper.hasClass('is-inline')).toBe(true)
  })

  test('Add active styles if applied', () => {
    const wrapper = mount(<Emoticon name="happy" isActive />)

    expect(wrapper.hasClass('is-active')).toBe(true)
  })

  test('Add disabled styles if applied', () => {
    const wrapper = mount(<Emoticon name="happy" isDisabled />)

    expect(wrapper.hasClass('is-disabled')).toBe(true)
  })

  test('Removes active styles if applied', () => {
    const wrapper = mount(<Emoticon name="happy" isActive={false} />)

    expect(wrapper.hasClass('is-active')).not.toBe(true)
  })
})
