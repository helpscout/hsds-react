import React from 'react'
import { cy } from '@helpscout/cyan'
import ScrollLock from './ScrollLock'
import { handleWheelEvent } from './ScrollLock.utils'

describe('Direction: Y', () => {
  test('Permits scrolling within extent', () => {
    const preventDefault = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30,
    }

    handleWheelEvent({
      deltaY: 12,
      preventDefault,
      currentTarget,
    })

    expect(preventDefault).not.toBeCalled()

    currentTarget.scrollTop = 24

    handleWheelEvent({
      deltaY: -12,
      preventDefault,
      currentTarget,
    })

    expect(preventDefault).not.toBeCalled()
  })

  test('Prevents scrolling past extent', () => {
    const preventDefault = jest.fn()
    const currentTarget = {
      clientHeight: 12,
      scrollTop: 0,
      scrollHeight: 30,
    }

    handleWheelEvent({
      deltaY: 24,
      preventDefault,
      currentTarget,
    })

    expect(preventDefault).toBeCalledTimes(1)
    expect(currentTarget.scrollTop).toBe(30)

    currentTarget.scrollTop = 12

    handleWheelEvent({
      deltaY: -20,
      preventDefault,
      currentTarget,
    })

    expect(preventDefault).toBeCalledTimes(2)
    expect(currentTarget.scrollTop).toBe(0)
  })
})

describe('Direction: X', () => {
  test('Permits scrolling within extent', () => {
    const preventDefault = jest.fn()
    const currentTarget = {
      clientWidth: 12,
      scrollLeft: 0,
      scrollWidth: 30,
    }

    handleWheelEvent(
      {
        deltaX: 12,
        preventDefault,
        currentTarget,
      },
      'x'
    )

    expect(preventDefault).not.toBeCalled()

    currentTarget.scrollLeft = 24

    handleWheelEvent(
      {
        deltaX: -12,
        preventDefault,
        currentTarget,
      },
      'x'
    )

    expect(preventDefault).not.toBeCalled()
  })

  test('Prevents scrolling past extent', () => {
    const preventDefault = jest.fn()
    const currentTarget = {
      clientWidth: 12,
      scrollLeft: 0,
      scrollWidth: 30,
    }

    handleWheelEvent(
      {
        deltaX: 24,
        preventDefault,
        currentTarget,
      },
      'x'
    )

    expect(preventDefault).toBeCalledTimes(1)
    expect(currentTarget.scrollLeft).toBe(30)

    currentTarget.scrollLeft = 12
    handleWheelEvent(
      {
        deltaX: -20,
        preventDefault,
        currentTarget,
      },
      'x'
    )

    expect(preventDefault).toBeCalledTimes(2)
    expect(currentTarget.scrollLeft).toBe(0)
  })
})

describe('Normal usage', () => {
  test('Clones child node instead of wrapping it', () => {
    cy.render(
      <ScrollLock>
        <div className="hi" style={{ overflow: 'auto', height: '2px' }}>
          Hi
        </div>
      </ScrollLock>
    )
    const hi = cy.get('div')

    expect(hi.exists()).toBeTruthy()
    expect(hi.length).toBe(1)
    expect(hi.text()).toBe('Hi')
  })
})

describe('Disabled', () => {
  test('Does not swallow onWheel prop if disabled', () => {
    const spy = jest.fn()
    cy.render(
      <ScrollLock isDisabled>
        <div style={{ overflow: 'auto', height: '12px' }} onWheel={spy}>
          Hi
          <br />
          Hello
          <br />
          Hi
        </div>
      </ScrollLock>
    )

    cy.get('div').wheel()

    expect(spy).toHaveBeenCalled()
  })
})

describe('Childless', () => {
  test('Renders nothing', () => {
    cy.render(<ScrollLock />)
    const div = cy.get('div')

    expect(div.length).toBe(0)
  })
})

describe('Events', () => {
  test('can stop propagation for directionY, if defined', () => {
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

    handleWheelEvent(event, 'y', true)

    expect(stopPropagation).toBeCalled()
  })

  test('can stop propagation for directionX, if defined', () => {
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

    handleWheelEvent(event, 'x', true)

    expect(stopPropagation).toBeCalled()
  })

  test('onWheel callback can be triggered on safari', () => {
    navigator.__defineGetter__('userAgent', function () {
      return 'safari'
    })

    const spy = jest.fn()
    cy.render(
      <ScrollLock onWheel={spy}>
        <div style={{ overflow: 'auto', height: '12px' }}>Hi</div>
      </ScrollLock>
    )

    cy.get('div').wheel()

    expect(spy).toHaveBeenCalled()
  })

  test('child onWheel callback can be triggered', () => {
    const spy = jest.fn()
    cy.render(
      <ScrollLock>
        <div style={{ overflow: 'auto', height: '12px' }} onWheel={spy}>
          Hi
        </div>
      </ScrollLock>
    )

    cy.get('div').wheel()

    expect(spy).toHaveBeenCalled()
  })
})
