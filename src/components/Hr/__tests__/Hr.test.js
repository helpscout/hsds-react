import React from 'react'
import { mount } from 'enzyme'
import Hr from '../Hr'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-Hr',
  skipChildrenTest: true,
}

baseComponentTest(Hr, baseComponentOptions)

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

    expect(wrapper.hasClass('is-sm')).toBeTruthy()
  })
})
