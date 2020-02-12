import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import SleepDetector from './SleepDetector'

describe('SleepDetector', () => {
  let clock, now
  beforeEach(() => {
    clock = sinon.useFakeTimers()
    now = Date.now()
  })
  afterEach(() => clock.restore())

  const interval = 10000
  const buffer = 2000

  test('Calls onWake when delay is greater than buffer', () => {
    const onWake = jest.fn()
    const wrapper = mount(
      <SleepDetector interval={interval} buffer={buffer} onWake={onWake} />
    )

    expect(wrapper.state().lastRun).toBe(now)

    // Override `Date.now()`
    const originalDateNow = Date.now
    // Fake a delay > buffer
    const delay = buffer + 100
    Date.now = () => now + interval + delay
    clock.tick(interval + 1)
    expect(onWake).toHaveBeenCalledWith(delay)
    // restore Date.now
    Date.now = originalDateNow

    wrapper.unmount()
  })

  test('does NOT call `onWake` when delay is greater than buffer', () => {
    const onWake = jest.fn()
    const wrapper = mount(
      <SleepDetector interval={interval} buffer={buffer} onWake={onWake} />
    )

    expect(wrapper.state().lastRun).toBe(now)

    // Override `Date.now()`
    const originalDateNow = Date.now
    // Fake delay < buffer
    const delay = buffer - 10
    Date.now = () => now + interval + delay
    clock.tick(interval + 1)
    expect(onWake).not.toHaveBeenCalled()
    // restore Date.now
    Date.now = originalDateNow

    wrapper.unmount()
  })
})
