import * as React from 'react'
import { mount } from 'enzyme'
import { Dropdown } from '../Dropdown'
import Keys from '../../../../constants/Keys'
// Mocking the components below
// @ts-ignore
import Trigger from '../Dropdown.Trigger'
// @ts-ignore
import MenuContainer from '../Dropdown.MenuContainer'

const documentEvents = {
  click: (event: any) => undefined,
  keydown: (event: any) => undefined,
}

jest.mock('../Dropdown.Trigger', () => {
  const Trigger = props => <div />
  return {
    default: () => <Trigger />,
  }
})
jest.mock('../Dropdown.MenuContainer', () => {
  const MenuContainer = props => <div />
  return {
    default: () => <MenuContainer />,
  }
})

describe('ESC: Keyboard events', () => {
  beforeEach(() => {
    document.addEventListener = jest.fn((event, handler) => {
      documentEvents[event] = handler
    })
  })

  afterEach(() => {
    // @ts-ignore
    document.addEventListener.mockRestore()
  })

  test('Closes dropdown on ESC key press', () => {
    const spy = jest.fn()
    const eventSpy = jest.fn()
    mount(<Dropdown isOpen={true} closeDropdown={spy} />)

    documentEvents.keydown({
      keyCode: Keys.ESCAPE,
      preventDefault: eventSpy,
    })

    expect(spy).toHaveBeenCalled()
    expect(eventSpy).toHaveBeenCalled()
  })

  test('Does not fire closeDropdown if not open', () => {
    const spy = jest.fn()
    const eventSpy = jest.fn()
    mount(<Dropdown isOpen={false} closeDropdown={spy} />)

    documentEvents.keydown({
      keyCode: Keys.ESCAPE,
      preventDefault: eventSpy,
    })

    expect(spy).not.toHaveBeenCalled()
    expect(eventSpy).not.toHaveBeenCalled()
  })

  test('Refocuses trigger node on close', () => {
    const spy = jest.fn()
    const eventSpy = jest.fn()
    const wrapper = mount(<Dropdown isOpen={true} closeDropdown={spy} />)
    wrapper.instance()['triggerNode'] = {
      focus: eventSpy,
    }

    documentEvents.keydown({
      keyCode: Keys.ESCAPE,
    })

    expect(spy).toHaveBeenCalled()
    expect(eventSpy).toHaveBeenCalled()
  })

  test('Does not focus trigger node if not open', () => {
    const eventSpy = jest.fn()
    const wrapper = mount(<Dropdown isOpen={false} />)
    wrapper.instance()['triggerNode'] = {
      focus: eventSpy,
    }

    documentEvents.keydown({
      keyCode: Keys.ESCAPE,
    })

    expect(eventSpy).not.toHaveBeenCalled()
  })
})

describe('Click events', () => {
  beforeEach(() => {
    document.addEventListener = jest.fn((event, handler) => {
      documentEvents[event] = handler
    })
  })

  afterEach(() => {
    // @ts-ignore
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

    // @ts-ignore
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
