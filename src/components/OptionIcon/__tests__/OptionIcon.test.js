import * as React from 'react'
import { mount } from 'enzyme'
import OptionIcon from '../OptionIcon'
import Icon from '../../Icon'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<OptionIcon />)

    expect(wrapper.getDOMNode().classList.contains('c-OptionIcon')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<OptionIcon className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Icon', () => {
  test('Renders an Icon, by default', () => {
    const wrapper = mount(<OptionIcon />)
    const el = wrapper.find(Icon)

    expect(el.length).toBe(1)
  })

  test('Renders a specified icon', () => {
    const wrapper = mount(<OptionIcon icon="search" />)
    const el = wrapper.find(Icon)

    expect(el.prop('name')).toBe('search')
  })

  test('Passes title to Icon', () => {
    const wrapper = mount(<OptionIcon icon="search" title="Go" />)
    const el = wrapper.find(Icon)

    expect(el.prop('name')).toBe('search')
    expect(el.prop('title')).toBe('Go')
  })
})
