import React from 'react'
import { mount } from 'enzyme'
import Hr from '../Hr'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<Hr />)

    expect(wrapper.getDOMNode().classList.contains('c-Hr')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<Hr className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Accessibility', () => {
  test('Has proper aria roles', () => {
    const wrapper = mount(<Hr />)
    const o = wrapper.find('hr').props()

    expect(o['role']).toBe('separator')
  })

  test('Can set custom role', () => {
    const wrapper = mount(<Hr role="presentation" />)
    const o = wrapper.find('hr').props()

    expect(o['role']).toBe('presentation')
  })
})

describe('Styles', () => {
  test('Can render size styles, if applicable', () => {
    const wrapper = mount(<Hr size="sm" />)

    expect(wrapper.getDOMNode().classList.contains('is-sm')).toBeTruthy()
  })
})
