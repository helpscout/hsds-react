import * as React from 'react'
import { mount } from 'enzyme'
import { Block } from '../Dropdown.Block'
import { hasClass } from './Dropdown.testHelpers'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<Block />)

    expect(hasClass(wrapper, 'c-DropdownV2Block')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Block className="ron" />)

    expect(hasClass(wrapper, 'ron')).toBe(true)
  })
})

describe('children', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Block>
        <div className="ron">Ron</div>
      </Block>
    )

    expect(wrapper.find('div.ron').length).toBeTruthy()
  })
})

describe('innerRef', () => {
  test('Can set an innerRef to a DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Block innerRef={spy} />)
    const el = wrapper.getDOMNode()

    expect(spy).toHaveBeenCalledWith(el)
  })
})

describe('Styles', () => {
  test('Can render seamless styles', () => {
    const wrapper = mount(<Block isSeamless />)

    expect(hasClass(wrapper, 'is-seamless')).toBe(true)
  })

  test('Can render stretchy styles', () => {
    const wrapper = mount(<Block isStretchy />)

    expect(hasClass(wrapper, 'is-stretchy')).toBe(true)
  })
})
