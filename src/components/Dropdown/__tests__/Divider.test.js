import * as React from 'react'
import { mount } from 'enzyme'
import Divider from '../Dropdown.Divider'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Divider />)
    const el = wrapper.find('div.c-DropdownDivider')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Divider className={customClass} />)
    const el = wrapper.find('div.c-DropdownDivider')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})
