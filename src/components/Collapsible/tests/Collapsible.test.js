import React from 'react'
import { mount, shallow } from 'enzyme'
import Collapsible from '..'
import { baseComponentTest } from '../../../tests/helpers/components'
import wait from '../../../tests/helpers/wait'

const baseComponentOptions = {
  className: 'c-Collapsible',
  skipChildrenTest: true
}

baseComponentTest(Collapsible, baseComponentOptions)

describe('onOpen', () => {
  test('onOpen callback should fire when opened', (done) => {
    const spy = jest.fn()
    const wrapper = mount(<Collapsible onOpen={spy} duration={0} />)
    wrapper.setProps({ isOpen: true })

    wait(120)
      .then(() => {
        expect(spy).toHaveBeenCalled()
        wrapper.unmount()
        done()
      })
  })
})

describe('onClose', () => {
  test('onClose callback should fire when opened', (done) => {
    const spy = jest.fn()
    const wrapper = mount(<Collapsible isOpen onClose={spy} duration={0} />)
    wrapper.setProps({ isOpen: false })

    wait(120)
      .then(() => {
        expect(spy).toHaveBeenCalled()
        wrapper.unmount()
        done()
      })
  })
})

describe('Height', () => {
  test('Height is 0px by default', () => {
    const wrapper = mount(<Collapsible />)
    const o = wrapper.get(0).node

    expect(o.style['height']).toBe('0px')
    wrapper.unmount()
  })

  test('Height set to child element on open', (done) => {
    const wrapper = mount(
      <Collapsible duration={0}>
        <div style={{ height: 200 }} />
      </Collapsible>
    )
    const o = wrapper.get(0).node
    expect(o.style['height']).toBe('0px')

    wrapper.setProps({ isOpen: true })

    wait(50)
      .then(() => {
        expect(o.style['height']).not.toBe('0px')
        wrapper.unmount()
        done()
      })
  })

  test('Height is 0 with no child and when open', (done) => {
    const wrapper = mount(
      <Collapsible />
    )
    const o = wrapper.get(0).node
    wrapper.setProps({ isOpen: true })

    wait(50)
      .then(() => {
        expect(o.style['height']).toBe('0px')
        wrapper.unmount()
        done()
      })
  })

  test('Height is 0px when collapsed', (done) => {
    const wrapper = mount(
      <Collapsible isOpen duration={0}>
        <div style={{ height: 200 }} />
      </Collapsible>
    )
    const o = wrapper.get(0).node

    expect(o.style['height']).toBe('auto')

    wrapper.setProps({ isOpen: false })

    wait(50)
      .then(() => {
        expect(o.style['height']).toBe('0px')
        wrapper.unmount()
        done()
      })
  })

//   test('Height is set to auto when animationState is open', (done) => {
//     const wrapper = mount(<Collapsible />)
//     const o = wrapper.get(0).node

//     expect(o.style['height']).toBe('0px')
//     wrapper.setProps({ isOpen: true })

//     setTimeout(() => {
//       expect(o.style['height']).toBe('auto')
//       wrapper.unmount()
//       done()
//     }, 300)
//   })
})

describe('AnimationState', () => {
  test('idle state does not change anything', () => {
    const wrapper = shallow(<Collapsible />)
    const prevState = wrapper.state()

    wrapper.setState({ animationState: 'idle' })

    expect(prevState.height).toBe(wrapper.state().height)
  })

  // test('changes to measuring when isOpen changes', () => {
  //   const wrapper = shallow(<Collapsible />)

  //   wrapper.setProps({ isOpen: true })

  //   expect(wrapper.state().animationState).toBe('measuring')
  // })
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
    wrapper.setState({animationState: 'open'})

    expect(o.getTransitionDuration()).toBe(300)
  })

  test('Duration can be overridden by durationClose', () => {
    const wrapper = mount(<Collapsible duration={1000} durationClose={100} />)
    const o = wrapper.instance()
    wrapper.setState({animationState: 'closing'})

    expect(o.getTransitionDuration()).toBe(100)
  })
})
