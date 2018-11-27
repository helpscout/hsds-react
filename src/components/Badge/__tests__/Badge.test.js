import React from 'react'
import { mount } from 'enzyme'
import Badge from '..'

const statusTestHelper = status => {
  test(`Applies ${status} styles if applied`, () => {
    const wrapper = mount(<Badge status={status}>Zoolander</Badge>)
    const el = wrapper.find('div.c-Badge')

    expect(el.hasClass(`is-${status}`)).toBe(true)
  })
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Badge />)
    const el = wrapper.find('div.c-Badge')

    expect(el.hasClass('c-Badge')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Badge className="zoolander" />)
    const el = wrapper.find('div.c-Badge')

    expect(el.hasClass('zoolander')).toBe(true)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(<Badge>Zoolander</Badge>)

    expect(wrapper.text()).toBe('Zoolander')
  })
})

describe('Styles', () => {
  test('Applies style className if applied', () => {
    const wrapper = mount(<Badge white>Zoolander</Badge>)
    const el = wrapper.find('div.c-Badge')

    expect(el.hasClass('is-white')).toBe(true)
  })

  test('Has display styles', () => {
    const wrapper = mount(<Badge display="inlineBlock" />)
    const el = wrapper.find('div.c-Badge')

    expect(el.hasClass('is-display-inlineBlock')).toBe(true)
  })
})

describe('Sizes', () => {
  test('Applies size styles if applied', () => {
    const wrapper = mount(<Badge size="sm">Zoolander</Badge>)
    const el = wrapper.find('div.c-Badge')

    expect(el.hasClass('is-sm')).toBe(true)
  })
})

describe('Status', () => {
  const status = ['error', 'info', 'success', 'warning']

  status.forEach(s => statusTestHelper(s))
})
