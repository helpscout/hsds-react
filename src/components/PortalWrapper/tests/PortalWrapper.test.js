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

describe('Body lock', () => {
  test('Does not enable body lock by default', () => {
    const options = {}
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent isOpen />)

    expect(wrapper.state().lockBodyOnOpen).toBe(false)
  })

  test('Enables body lock if defined', () => {
    const options = { lockBodyOnOpen: true }
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent isOpen />)

    expect(wrapper.state().lockBodyOnOpen).toBe(true)
  })

  test('Locks body when opened, if enabled', () => {
    const options = { lockBodyOnOpen: true }
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent isOpen />)
    const o = wrapper.instance()

    o.openPortal()

    expect(document.body.style.overflow).toBe('hidden')
  })

  test('Does not lock body when opened, if not enabled', () => {
    const options = { lockBodyOnOpen: false }
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent isOpen />)
    const o = wrapper.instance()

    o.openPortal()

    expect(document.body.style.overflow).not.toBe('hidden')
  })

  test('Unlocks body when closed, after being opened, if enabled', () => {
    const options = { lockBodyOnOpen: true }
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent isOpen />)
    const o = wrapper.instance()

    o.openPortal()
    o.closePortal()

    expect(document.body.style.overflow).not.toBe('hidden')
  })

  test('Restores body overflow to previous setting, after being closed', () => {
    const options = { lockBodyOnOpen: true }
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent isOpen />)
    const o = wrapper.instance()

    document.body.style.overflow = 'auto'

    o.openPortal()
    o.closePortal()

    expect(document.body.style.overflow).toBe('auto')
  })
})
