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

afterEach(() => {
  document.body.innerHTML = ''
})

test('Can create a component as a HOC', () => {
  const TestComponent = PortalWrapper()(TestButton)
  const wrapper = mount(<TestComponent isOpen />)
  const c = document.body.childNodes[0]

  expect(c.innerHTML).toContain('button')

  wrapper.unmount()
})

test('Adds default ID', () => {
  const TestComponent = PortalWrapper()(TestButton)
  const wrapper = mount(<TestComponent isOpen />)
  const c = document.body.childNodes[0]

  expect(c.id).toContain('PortalWrapper')

  wrapper.unmount()
})

test('Override default ID with options', () => {
  const options = {
    id: 'Brick'
  }
  const TestComponent = PortalWrapper(options)(TestButton)
  const wrapper = mount(<TestComponent isOpen />)
  const c = document.body.childNodes[0]
  expect(c.id).toContain('Brick')

  wrapper.unmount()
})
