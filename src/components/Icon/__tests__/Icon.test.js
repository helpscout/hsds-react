import React from 'react'
import { mount } from 'enzyme'
import Icon from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Icon name="emoji" />)

    expect(wrapper.hasClass('c-Icon')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Icon name="emoji" className={className} />)

    expect(wrapper.hasClass(className)).toBe(true)
  })

  test('Applies icon name className', () => {
    const className = 'channel-4'
    const wrapper = mount(<Icon name="emoji" className={className} />)

    expect(wrapper.hasClass(className)).toBe(true)
    expect(wrapper.hasClass('is-iconName-emoji')).toBe(true)
  })
})

describe('Interactions', () => {
  test('Add clickable styles if applied', () => {
    const wrapper = mount(<Icon name="emoji" clickable />)

    expect(wrapper.hasClass('is-clickable')).toBe(true)
    expect(wrapper.hasClass('is-noInteract')).not.toBe(true)
  })

  test('Add ignoreClick styles if applied', () => {
    const wrapper = mount(<Icon name="emoji" ignoreClick />)

    expect(wrapper.hasClass('is-clickable')).not.toBe(true)
    expect(wrapper.hasClass('is-noInteract')).toBe(true)
  })
})

describe('Sizes', () => {
  test('Add sizing styles if applied', () => {
    const wrapper = mount(<Icon name="emoji" size="24" />)

    expect(wrapper.hasClass('is-24')).toBe(true)
  })

  test('Has size 13', () => {
    const wrapper = mount(<Icon name="emoji" size="13" />)

    expect(wrapper.hasClass('is-13')).toBe(true)
  })
})

describe('Shade', () => {
  test('Add shade styles if applied', () => {
    const wrapper = mount(<Icon name="emoji" shade="muted" />)

    expect(wrapper.hasClass('is-muted')).toBe(true)
  })
})

describe('Styles', () => {
  test('Add center styles if applied', () => {
    const wrapper = mount(<Icon name="emoji" center />)

    expect(wrapper.hasClass('is-center')).toBe(true)
  })

  test('Add faint styles if applied', () => {
    const wrapper = mount(<Icon name="emoji" faint />)

    expect(wrapper.hasClass('is-faint')).toBe(true)
  })

  test('Add muted styles if applied', () => {
    const wrapper = mount(<Icon name="emoji" muted />)

    expect(wrapper.hasClass('is-muted')).toBe(true)
  })

  test('Add subtle styles if applied', () => {
    const wrapper = mount(<Icon name="emoji" subtle />)

    expect(wrapper.hasClass('is-subtle')).toBe(true)
  })
})

describe('withCaret', () => {
  const caretClassName = '.c-Icon__icon.is-caret'

  test('Does not render caret by default', () => {
    const wrapper = mount(<Icon name="emoji" />)
    const o = wrapper.find(caretClassName)

    expect(o.length).toBe(0)
  })

  test('Can render caret, if specified', () => {
    const wrapper = mount(<Icon name="emoji" withCaret />)
    const o = wrapper.find(caretClassName)

    expect(wrapper.hasClass('withCaret')).toBe(true)
    expect(o.length).toBe(1)
  })
})
