import React from 'react'
import { mount } from 'enzyme'
import Collapsible from './Collapsible'

jest.useFakeTimers()

describe('Collapsible', () => {
  describe('ClassName', () => {
    test('Has default className', () => {
      const wrapper = mount(<Collapsible />)
      const el = wrapper.find('div.c-Collapsible')

      expect(el.length).toBe(1)
    })

    test('Applies custom className if specified', () => {
      const customClass = 'piano-key-neck-tie'
      const wrapper = mount(<Collapsible className={customClass} />)
      const el = wrapper.find('div.c-Collapsible')

      expect(el.hasClass(customClass)).toBeTruthy()
    })
  })

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
      const o = wrapper.find('div.c-Collapsible').getDOMNode()

      expect(o.style['height']).toBe('0px')
      wrapper.unmount()
    })

    test('Height set to child element on open', () => {
      const wrapper = mount(
        <Collapsible duration={0}>
          <div style={{ height: 200 }} />
        </Collapsible>
      )
      let o = wrapper.find('div.c-Collapsible').getDOMNode()
      expect(o.style['height']).toBe('0px')

      wrapper.setProps({ isOpen: true })

      jest.runAllTimers()

      o = wrapper.find('div.c-Collapsible').getDOMNode()
      expect(o.style['height']).not.toBe('0px')
    })

    test('Height is auto with no child and when open', () => {
      const wrapper = mount(<Collapsible />)
      const o = wrapper.find('div.c-Collapsible').getDOMNode()
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
      let o = wrapper.find('div.c-Collapsible').getDOMNode()

      expect(o.style['height']).toBe('auto')

      wrapper.setProps({ isOpen: false })

      jest.runAllTimers()

      o = wrapper.find('div.c-Collapsible').getDOMNode()
      expect(o.style['height']).toBe('0px')
    })

    test('Height is set to auto when animationState is open', () => {
      const wrapper = mount(<Collapsible />)
      let o = wrapper.find('div.c-Collapsible').getDOMNode()

      expect(o.style['height']).toBe('0px')
      wrapper.setProps({ isOpen: true })

      jest.runAllTimers()

      o = wrapper.find('div.c-Collapsible').getDOMNode()
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

      expect(wrapper.state().animationState).toBe('opening')

      jest.runAllTimers()

      expect(wrapper.state().animationState).toBe('opened')
    })

    test('Runs through open states on various timing sequences', () => {
      const wrapper = mount(<Collapsible isOpen />)

      expect(wrapper.state().animationState).toBe('idle')

      wrapper.setProps({ isOpen: false })

      expect(wrapper.state().animationState).toBe('closing')

      jest.runAllTimers()

      expect(wrapper.state().animationState).toBe('closed')
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
