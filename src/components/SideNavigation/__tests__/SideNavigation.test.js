import * as React from 'react'
import { mount } from 'enzyme'
import { SideNavigation } from '../SideNavigation'
import { hasClass } from '../../../tests/helpers/enzyme'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<SideNavigation />)

    expect(hasClass(wrapper, 'c-SideNavigation')).toBe(true)
  })
  test('Add custom className', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<SideNavigation className={customClass} />)

    expect(hasClass(wrapper, customClass)).toBe(true)
  })
})
