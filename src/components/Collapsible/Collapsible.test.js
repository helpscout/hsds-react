import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
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
      const { container } = render(<Collapsible isOpen />)

      expect(
        window.getComputedStyle(container.querySelector('div.c-Collapsible'))
          .height
      ).toBe('auto')
    })

    test('Height is 0px when collapsed', async () => {
      const { container, rerender } = render(
        <Collapsible isOpen duration={0}>
          <div style={{ height: 200 }} />
        </Collapsible>
      )

      expect(
        window.getComputedStyle(container.querySelector('div.c-Collapsible'))
          .height
      ).toBe('auto')

      rerender(<Collapsible isOpen={false} />)

      await waitFor(() => {
        expect(
          window.getComputedStyle(container.querySelector('div.c-Collapsible'))
            .height
        ).toBe('0px')
      })
    })

    test('Height is set to auto when animationState is open', async () => {
      const { container, rerender } = render(<Collapsible />)

      expect(
        window.getComputedStyle(container.querySelector('div.c-Collapsible'))
          .height
      ).toBe('0px')

      rerender(<Collapsible isOpen />)

      await waitFor(() => {
        expect(
          window.getComputedStyle(container.querySelector('div.c-Collapsible'))
            .height
        ).toBe('auto')
      })
    })
  })

  describe('AnimationState', () => {
    test('idle state does not change anything', () => {
      const wrapper = mount(<Collapsible />)
      const prevState = wrapper.state()

      wrapper.setState({ animationState: 'idle' })

      expect(prevState.height).toBe(wrapper.state().height)
    })

    test('Runs through open states on various timing sequences', async () => {
      const wrapper = mount(<Collapsible />)

      expect(wrapper.state().animationState).toBe('idle')

      wrapper.setProps({ isOpen: true })

      await waitFor(() => {
        expect(wrapper.state().animationState).toBe('opening')
      })

      await waitFor(() => {
        expect(wrapper.state().animationState).toBe('opened')
      })
    })

    test('Runs through open states on various timing sequences', async () => {
      const wrapper = mount(<Collapsible isOpen />)

      expect(wrapper.state().animationState).toBe('idle')

      wrapper.setProps({ isOpen: false })

      await waitFor(() => {
        expect(wrapper.state().animationState).toBe('closing')
      })

      await waitFor(() => {
        expect(wrapper.state().animationState).toBe('closed')
      })
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

  describe('Content', () => {
    it('should render content if preRenderContent is set to true', () => {
      render(
        <Collapsible preRenderContent>
          <div>Content</div>
        </Collapsible>
      )

      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('should not render content by default if preRenderContent is set to false', () => {
      render(
        <Collapsible preRenderContent={false}>
          <div>Content</div>
        </Collapsible>
      )

      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })
  })
})
