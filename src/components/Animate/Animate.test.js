import React from 'react'
import { Transition } from 'react-transition-group'
import { mount } from 'enzyme'
import { Animate } from './Animate'
import { getSequenceNames } from './Animate.utils'

jest.useFakeTimers()

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
  test('Automatically animates by default', () => {
    const wrapper = mount(
      <Animate duration={2} sequence="fade">
        <div>Blue</div>
      </Animate>
    )

    expect(wrapper.html()).toContain('ax-entering')

    jest.runAllTimers()

    expect(wrapper.html()).toContain('ax-entered')
  })
})

describe('Unmounting', () => {
  test('Unmounts from DOM by default', () => {
    const wrapper = mount(
      <Animate in duration={0}>
        <div className="your">
          <div className="my-boy">Blue</div>
        </div>
      </Animate>
    )
    const o = wrapper.find('div.c-Animate').getDOMNode()

    wrapper.setProps({ in: false })

    expect(o.classList.contains('ax-exiting')).toBeTruthy()
  })

  test('Does not unmounts from DOM if specified', () => {
    const wrapper = mount(
      <Animate unmountOnExit={false} in duration={8}>
        <div className="your">
          <div className="my-boy">Blue</div>
        </div>
      </Animate>
    )

    wrapper.setProps({ in: false })
    expect(wrapper.html()).not.toBe(null)
    wrapper.unmount()
  })
})

describe('Styles', () => {
  test('Can render block style className, if applied', () => {
    const wrapper = mount(<Animate block sequence="fade" />)
    const o = wrapper.find('div.c-Animate')

    expect(o.hasClass('is-block')).toBe(true)
  })

  test('Can render inline style className, if applied', () => {
    const wrapper = mount(<Animate inline sequence="fade" />)
    const o = wrapper.find('div.c-Animate')

    expect(o.hasClass('is-inline')).toBe(true)
  })

  test('Can render inline-block style className, if applied', () => {
    const wrapper = mount(<Animate inlineBlock sequence="fade" />)
    const o = wrapper.find('div.c-Animate')

    expect(o.hasClass('is-inlineBlock')).toBe(true)
  })
})

describe('Timeout', () => {
  test('Passes timeout to Transition, if specified', () => {
    const wrapper = mount(<Animate inlineBlock timeout={66} />)
    const o = wrapper.find(Transition)

    expect(o.props().timeout.exit).toBe(66)
  })

  test('Defaults exit timeout to duration + delay', () => {
    const wrapper = mount(<Animate inlineBlock duration={10} delay={10} />)
    const o = wrapper.find(Transition)

    expect(o.props().timeout.exit).toBe(20)
  })
})

test('Returns an empty array if invalid arguments', () => {
  expect(getSequenceNames()).toEqual([])
  expect(getSequenceNames(true)).toEqual([])
  expect(getSequenceNames({})).toEqual([])
  expect(getSequenceNames([])).toEqual([])
})

test('Returns an array of names', () => {
  expect(getSequenceNames('fade up down')).toEqual(['fade', 'up', 'down'])
})

test('Handles white space', () => {
  expect(getSequenceNames('fade    up down')).toEqual(['fade', 'up', 'down'])
})

test('Handles white space before/after', () => {
  expect(getSequenceNames(' fade    up down ')).toEqual(['fade', 'up', 'down'])
})

test('Returns an array of names, if argument is array', () => {
  expect(getSequenceNames(['fade', 'up', 'down'])).toEqual([
    'fade',
    'up',
    'down',
  ])
})
