import React from 'react'
import { mount, shallow } from 'enzyme'
import { default as Animate, getWait } from '..'
import AnimationStates from '../../../constants/AnimationStates'
import animations from '../animations'
import wait from '../../../tests/helpers/wait'

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
  // test('Automatically animates by default', (done) => {
  //   const wrapper = mount(
  //     <Animate duration={2} sequence='fade'>
  //       <div>Blue</div>
  //     </Animate>
  //   )

  //   wait(200)
  //     .then(() => {
  //       expect(wrapper.html()).toContain('opacity: 1')
  //       wrapper.unmount()
  //       done()
  //     })
  // })

  test('Animation can be disabled if set to false', (done) => {
    const wrapper = mount(
      <Animate duration={2} sequence='fade' animateOnMount={false} in={false}>
        <div>Blue</div>
      </Animate>
    )

    expect(wrapper.html()).toContain('opacity: 0')

    wait(200)
      .then(() => {
        expect(wrapper.html()).toContain('opacity: 0')
        wrapper.unmount()
        done()
      })
  })
})

describe('Unmounting', () => {
  test('Does not unmount from DOM by default', (done) => {
    const wrapper = mount(
      <Animate in duration={8}>
        <div className='your'>
          <div className='my-boy'>
            Blue
          </div>
        </div>
      </Animate>
    )

    wrapper.setProps({ in: false })

    wait(120)
      .then(() => {
        expect(wrapper.html()).not.toBe(null)
        wrapper.unmount()
        done()
      })
  })

  test('Unmounts from DOM if specified', (done) => {
    const wrapper = mount(
      <Animate unmountOnExit in duration={8}>
        <div className='your'>
          <div className='my-boy'>
            Blue
          </div>
        </div>
      </Animate>
    )

    wait(20)
      .then(() => {
        wrapper.setProps({ in: false })
      })
      .then(() => wait(200))
      .then(() => {
        expect(wrapper.html()).toBe(null)
        wrapper.unmount()
        done()
      })
  })
})

describe('getAnimateStyles', () => {
  test('Has ENTER state as default', () => {
    const wrapper = shallow(<Animate sequence='fade' />)
    const o = wrapper.instance()

    expect(o.getAnimationStyles()).toEqual(animations.fade[AnimationStates.ENTER])
  })

  test('Argument accepts animation state', () => {
    const wrapper = shallow(<Animate sequence='fade' />)
    const o = wrapper.instance()
    const state = AnimationStates.EXIT

    expect(o.getAnimationStyles(state)).toEqual(animations.fade[state])
  })
})

describe('makeAnimations', () => {
  test('Returns an Animejs object, if valid', () => {
    const wrapper = shallow(<Animate sequence='fade' />)
    const o = wrapper.instance()
    const state = AnimationStates.ENTER

    expect(typeof o.makeAnimations(state)).toBe('object')
  })
})

describe('Styles', () => {
  test('Can render block style className, if applied', () => {
    const wrapper = shallow(<Animate block sequence='fade' />)

    expect(wrapper.hasClass('is-block')).toBe(true)
  })

  test('Can render inline style className, if applied', () => {
    const wrapper = shallow(<Animate inline sequence='fade' />)

    expect(wrapper.hasClass('is-inline')).toBe(true)
  })

  test('Can render inline-block style className, if applied', () => {
    const wrapper = shallow(<Animate inlineBlock sequence='fade' />)

    expect(wrapper.hasClass('is-inlineBlock')).toBe(true)
  })
})

describe('getWait', () => {
  test('Returns 0 by default', () => {
    expect(getWait()).toBe(0)
  })

  test('Returns 0 (default) if invalid argument', () => {
    expect(getWait(true)).toBe(0)
    expect(getWait(false)).toBe(0)
    expect(getWait([])).toBe(0)
    expect(getWait({})).toBe(0)
  })

  test('Returns wait (number) if applicable', () => {
    expect(getWait(10)).toBe(10)
    expect(getWait(100)).toBe(100)
  })

  test('Returns wait + sequence number', () => {
    expect(getWait({ in: 50, out: 200 }, 'in')).toBe(50)
    expect(getWait({ in: 50, out: 200 }, 'out')).toBe(200)
  })

  test('Returns default if wait + sequence does not exist', () => {
    expect(getWait({ in: 50, out: 200 }, 'nope')).toBe(0)
  })
})
