import React from 'react'
import { mount } from 'enzyme'
import CopyButton from './CopyButton'

jest.useFakeTimers()

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<CopyButton />)
    const el = wrapper.find('button.c-CopyButton')

    expect(el.hasClass('c-CopyButton')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<CopyButton className={className} />)
    const el = wrapper.find('button.c-CopyButton')

    expect(el.hasClass(className)).toBe(true)
  })
})

describe('Timeout', () => {
  test('Clears timeout on unmount', () => {
    const spy = jest.spyOn(window, 'clearTimeout')
    const wrapper = mount(<CopyButton />)

    wrapper.unmount()

    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })

  test('Clears timeout on click', () => {
    const spy = jest.spyOn(window, 'clearTimeout')
    const wrapper = mount(<CopyButton />)
    const el = wrapper.find('button')

    el.simulate('click')

    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })

  test('Renders, then resets confirmation UI on click', () => {
    const wrapper = mount(<CopyButton />)
    const el = wrapper.find('button')

    el.simulate('click')

    expect(wrapper.state().shouldRenderConfirmation).toBe(true)

    jest.runAllTimers()

    expect(wrapper.state().shouldRenderConfirmation).toBe(false)
  })

  test('Fires onReset callback when timeout completes', () => {
    const spy = jest.fn()
    const wrapper = mount(<CopyButton onReset={spy} />)
    const el = wrapper.find('button')

    el.simulate('click')
    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
  })
})
