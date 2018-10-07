import React from 'react'
import { mount } from 'enzyme'
import Collapsible from '../Collapsible.tsx'
import { baseComponentTest } from '../../../tests/helpers/components'

jest.useFakeTimers()

const baseComponentOptions = {
  className: 'c-Collapsible',
  skipChildrenTest: true,
}

describe('Collapsible', () => {
  baseComponentTest(Collapsible, baseComponentOptions)

  describe('onOpen', () => {
    test('onOpen callback should fire when opened', () => {
      const spy = jest.fn()
      const wrapper = mount(<Collapsible onOpen={spy} duration={0} />)
      wrapper.setProps({ isOpen: true })
      wrapper.setState({ animationState: 'opened' })
      wrapper.instance().handleAnimationStateCallback()

      expect(spy).toHaveBeenCalled()
      wrapper.unmount()
    })
  })

  describe('onClose', () => {
    test('onClose callback should fire when opened', () => {
      const spy = jest.fn()
      const wrapper = mount(<Collapsible isOpen onClose={spy} duration={0} />)
      wrapper.setProps({ isOpen: false })

      wrapper.setProps({ isOpen: true })
      wrapper.setState({ animationState: 'closed' })
      wrapper.instance().handleAnimationStateCallback()

      expect(spy).toHaveBeenCalled()
      wrapper.unmount()
    })
  })

  describe('Height', () => {
    test('Height is 0px by default', () => {
      const wrapper = mount(<Collapsible />)
      const o = wrapper.get(0).node

      expect(o.style['height']).toBe('0px')
      wrapper.unmount()
    })

    test('Height set to child element on open', () => {
      const wrapper = mount(
        <Collapsible duration={0}>
          <div style={{ height: 200 }} />
        </Collapsible>
      )
      const o = wrapper.get(0).node
      expect(o.style['height']).toBe('0px')

      wrapper.setProps({ isOpen: true })

      jest.runAllTimers()

      expect(o.style['height']).not.toBe('0px')
    })

    test('Height is auto with no child and when open', () => {
      const wrapper = mount(<Collapsible />)
      const o = wrapper.get(0).node
      wrapper.setProps({ isOpen: true })

      jest.runAllTimers()

      expect(o.style['height']).toBe('auto')
    })

    test('Height is 0px when collapsed', () => {
      const wrapper = mount(
        <Collapsible isOpen duration={0}>
          <div style={{ height: 200 }} />
        </Collapsible>
      )
      const o = wrapper.get(0).node

      expect(o.style['height']).toBe('auto')

      wrapper.setProps({ isOpen: false })

      jest.runAllTimers()

      expect(o.style['height']).toBe('0px')
    })

    test('Height is set to auto when animationState is open', () => {
      const wrapper = mount(<Collapsible />)
      const o = wrapper.get(0).node

      expect(o.style['height']).toBe('0px')
      wrapper.setProps({ isOpen: true })

      jest.runAllTimers()

      expect(o.style['height']).toBe('auto')
    })
  })

  describe('AnimationState', () => {
    test('idle state does not change anything', () => {
      const wrapper = mount(<Collapsible />)
      const prevState = wrapper.state()

      wrapper.setState({ animationState: 'idle' })

      expect(prevState.height).toBe(wrapper.state().height)
    })

    test('Runs through open states on various timing sequences', () => {
      const wrapper = mount(<Collapsible />)

      expect(wrapper.state().animationState).toBe('idle')

      wrapper.setProps({ isOpen: true })
      expect(wrapper.state().animationState).toBe('measuring')

      jest.runOnlyPendingTimers()
      expect(wrapper.state().animationState).toBe('openingStart')

      jest.runOnlyPendingTimers()
      expect(wrapper.state().animationState).toBe('opening')
    })

    test('Runs through open states on various timing sequences', () => {
      const wrapper = mount(<Collapsible isOpen />)

      expect(wrapper.state().animationState).toBe('idle')

      wrapper.setProps({ isOpen: false })
      expect(wrapper.state().animationState).toBe('measuring')

      jest.runOnlyPendingTimers()
      expect(wrapper.state().animationState).toBe('closingStart')

      jest.runOnlyPendingTimers()
      expect(wrapper.state().animationState).toBe('closing')
    })
  })

  describe('Duration', () => {
    test('Duration can be set', () => {
      const wrapper = mount(<Collapsible duration={1000} />)
      const o = wrapper.instance()

      expect(o.getTransitionDuration()).toBe(1000)
    })

    test('Duration can be overridden by durationOpen', () => {
      const wrapper = mount(<Collapsible duration={1000} durationOpen={300} />)
      const o = wrapper.instance()
      wrapper.setState({ animationState: 'open' })

      expect(o.getTransitionDuration()).toBe(300)
    })

    test('Duration can be overridden by durationClose', () => {
      const wrapper = mount(<Collapsible duration={1000} durationClose={100} />)
      const o = wrapper.instance()
      wrapper.setState({ animationState: 'closing' })

      expect(o.getTransitionDuration()).toBe(100)
    })
  })
})
