import React from 'react'
import { shallow } from 'enzyme'
import Item from '../Item'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-List__item',
}

baseComponentTest(Item, baseComponentOptions)

describe('Selector', () => {
  test('Renders an li', () => {
    const wrapper = shallow(<Item />)

    expect(wrapper.find('li').length).toBeTruthy()
  })
})

describe('Accessibility', () => {
  test('Has an aria-role by default', () => {
    const wrapper = shallow(<Item />)

    expect(wrapper.find('li').props().role).toBe('listitem')
  })

  test('Role can be overridden', () => {
    const wrapper = shallow(<Item role="presentation" />)

    expect(wrapper.find('li').props().role).toBe('presentation')
  })
})
