import React from 'react'
import { mount, shallow } from 'enzyme'
import Collapsible from '..'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-Collapsible',
  skipChildrenTest: true
}

baseComponentTest(Collapsible, baseComponentOptions)

describe('onOpen', () => {
  test('onOpen callback should fire when opened', (done) => {
    const spy = jest.fn()
    const wrapper = mount(<Collapsible onOpen={spy} />)
    wrapper.setProps({ isOpen: true })

    setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      wrapper.unmount()
      done()
    }, 300)
  })
})

describe('onClose', () => {
  test('onClose callback should fire when opened', (done) => {
    const spy = jest.fn()
    const wrapper = mount(<Collapsible isOpen onClose={spy} />)
    wrapper.setProps({ isOpen: false })

    setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      wrapper.unmount()
      done()
    }, 300)
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
      <Collapsible>
        <div style={{ height: 200 }} />
      </Collapsible>
    )
    const o = wrapper.get(0).node
    wrapper.setProps({ isOpen: true })

    expect(o.style['height']).toBe('0px')

    setTimeout(() => {
      expect(o.style['height']).toBe('200px')
    }, 50)
    setTimeout(() => {
      wrapper.unmount()
      done()
    }, 300)
  })

  test('Height is 0 with no child and  when open', (done) => {
    const wrapper = mount(
      <Collapsible />
    )
    const o = wrapper.get(0).node
    wrapper.setProps({ isOpen: true })

    setTimeout(() => {
      expect(o.style['height']).toBe('0px')
    }, 50)
    setTimeout(() => {
      wrapper.unmount()
      done()
    }, 300)
  })

  test('Height is auto when open', () => {
    const wrapper = mount(
      <Collapsible isOpen>
        <div style={{ height: 200 }} />
      </Collapsible>
    )
    const o = wrapper.get(0).node

    expect(o.style['height']).toBe('auto')
    wrapper.unmount()
  })

  test('Height is 0px when collapsed', (done) => {
    const wrapper = mount(
      <Collapsible isOpen>
        <div style={{ height: 200 }} />
      </Collapsible>
    )
    const o = wrapper.get(0).node

    expect(o.style['height']).toBe('auto')

    wrapper.setProps({ isOpen: false })

    setTimeout(() => {
      expect(o.style['height']).toBe('0px')
      wrapper.unmount()
      done()
    }, 300)
  })

  test('Height is set to auto when animationState is open', (done) => {
    const wrapper = mount(<Collapsible />)
    const o = wrapper.get(0).node

    expect(o.style['height']).toBe('0px')
    wrapper.setProps({ isOpen: true })

    setTimeout(() => {
      expect(o.style['height']).toBe('auto')
      wrapper.unmount()
      done()
    }, 300)
  })
})

describe('AnimationState', () => {
  test('idle state does not change anything', () => {
    const wrapper = shallow(<Collapsible />)
    const prevState = wrapper.state()

    wrapper.setState({ animationState: 'idle' })

    expect(prevState.height).toBe(wrapper.state().height)
  })

  test('changes to measuring when isOpen changes', () => {
    const wrapper = shallow(<Collapsible />)

    wrapper.setProps({ isOpen: true })

    expect(wrapper.state().animationState).toBe('measuring')
  })
})
