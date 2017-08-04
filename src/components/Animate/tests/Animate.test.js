import React from 'react'
import { mount } from 'enzyme'
import Animate from '..'

describe('ClassName', () => {
  test('Applies custom className if specified', () => {
    const className = 'blue'
    const wrapper = mount(
      <Animate className={className}>
        <div>Blue</div>
      </Animate>
    )

    expect(wrapper.prop('className')).toContain(className)
    wrapper.unmount()
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Animate>
        <div>Blue</div>
      </Animate>
    )

    expect(wrapper.text()).toBe('Blue')
    wrapper.unmount()
  })
})

describe('AnimateOnMount', () => {
  test('Automatically animates by default', (done) => {
    const wrapper = mount(
      <Animate>
        <div>Blue</div>
      </Animate>
    )

    setTimeout(() => {
      expect(wrapper.html()).toContain('is-mounted')
      wrapper.unmount()
      done()
    }, 100)
  })

  test('Animation can be disabled if set to false', (done) => {
    const wrapper = mount(
      <Animate animateOnMount={false}>
        <div>Blue</div>
      </Animate>
    )

    setTimeout(() => {
      expect(wrapper.html()).not.toContain('is-mounted')
      wrapper.unmount()
      done()
    }, 100)
  })
})

describe('States', () => {
  test('Adds mounting/mounted state class', (done) => {
    const wrapper = mount(
      <Animate>
        <div>Blue</div>
      </Animate>
    )

    expect(wrapper.html()).toContain('is-mounting')

    setTimeout(() => {
      expect(wrapper.html()).toContain('is-mounted')
      wrapper.unmount()
      done()
    }, 100)
  })

  test('Trigger mounting animations on state change', (done) => {
    const wrapper = mount(
      <Animate in={false} animateOnMount={false}>
        <div>Blue</div>
      </Animate>
    )

    expect(wrapper.hasClass('is-mounting')).toBeFalsy()

    wrapper.setProps({ in: true })

    expect(wrapper.hasClass('is-mounting')).toBeTruthy()

    wrapper.unmount()
    done()
  })

  test('Should not trigger animation if prop change does not involve `in` prop', (done) => {
    const wrapper = mount(
      <Animate in={false} animateOnMount={false}>
        <div>Blue</div>
      </Animate>
    )

    expect(wrapper.hasClass('is-mounting')).toBeFalsy()

    wrapper.setProps({ color: true })

    expect(wrapper.hasClass('is-mounting')).toBeFalsy()

    wrapper.unmount()
    done()
  })
})
