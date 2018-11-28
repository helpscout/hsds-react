import * as React from 'react'
import { mount } from 'enzyme'
import { Header } from '../Dropdown.Header'
import { hasClass } from './Dropdown.testHelpers'

describe('className', () => {
  test('Has a default className', () => {
    const wrapper = mount(<Header />)

    expect(hasClass(wrapper, 'c-DropdownV2Header')).toBe(true)
  })

  test('Accepts custom className', () => {
    const wrapper = mount(<Header className="ron" />)

    expect(hasClass(wrapper, 'ron')).toBe(true)
  })
})

describe('children', () => {
  test('Does render children', () => {
    const wrapper = mount(
      <Header>
        <div className="ron">Ron</div>
      </Header>
    )

    expect(wrapper.find('div.ron').length).toBeTruthy()
  })
})

describe('Label', () => {
  test('Can render label, if no children is provided', () => {
    const wrapper = mount(<Header label="Ron" />)

    expect(wrapper.text()).toContain('Ron')
  })
})

describe('innerRef', () => {
  test('Can set an innerRef to a DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<Header innerRef={spy} />)
    const el = wrapper.getDOMNode()

    expect(spy).toHaveBeenCalledWith(el)
  })
})
