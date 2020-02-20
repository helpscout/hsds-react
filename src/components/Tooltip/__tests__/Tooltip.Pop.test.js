import React from 'react'
import Tooltip from '../Tooltip'
import { mount } from 'enzyme'

// Tests the Pop integration with Tooltip

jest.mock('../Tooltip.css', () => {
  const TooltipUI = ({ className, children }) => (
    <div className={className}>{children}</div>
  )

  return {
    TooltipUI,
  }
})

jest.mock('../Tooltip.Popper', () => {
  const Popper = ({ className, children }) => (
    <div className={className}>{children}</div>
  )
  return Popper
})

jest.mock('../../Pop', () => {
  const Pop = ({ className, children }) => (
    <div className={className}>{children}</div>
  )
  const Reference = ({ className, children }) => (
    <div className={className}>{children}</div>
  )
  const Popper = ({ className, children }) => (
    <div className={className}>{children({ close: () => {} })}</div>
  )

  Pop.Reference = Reference
  Pop.Popper = Popper

  return Pop
})

describe('Pop/Render', () => {
  test('Renders the Pop components + sub components', () => {
    const wrapper = mount(<Tooltip title="Title">Content</Tooltip>)

    expect(wrapper.find('Reference').length).toBeTruthy()
    expect(wrapper.find('Popper').length).toBeTruthy()
  })

  test('Provides renderContent with close callback', () => {
    const spy = jest.fn()
    mount(<Tooltip renderContent={spy}>Content</Tooltip>)

    const callback = spy.mock.calls[0][0]

    expect(typeof callback.close).toBe('function')
    expect(callback.placement).toBeTruthy()
  })

  test('Can set min-width', () => {
    const wrapper = mount(
      <Tooltip title="Title" minWidth={251}>
        Content
      </Tooltip>
    )
    const el = wrapper.find('Popper').last()

    expect(el.prop('style').minWidth).toBe(251)
  })

  test('Can set max-width', () => {
    const wrapper = mount(
      <Tooltip title="Title" maxWidth={678}>
        Content
      </Tooltip>
    )
    const el = wrapper.find('Popper').last()

    expect(el.prop('style').maxWidth).toBe(678)
  })
})
