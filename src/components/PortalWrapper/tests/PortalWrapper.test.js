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
  document.body.style.overflow = null
})

describe('HOC', () => {
  test('Can create a component as a HOC', () => {
    const TestComponent = PortalWrapper()(TestButton)
    mount(<TestComponent isOpen />)
    const c = document.body.childNodes[0]

    expect(c.querySelector('button')).toBeTruthy()
  })
})

describe('ID', () => {
  test('Adds default ID', () => {
    const TestComponent = PortalWrapper()(TestButton)
    mount(<TestComponent isOpen />)
    const c = document.body.childNodes[0]

    expect(c.id).toContain('PortalWrapper')
  })

  test('Override default ID with options', () => {
    const options = {
      id: 'Brick'
    }
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent isOpen />)
    const c = document.body.childNodes[0]

    expect(c.id).toContain('Brick')
  })
})
