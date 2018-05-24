import React from 'react'
import { mount, shallow } from 'enzyme'
import ScrollLock from '..'

describe('Direction: Y', () => {
  test('Permits scrolling within extent', () => {
    const wrapper = shallow(
      <ScrollLock>
        <div style={{ overflow: 'auto', height: '12px' }}>
          Hi<br />Hello<br />Hi
        </div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30,
    }

    hi.simulate('wheel', {
      deltaY: 12,
      preventDefault,
      currentTarget,
    })
    expect(preventDefault).not.toBeCalled()

    currentTarget.scrollTop = 24
    hi.simulate('wheel', {
      deltaY: -12,
      preventDefault,
      currentTarget,
    })
    expect(preventDefault).not.toBeCalled()
  })

  test('Prevents scrolling past extent', () => {
    const wrapper = shallow(
      <ScrollLock>
        <div style={{ overflow: 'auto', height: '12px' }}>
          Hi<br />Hello<br />Hi
        </div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30,
    }

    hi.simulate('wheel', {
      deltaY: 24,
      preventDefault,
      currentTarget,
    })
    expect(preventDefault).toBeCalled()
    expect(currentTarget.scrollTop).toBe(30)

    currentTarget.scrollTop = 12
    hi.simulate('wheel', {
      deltaY: -20,
      preventDefault,
      currentTarget,
    })
    expect(preventDefault).toBeCalled()
    expect(currentTarget.scrollTop).toBe(0)
  })
})

describe('Direction: X', () => {
  test('Permits scrolling within extent', () => {
    const wrapper = shallow(
      <ScrollLock direction="x">
        <div style={{ overflow: 'auto', width: 12 }}>Hi. Hello. Hi.</div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const currentTarget = {
      clientWidth: 12,
      scrollLeft: 0,
      scrollWidth: 30,
    }

    hi.simulate('wheel', {
      deltaX: 12,
      preventDefault,
      currentTarget,
    })
    expect(preventDefault).not.toBeCalled()

    currentTarget.scrollLeft = 24
    hi.simulate('wheel', {
      deltaX: -12,
      preventDefault,
      currentTarget,
    })
    expect(preventDefault).not.toBeCalled()
  })

  test('Prevents scrolling past extent', () => {
    const wrapper = shallow(
      <ScrollLock direction="x">
        <div style={{ overflow: 'auto', width: 12 }}>Hi. Hello. Hi.</div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const currentTarget = {
      clientWidth: 12,
      scrollLeft: 0,
      scrollWidth: 30,
    }

    hi.simulate('wheel', {
      deltaX: 24,
      preventDefault,
      currentTarget,
    })
    expect(preventDefault).toBeCalled()
    expect(currentTarget.scrollLeft).toBe(30)

    currentTarget.scrollLeft = 12
    hi.simulate('wheel', {
      deltaX: -20,
      preventDefault,
      currentTarget,
    })
    expect(preventDefault).toBeCalled()
    expect(currentTarget.scrollLeft).toBe(0)
  })
})

describe('Normal usage', () => {
  test('Clones child node instead of wrapping it', () => {
    const wrapper = shallow(
      <ScrollLock>
        <div className="hi" style={{ overflow: 'auto', height: '2px' }}>
          Hi
        </div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')

    expect(hi.exists()).toBeTruthy()
    expect(hi.length).toBe(1)
    expect(hi.text()).toBe('Hi')
    expect(hi.node.props.className).toBe('hi')
  })

  test('Requires a single child element', () => {
    const wrapper = () =>
      shallow(
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
        <div style={{ overflow: 'auto', height: '12px' }}>
          Hi<br />Hello<br />Hi
        </div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30,
    }

    hi.simulate('wheel', {
      deltaY: 24,
      preventDefault,
      currentTarget,
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
    const wrapper = mount(<ScrollLock direction="x" />)

    expect(wrapper.props().direction).toBe('x')
  })
})

describe('Events', () => {
  test('can stop propagation for directionY, if defined', () => {
    const wrapper = shallow(
      <ScrollLock stopPropagation direction="y">
        <div style={{ overflow: 'auto', height: '12px' }}>Hi</div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const stopPropagation = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30,
    }
    const event = {
      deltaY: 24,
      preventDefault,
      stopPropagation,
      currentTarget,
    }

    hi.simulate('wheel', event)

    expect(stopPropagation).toBeCalled()
  })

  test('can stop propagation for directionX, if defined', () => {
    const wrapper = shallow(
      <ScrollLock stopPropagation direction="x">
        <div style={{ overflow: 'auto', height: '12px' }}>Hi</div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const stopPropagation = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30,
    }
    const event = {
      deltaY: 24,
      preventDefault,
      stopPropagation,
      currentTarget,
    }

    hi.simulate('wheel', event)

    expect(stopPropagation).toBeCalled()
  })

  test('onWheel callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <ScrollLock onWheel={spy}>
        <div style={{ overflow: 'auto', height: '12px' }}>Hi</div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30,
    }
    const event = {
      deltaY: 24,
      preventDefault,
      currentTarget,
    }

    hi.simulate('wheel', event)

    expect(spy).toHaveBeenCalledWith(event)
  })

  test('child onWheel callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <ScrollLock>
        <div style={{ overflow: 'auto', height: '12px' }} onWheel={spy}>
          Hi
        </div>
      </ScrollLock>
    )
    const hi = wrapper.find('div')
    const preventDefault = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30,
    }
    const event = {
      deltaY: 24,
      preventDefault,
      currentTarget,
    }

    hi.simulate('wheel', event)

    expect(spy).toHaveBeenCalledWith(event)
  })
})
