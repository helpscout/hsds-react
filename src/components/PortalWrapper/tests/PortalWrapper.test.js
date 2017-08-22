import React from 'react'
import { mount } from 'enzyme'
import PortalWrapper from '..'

const TestButton = props => {
  const handleClick = () => {
    console.log('wee')
  }
  return (
    <button onClick={handleClick}>Click</button>
  )
}

test('Can create a component as a HOC', () => {
  const TestComponent = PortalWrapper()(TestButton)
  const wrapper = mount(<TestComponent isOpen />)

  expect(wrapper.find('button')).toHaveLength(1)

  wrapper.unmount()
})
