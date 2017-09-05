import React from 'react'
import { mount } from 'enzyme'
import PortalWrapper from '..'

const PORTAL_TEST_TIMEOUT = 250
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

test('Override default ID with options', (done) => {
  const options = {
    id: 'Brick'
  }
  const TestComponent = PortalWrapper(options)(TestButton)
  const wrapper = mount(<TestComponent isOpen />)

  setTimeout(() => {
    const c = document.body.childNodes[0]
    expect(c.id).toContain('Brick')

    wrapper.unmount()

    done()
  }, PORTAL_TEST_TIMEOUT)
})
