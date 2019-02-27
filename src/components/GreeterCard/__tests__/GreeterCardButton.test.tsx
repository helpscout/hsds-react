import * as React from 'react'
import { mount } from 'enzyme'
import { Button } from '../'

describe('Children', () => {
  test('Can render children', () => {
    const children = 'Hello world'
    const wrapper = mount(<Button>{children}</Button>)

    expect(wrapper.html()).toContain(children)
  })
})

describe('onClick', () => {
  test('Can accept custom onClick callback', () => {
    const callback = jest.fn()
    const wrapper = mount(<Button onClick={callback}>Click Me</Button>)
    wrapper.simulate('click')

    expect(callback).toHaveBeenCalled()
  })
})
