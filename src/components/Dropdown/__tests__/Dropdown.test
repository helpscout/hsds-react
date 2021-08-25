import React from 'react'
import { mount } from 'enzyme'
import { Dropdown } from '../Dropdown'

const documentEvents = {
  click: event => undefined,
  keydown: event => undefined,
}

jest.mock('../Dropdown.Trigger', () => {
  const Trigger = props => <div />
  return () => <Trigger />
})
jest.mock('../Dropdown.MenuContainer', () => {
  const MenuContainer = props => <div />
  return () => <MenuContainer />
})

describe('Click events', () => {
  beforeEach(() => {
    document.addEventListener = jest.fn((event, handler) => {
      documentEvents[event] = handler
    })
  })

  afterEach(() => {
    document.addEventListener.mockRestore()
  })

  test('Closes dropdown on document.body click, outside of menu', () => {
    const spy = jest.fn()
    const wrapper = mount(<Dropdown isOpen={true} closeDropdown={spy} />)
    const outsideNode = document.createElement('div')
    const mockMenuNode = document.createElement('div')

    wrapper.instance()['menuNode'] = mockMenuNode

    documentEvents.click({ target: outsideNode })

    expect(spy).toHaveBeenCalled()
  })

  test('Does not trigger closeDropdown if event is falsy', () => {
    const spy = jest.fn()
    const wrapper = mount(<Dropdown isOpen={false} closeDropdown={spy} />)

    wrapper.instance()['menuNode'] = undefined

    documentEvents.click()

    expect(spy).not.toHaveBeenCalled()
  })

  test('Does not trigger closeDropdown if there is no menu', () => {
    const spy = jest.fn()
    const wrapper = mount(<Dropdown isOpen={false} closeDropdown={spy} />)
    const outsideNode = document.createElement('div')

    wrapper.instance()['menuNode'] = undefined

    documentEvents.click({ target: outsideNode })

    expect(spy).not.toHaveBeenCalled()
  })

  test('Does not trigger closeDropdown if already closed on document.body click', () => {
    const spy = jest.fn()
    const wrapper = mount(<Dropdown isOpen={false} closeDropdown={spy} />)
    const outsideNode = document.createElement('div')
    const mockMenuNode = document.createElement('div')

    wrapper.instance()['menuNode'] = mockMenuNode

    documentEvents.click({ target: outsideNode })

    expect(spy).not.toHaveBeenCalled()
  })

  test('Does not trigger closeDropdown if target is trigger', () => {
    const spy = jest.fn()
    const wrapper = mount(<Dropdown isOpen={false} closeDropdown={spy} />)
    const mockTriggerNode = document.createElement('div')
    const mockMenuNode = document.createElement('div')

    wrapper.instance()['triggerNode'] = mockTriggerNode
    wrapper.instance()['menuNode'] = mockMenuNode

    documentEvents.click({ target: mockTriggerNode })

    expect(spy).not.toHaveBeenCalled()
  })

  test('Does not trigger closeDropdown if target is within menu', () => {
    const spy = jest.fn()
    const wrapper = mount(<Dropdown isOpen={false} closeDropdown={spy} />)
    const targetNode = document.createElement('div')
    const mockMenuNode = document.createElement('div')
    mockMenuNode.appendChild(targetNode)

    wrapper.instance()['menuNode'] = mockMenuNode

    documentEvents.click({ target: targetNode })

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('setMenuNode', () => {
  test('Does not setMenuNode, if already defined', () => {
    const spy = jest.fn()
    const mockGetState = () => ({
      menuNode: true,
    })

    const wrapper = mount(
      <Dropdown getState={mockGetState} setMenuNode={spy} />
    )
    wrapper.setProps({ isOpen: true })
    wrapper.update()

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('setTriggerNode', () => {
  test('Does not setTriggerNode, if already defined', () => {
    const spy = jest.fn()
    const mockGetState = () => ({
      triggerNode: true,
    })

    const wrapper = mount(
      <Dropdown getState={mockGetState} setTriggerNode={spy} />
    )
    wrapper.setProps({ isOpen: true })
    wrapper.update()

    expect(spy).not.toHaveBeenCalled()
  })
})
