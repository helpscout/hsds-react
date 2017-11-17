import React from 'react'
import { mount, shallow } from 'enzyme'
import ScrollLock from '..'

describe('Normal usage', () => {
  test('Permits scrolling within extent', () => {
    const wrapper = shallow(
      <ScrollLock>
        <div style={{overflow: 'auto', height: '12px'}}>Hi<br />Hello<br />Hi</div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30
    }

    hi.simulate('wheel', {
      deltaY: 12,
      preventDefault,
      currentTarget
    })
    expect(preventDefault).not.toBeCalled()

    currentTarget.scrollTop = 24
    hi.simulate('wheel', {
      deltaY: -12,
      preventDefault,
      currentTarget
    })
    expect(preventDefault).not.toBeCalled()
  })

  test('Prevents scrolling past extent', () => {
    const wrapper = shallow(
      <ScrollLock>
        <div style={{overflow: 'auto', height: '12px'}}>Hi<br />Hello<br />Hi</div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30
    }

    hi.simulate('wheel', {
      deltaY: 24,
      preventDefault,
      currentTarget
    })
    expect(preventDefault).toBeCalled()
    expect(currentTarget.scrollTop).toBe(30)

    currentTarget.scrollTop = 12
    hi.simulate('wheel', {
      deltaY: -20,
      preventDefault,
      currentTarget
    })
    expect(preventDefault).toBeCalled()
    expect(currentTarget.scrollTop).toBe(0)
  })

  test('Clones child node instead of wrapping it', () => {
    const wrapper = shallow(
      <ScrollLock>
        <div className='hi' style={{overflow: 'auto', height: '2px'}}>Hi</div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')

    expect(hi.exists()).toBeTruthy()
    expect(hi.length).toBe(1)
    expect(hi.text()).toBe('Hi')
    expect(hi.node.props.className).toBe('hi')
  })

  test('Requires a single child element', () => {
    const wrapper = () => shallow(
      <ScrollLock>
        <div />
        <div />
      </ScrollLock>
    )

    expect(wrapper).toThrow(Error, /React.Children.only/)
  })
})

describe('Disabled', () => {
  test('Permits scrolling past extent', () => {
    const wrapper = shallow(
      <ScrollLock isDisabled>
        <div style={{overflow: 'auto', height: '12px'}}>Hi<br />Hello<br />Hi</div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30
    }

    hi.simulate('wheel', {
      deltaY: 24,
      preventDefault,
      currentTarget
    })
    expect(preventDefault).not.toBeCalled()
  })
})

describe('Childless', () => {
  test('Renders nothing', () => {
    const wrapper = shallow(<ScrollLock />)
    const div = wrapper.find('div')

    expect(div.length).toBe(0)
  })
})

describe('Direction', () => {
  test('Has a default direction of y', () => {
    const wrapper = mount(<ScrollLock />)

    expect(wrapper.props().direction).toBe('y')
  })

  test('Can set direction of x', () => {
    const wrapper = mount(<ScrollLock direction='x' />)

    expect(wrapper.props().direction).toBe('x')
  })
})

describe('Events', () => {
  test('onWheel callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <ScrollLock onWheel={spy}>
        <div style={{overflow: 'auto', height: '12px'}}>
          Hi
        </div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30
    }
    const event = {
      deltaY: 24,
      preventDefault,
      currentTarget
    }

    hi.simulate('wheel', event)

    expect(spy).toHaveBeenCalledWith(event)
  })
})
