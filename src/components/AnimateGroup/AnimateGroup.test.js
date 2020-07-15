import React from 'react'
import { mount } from 'enzyme'
import { TransitionGroup } from 'react-transition-group'
import { AnimateGroup } from './AnimateGroup'
import Animate from '../Animate'

jest.useFakeTimers()

describe('TransitionGroup', () => {
  test('Is a wrapper for TransitionGroup', () => {
    const wrapper = mount(<AnimateGroup />)
    const o = wrapper.find(TransitionGroup)

    expect(o.length).toBe(1)
  })
})

describe('Staggering', () => {
  test('Does not stagger by default', () => {
    const wrapper = mount(<AnimateGroup />)

    expect(wrapper.props().stagger).toBe(false)
  })

  test('Staggers by adjusting delay times for <Animate />', () => {
    const staggerDelay = 200
    const wrapper = mount(
      <AnimateGroup stagger staggerDelay={staggerDelay}>
        <Animate>
          <div className="ron">Ron</div>
        </Animate>
        <Animate>
          <div className="champ">Champ</div>
        </Animate>
      </AnimateGroup>
    )

    const o = wrapper.find('div.c-Animate')
    const first = o.first()
    const second = o.last()

    jest.runAllTimers()

    expect(first.prop('style').transitionDelay).toBe('200ms')
    expect(second.prop('style').transitionDelay).toBe('400ms')
  })

  test('Can adjust staggerDelay', () => {
    const staggerDelay = 700
    const wrapper = mount(
      <AnimateGroup stagger staggerDelay={staggerDelay}>
        <Animate>
          <div className="ron">Ron</div>
        </Animate>
        <Animate>
          <div className="champ">Champ</div>
        </Animate>
      </AnimateGroup>
    )

    const o = wrapper.find('div.c-Animate')
    const first = o.first()
    const second = o.last()

    jest.runAllTimers()

    expect(first.prop('style').transitionDelay).toBe('700ms')
    expect(second.prop('style').transitionDelay).toBe('1400ms')
  })

  test('staggerDelay does not trigger staggering', () => {
    const staggerDelay = 700
    const wrapper = mount(
      <AnimateGroup staggerDelay={staggerDelay}>
        <Animate>
          <div className="ron">Ron</div>
        </Animate>
        <Animate>
          <div className="champ">Champ</div>
        </Animate>
      </AnimateGroup>
    )

    const o = wrapper.find('div.c-Animate')
    const first = o.first()
    const second = o.last()

    expect(first.prop('style').transitionDelay).toBe('0ms')
    expect(second.prop('style').transitionDelay).toBe('0ms')
  })

  test('staggerDelay respects Animate delay prop', () => {
    const staggerDelay = 700
    const wrapper = mount(
      <AnimateGroup stagger staggerDelay={staggerDelay}>
        <Animate delay={100}>
          <div className="ron">Ron</div>
        </Animate>
        <Animate delay={200}>
          <div className="champ">Champ</div>
        </Animate>
      </AnimateGroup>
    )

    const o = wrapper.find('div.c-Animate')
    const first = o.first()
    const second = o.last()

    expect(first.prop('style').transitionDelay).toBe('100ms')
    expect(second.prop('style').transitionDelay).toBe('200ms')
  })

  test('stagger does not affect Animate duration', () => {
    const staggerDelay = 700
    const wrapper = mount(
      <AnimateGroup stagger staggerDelay={staggerDelay}>
        <Animate duration={30}>
          <div className="ron">Ron</div>
        </Animate>
        <Animate duration={30}>
          <div className="champ">Champ</div>
        </Animate>
      </AnimateGroup>
    )

    const o = wrapper.find(Animate)
    const first = o.first()
    const second = o.last()

    expect(first.props().duration).toBe(30)
    expect(second.props().duration).toBe(30)
  })

  test('Can staggerDuration', () => {
    const staggerDelay = 1500
    const wrapper = mount(
      <AnimateGroup stagger staggerDuration={staggerDelay}>
        <Animate>
          <div className="ron">Ron</div>
        </Animate>
        <Animate>
          <div className="champ">Champ</div>
        </Animate>
        <Animate>
          <div className="brick">Brick</div>
        </Animate>
      </AnimateGroup>
    )
    const o = wrapper.find('div.c-Animate')
    const first = o.first()
    const last = o.last()

    expect(first.prop('style').transitionDuration).toBe('1500ms')
    expect(last.prop('style').transitionDuration).toBe('1500ms')
  })

  test('Does not stagger delay, if stagger is false', () => {
    const staggerDelay = 100
    const wrapper = mount(
      <AnimateGroup stagger={false} delay={staggerDelay}>
        <Animate>
          <div className="ron">Ron</div>
        </Animate>
        <Animate>
          <div className="champ">Champ</div>
        </Animate>
        <Animate>
          <div className="brick">Brick</div>
        </Animate>
      </AnimateGroup>
    )
    const o = wrapper.find('div.c-Animate')
    const first = o.first()
    const last = o.last()

    expect(first.prop('style').transitionDelay).toBe('100ms')
    expect(last.prop('style').transitionDelay).toBe('100ms')
  })

  test('Delays stagger within staggerMax', () => {
    const staggerDelay = 100
    const wrapper = mount(
      <AnimateGroup stagger staggerDelay={staggerDelay} staggerMax={5}>
        <Animate>
          <div className="ron">Ron</div>
        </Animate>
        <Animate>
          <div className="champ">Champ</div>
        </Animate>
        <Animate>
          <div className="brick">Brick</div>
        </Animate>
      </AnimateGroup>
    )
    const o = wrapper.find('div.c-Animate')
    const first = o.first()
    const last = o.last()

    expect(first.prop('style').transitionDelay).toBe('100ms')
    expect(last.prop('style').transitionDelay).toBe('300ms')
  })

  test('Delays do not adjust beyond staggerMax', () => {
    const staggerDelay = 100
    const wrapper = mount(
      <AnimateGroup stagger staggerDelay={staggerDelay} staggerMax={2}>
        <Animate>
          <div className="ron">Ron</div>
        </Animate>
        <Animate>
          <div className="champ">Champ</div>
        </Animate>
        <Animate>
          <div className="brick">Brick</div>
        </Animate>
      </AnimateGroup>
    )
    const o = wrapper.find('div.c-Animate')
    const first = o.first()
    const last = o.last()

    expect(first.prop('style').transitionDelay).toBe('100ms')
    expect(last.prop('style').transitionDelay).toBe('200ms')
  })
})

describe('Children', () => {
  test('Can render Animate children', () => {
    const children = [
      <Animate duration={30} key={11}>
        <div className="champ">Champ</div>
      </Animate>,
      null,
    ]
    const wrapper = mount(<AnimateGroup stagger>{children}</AnimateGroup>)

    expect(wrapper.children().length).toBe(1)
  })
})

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<AnimateGroup />)
    const o = wrapper.find('.c-AnimateGroup')

    expect(o.length).toBeTruthy()
  })

  test('Can accept custom className', () => {
    const wrapper = mount(<AnimateGroup className="channel4" />)
    const o = wrapper.find('.channel4')

    expect(o.length).toBeTruthy()
  })
})

describe('duration', () => {
  test('Does not override child duration prop', () => {
    const wrapper = mount(
      <AnimateGroup>
        <Animate duration={66} />
      </AnimateGroup>
    )
    const o = wrapper.find(Animate)

    expect(o.prop('duration')).toBe(66)
  })

  test('Can set child delay', () => {
    const wrapper = mount(
      <AnimateGroup>
        <Animate delay={66} />
      </AnimateGroup>
    )
    const o = wrapper.find(Animate)

    expect(o.prop('delay')).toBe(66)
  })
})

describe('sequence', () => {
  test('Does not set sequence by default', () => {
    const wrapper = mount(
      <AnimateGroup>
        <Animate sequence="down" />
      </AnimateGroup>
    )
    const o = wrapper.find(Animate)

    expect(o.prop('sequence')).toContain('down')
  })
})
