import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import Heading from './Heading'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<Heading />)

    expect(wrapper.getDOMNode().classList.contains('c-Heading')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<Heading className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
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

    expect(wrapper1.getDOMNode().classList.contains('is-h1')).toBe(true)
    expect(wrapperSm.getDOMNode().classList.contains('is-small')).toBe(true)
  })

  test('Applies disableSelect styles if specified', () => {
    const wrapper = mount(<Heading disableSelect />)

    expect(wrapper.getDOMNode().classList.contains('is-disableSelect')).toBe(
      true
    )
  })

  test('Applies center styles if specified', () => {
    const wrapper = mount(<Heading center />)

    expect(wrapper.getDOMNode().classList.contains('is-center')).toBe(true)
  })

  test('Applies link-style styles if specified', () => {
    const wrapper = mount(<Heading linkStyle />)

    expect(wrapper.getDOMNode().classList.contains('is-linkStyle')).toBe(true)
  })

  test('Applies light styles if specified', () => {
    const wrapper = mount(<Heading light />)

    expect(wrapper.getDOMNode().classList.contains('is-light')).toBe(true)
  })

  test('Applies line-height reset styles if specified', () => {
    const wrapper = mount(<Heading lineHeightReset />)

    expect(wrapper.getDOMNode().classList.contains('is-lineHeightReset')).toBe(
      true
    )
  })

  test('Applies line-height inherit styles if specified', () => {
    const wrapper = mount(<Heading lineHeightInherit />)

    expect(
      wrapper.getDOMNode().classList.contains('is-lineHeightInherit')
    ).toBe(true)
  })

  test('Applies truncate styles if specified', () => {
    const wrapper = mount(<Heading truncate />)

    expect(wrapper.getDOMNode().classList.contains('is-truncate')).toBe(true)
  })

  test('Applies word-wrap styles if specified', () => {
    const wrapper = mount(<Heading wordWrap />)

    expect(wrapper.getDOMNode().classList.contains('is-wordWrap')).toBe(true)
  })

  test('Applies no word-wrap styles if specified', () => {
    const wrapper = mount(<Heading noWrap />)

    expect(wrapper.getDOMNode().classList.contains('is-noWrap')).toBe(true)
  })

  test('Applies weight styles if specified', () => {
    const wrapper = mount(<Heading weight={200} />)

    expect(wrapper.getDOMNode().classList.contains('is-200')).toBe(true)
  })
})
