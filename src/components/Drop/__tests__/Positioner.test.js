import * as React from 'react'
import { mount } from 'enzyme'
import Positioner from '../Drop.Positioner'

const simulateEvent = eventName => {
  window.dispatchEvent(new Event(eventName))
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Positioner />)
    const el = wrapper.find('div.c-DropPositioner')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Positioner className={customClass} />)
    const el = wrapper.find('div.c-DropPositioner')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child', () => {
    const wrapper = mount(
      <Positioner>
        <div className="child">Hello</div>
      </Positioner>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Position', () => {
  test('Sets position, if defined', () => {
    const position = {
      top: 50,
      left: 100,
      offsetTop: 10,
      direction: {
        x: 'right',
        y: 'down',
      },
    }
    const wrapper = mount(
      <Positioner position={position}>
        <div>Ron B</div>
      </Positioner>
    )
    const o = wrapper.find('div.c-DropPositioner').getDOMNode().style

    // Can only test display, unfortunately.
    // Cannot test transform style in JSDOM :'(
    // https://github.com/chad3814/CSSStyleDeclaration/pull/49
    expect(o.display).toBe('block')
  })

  test('Sets display to none if offsetTop is not available', () => {
    const position = {
      top: 50,
      left: 100,
      direction: {
        x: 'right',
        y: 'down',
      },
    }
    const wrapper = mount(
      <Positioner position={position}>
        <div>Ron B</div>
      </Positioner>
    )
    const o = wrapper.find('div.c-DropPositioner').getDOMNode().style

    expect(o.display).toBe('none')
  })
})

describe('Events', () => {
  test('onUpdatePosition called on mount', () => {
    const spy = jest.fn()
    const position = {
      top: 50,
      left: 100,
      direction: {
        x: 'right',
        y: 'down',
      },
    }

    mount(
      <Positioner position={position} onUpdatePosition={spy}>
        <div>Ron B</div>
      </Positioner>
    )

    expect(spy).toHaveBeenCalled()
  })

  test('onUpdatePosition called on resize', () => {
    const spy = jest.fn()
    const position = {
      top: 50,
      left: 100,
      direction: {
        x: 'right',
        y: 'down',
      },
    }

    mount(
      <Positioner position={position} onUpdatePosition={spy}>
        <div>Ron B</div>
      </Positioner>
    )

    simulateEvent('resize')

    expect(spy).toHaveBeenCalledTimes(2)
  })
})

describe('Direction', () => {
  test('Sets direction classNames based on position', () => {
    const position = {
      top: 50,
      left: 100,
      direction: {
        x: 'right',
        y: 'down',
      },
    }
    const wrapper = mount(
      <Positioner position={position}>
        <div>Ron B</div>
      </Positioner>
    )

    const el = wrapper.find('div.c-DropPositioner')

    expect(el.hasClass('is-right')).toBeTruthy()
    expect(el.hasClass('is-down')).toBeTruthy()
  })

  test('Does not update direction classNames if new position is the same', () => {
    const position = {
      top: 50,
      left: 100,
      direction: {
        x: 'right',
        y: 'down',
      },
    }
    const wrapper = mount(
      <Positioner position={position}>
        <div>Ron B</div>
      </Positioner>
    )

    wrapper.setProps({ position })

    const el = wrapper.find('div.c-DropPositioner')

    expect(el.hasClass('is-right')).toBeTruthy()
    expect(el.hasClass('is-down')).toBeTruthy()
  })

  test('Updates direction classNames based on position change', () => {
    const position = {
      top: 50,
      left: 100,
      direction: {
        x: 'right',
        y: 'down',
      },
    }
    const wrapper = mount(
      <Positioner position={position}>
        <div>Ron B</div>
      </Positioner>
    )

    wrapper.setProps({
      position: Object.assign({}, position, {
        direction: {
          x: 'left',
          y: 'up',
        },
      }),
    })

    const el = wrapper.find('div.c-DropPositioner')

    expect(el.hasClass('is-right')).not.toBeTruthy()
    expect(el.hasClass('is-down')).not.toBeTruthy()
    expect(el.hasClass('is-left')).toBeTruthy()
    expect(el.hasClass('is-up')).toBeTruthy()
  })
})
