import React from 'react'
import { mount } from 'enzyme'
import EventListener from '..'

const simulateEvent = (eventName) => {
  window.dispatchEvent(new Event(eventName))
}

describe('Events', () => {
  test('Can trigger handler callback when event is triggered', () => {
    const spy = jest.fn()
    mount(<EventListener event='resize' handler={spy} />)

    simulateEvent('resize')

    expect(spy).toHaveBeenCalled()
  })

  test('Can trigger handler callback when custom event is triggered', () => {
    const spy = jest.fn()
    mount(<EventListener event='custom' handler={spy} />)

    simulateEvent('custom')

    expect(spy).toHaveBeenCalled()
  })

  test('Does not trigger when other event is triggered', () => {
    const spy = jest.fn()
    mount(<EventListener event='resize' handler={spy} />)

    simulateEvent('scroll')

    expect(spy).not.toHaveBeenCalled()
  })

  test('Can trigger handler callback when event is triggered multiple times', () => {
    const spy = jest.fn()
    mount(<EventListener event='resize' handler={spy} />)

    simulateEvent('resize')
    simulateEvent('resize')
    simulateEvent('resize')
    simulateEvent('scroll') // nope
    simulateEvent('resize')
    simulateEvent('resize')

    expect(spy).toHaveBeenCalledTimes(5)
  })

  test('Removes listener when unmounted', () => {
    const spy = jest.fn()
    const wrapper = mount(<EventListener event='resize' handler={spy} />)

    simulateEvent('resize')
    simulateEvent('scroll') // nope
    simulateEvent('resize')

    wrapper.unmount()

    simulateEvent('resize') // nope
    simulateEvent('scroll') // nope
    simulateEvent('resize') // nope

    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('Can trigger when re-mounted', () => {
    const spy = jest.fn()
    const wrapper = mount(<EventListener event='resize' handler={spy} />)

    simulateEvent('resize')
    simulateEvent('scroll') // nope

    wrapper.unmount()

    simulateEvent('resize')
    simulateEvent('resize')

    mount(<EventListener event='resize' handler={spy} />)

    simulateEvent('resize')
    simulateEvent('resize')

    expect(spy).toHaveBeenCalledTimes(3)
  })

  test('Does not auto-trigger on mount', () => {
    const spy = jest.fn()
    mount(<EventListener event='resize' handler={spy} />)

    expect(spy).not.toHaveBeenCalled()
  })

  test('Does not auto-trigger on unmount', () => {
    const spy = jest.fn()
    const wrapper = mount(<EventListener event='resize' handler={spy} />)

    wrapper.unmount()

    expect(spy).not.toHaveBeenCalled()
  })
})
