import React from 'react'
import { mount, shallow } from 'enzyme'
import { TransitionGroup } from 'react-transition-group'
import AnimateGroup from '..'
import Animate from '../../Animate'

describe('TransitionGroup', () => {
  test('Is a wrapper for TransitionGroup', () => {
    const wrapper = shallow(<AnimateGroup />)

    expect(wrapper.type()).toBe(TransitionGroup)
  })
})

describe('Staggering', () => {
  test('Does not stagger by default', () => {
    const wrapper = mount(<AnimateGroup />)

    expect(wrapper.props().stagger).toBe(false)
  })

  test('Staggers by adjusting delay times for <Animate />', () => {
    const staggerDelay = 200
    const wrapper = shallow(
      <AnimateGroup stagger staggerDelay={staggerDelay}>
        <Animate>
          <div className="ron">Ron</div>
        </Animate>
        <Animate>
          <div className="champ">Champ</div>
        </Animate>
      </AnimateGroup>
    )

    const o = wrapper.find(Animate)
    const first = o.first()
    const second = o.last()

    expect(first.props().delay).toBe(staggerDelay)
    expect(second.props().delay).toBe(staggerDelay * 2)
  })

  test('Can adjust staggerDelay', () => {
    const staggerDelay = 700
    const wrapper = shallow(
      <AnimateGroup stagger staggerDelay={staggerDelay}>
        <Animate>
          <div className="ron">Ron</div>
        </Animate>
        <Animate>
          <div className="champ">Champ</div>
        </Animate>
      </AnimateGroup>
    )

    const o = wrapper.find(Animate)
    const first = o.first()
    const second = o.last()

    expect(first.props().delay).toBe(staggerDelay)
    expect(second.props().delay).toBe(staggerDelay * 2)
  })

  test('staggerDelay does not trigger staggering', () => {
    const staggerDelay = 700
    const wrapper = shallow(
      <AnimateGroup staggerDelay={staggerDelay}>
        <Animate>
          <div className="ron">Ron</div>
        </Animate>
        <Animate>
          <div className="champ">Champ</div>
        </Animate>
      </AnimateGroup>
    )

    const o = wrapper.find(Animate)
    const first = o.first()
    const second = o.last()

    expect(first.props().delay).toBe(0)
    expect(second.props().delay).toBe(0)
  })

  test('staggerDelay respects Animate delay prop', () => {
    const staggerDelay = 700
    const wrapper = shallow(
      <AnimateGroup stagger staggerDelay={staggerDelay}>
        <Animate delay={100}>
          <div className="ron">Ron</div>
        </Animate>
        <Animate delay={200}>
          <div className="champ">Champ</div>
        </Animate>
      </AnimateGroup>
    )

    const o = wrapper.find(Animate)
    const first = o.first()
    const second = o.last()

    expect(first.props().delay).toBe(staggerDelay + 100)
    expect(second.props().delay).toBe(staggerDelay * 2 + 200)
  })

  test('stagger does not affect Animate duration', () => {
    const staggerDelay = 700
    const wrapper = shallow(
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
})

describe('Children', () => {
  test("Don't render non-compatible children, with stagger", () => {
    const wrapper = mount(
      <AnimateGroup stagger>
        <Animate duration={30}>
          <div className="champ">Champ</div>
        </Animate>
        <div className="ron">Ron</div>
      </AnimateGroup>
    )
    const o = wrapper.find('.champ')
    const p = wrapper.find('.ron')

    expect(o.length).toBeTruthy()
    expect(p.length).not.toBeTruthy()
  })

  test('Filter out null children', () => {
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
    const wrapper = shallow(
      <AnimateGroup>
        <Animate duration={66} />
      </AnimateGroup>
    )
    const o = wrapper.find(Animate)

    expect(o.prop('duration')).toBe(66)
  })

  test('Can set child delay', () => {
    const wrapper = shallow(
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
    const wrapper = shallow(
      <AnimateGroup>
        <Animate sequence="down" />
      </AnimateGroup>
    )
    const o = wrapper.find(Animate)

    expect(o.prop('sequence')).toContain('down')
  })
})
