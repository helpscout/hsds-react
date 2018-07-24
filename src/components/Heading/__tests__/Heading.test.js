import React from 'react'
import { mount } from 'enzyme'
import Heading from '..'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<Heading />)

    expect(wrapper.hasClass('c-Heading')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<Heading className={className} />)

    expect(wrapper.hasClass(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(<Heading>Gator</Heading>)

    expect(wrapper.text()).toBe('Gator')
  })
})

describe('Selector', () => {
  test('Renders a div selector by default', () => {
    const wrapper = mount(<Heading />)
    const el = wrapper.find('div')

    expect(el.length).toBe(1)
  })

  test('Renders a custom selector, if specified', () => {
    const wrapper = mount(<Heading selector="span" />)
    const el = wrapper.find('span')

    expect(el.length).toBe(1)
  })
})

describe('Styles', () => {
  test('Applies sizing styles if specified', () => {
    const wrapper1 = mount(<Heading size="h1" />)
    const wrapperSm = mount(<Heading size="small" />)

    expect(wrapper1.hasClass('is-h1')).toBe(true)
    expect(wrapperSm.hasClass('is-small')).toBe(true)
  })

  test('Applies disableSelect styles if specified', () => {
    const wrapper = mount(<Heading disableSelect />)

    expect(wrapper.hasClass('is-disableSelect')).toBe(true)
  })

  test('Applies center styles if specified', () => {
    const wrapper = mount(<Heading center />)

    expect(wrapper.hasClass('is-center')).toBe(true)
  })

  test('Applies link-style styles if specified', () => {
    const wrapper = mount(<Heading linkStyle />)

    expect(wrapper.hasClass('is-linkStyle')).toBe(true)
  })

  test('Applies light styles if specified', () => {
    const wrapper = mount(<Heading light />)

    expect(wrapper.hasClass('is-light')).toBe(true)
  })

  test('Applies line-height reset styles if specified', () => {
    const wrapper = mount(<Heading lineHeightReset />)

    expect(wrapper.hasClass('is-line-height-reset')).toBe(true)
  })
})
