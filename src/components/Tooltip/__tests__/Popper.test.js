import React from 'react'
import Popper from '../Popper'
import { mount } from 'enzyme'

describe('classNames', () => {
  test('Can accept custom className', () => {
    const wrapper = mount(<Popper className="derek" />)

    expect(wrapper.hasClass('derek')).toBe(true)
  })
})

describe('Children', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Popper>
        <div className="ron" />
      </Popper>
    )
    const el = wrapper.find('.ron')

    expect(el.length).toBeTruthy()
  })
})
