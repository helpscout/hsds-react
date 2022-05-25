import React from 'react'
import { mount } from 'enzyme'
import KeypressListener from '.'
import { Keys } from '@hsds/utils-keyboard'

export const simulateKeyPress = (keyCode, modifier) => {
  const event = new Event('keyup')
  event.keyCode = keyCode
  if (modifier) {
    event[modifier] = true
  }

  document.dispatchEvent(event)
}

describe('Events', () => {
  test('Fires handler when a keypress happens without a keyCode', () => {
    const spy = jest.fn()
    mount(
      <div>
        <KeypressListener keyCode={undefined} handler={spy} />
      </div>
    )

    simulateKeyPress(undefined)

    expect(spy).toHaveBeenCalled()
  })

  test('Can trigger handler callback on keypress', () => {
    const spy = jest.fn()
    mount(
      <div>
        <KeypressListener keyCode={Keys.ENTER} handler={spy} />
      </div>
    )

    simulateKeyPress(Keys.ENTER)

    expect(spy).toHaveBeenCalled()
  })

  test('Does not trigger callback on irrelevant keyPress', () => {
    const spy = jest.fn()
    mount(
      <div>
        <KeypressListener keyCode={Keys.ENTER} handler={spy} />
      </div>
    )

    simulateKeyPress(Keys.UP_ARROW)
    simulateKeyPress(Keys.CAPS_LOCK)
    simulateKeyPress(Keys.ESCAPE)
    simulateKeyPress(Keys.SPACE)
    simulateKeyPress(Keys.KEY_1)

    expect(spy).not.toHaveBeenCalled()
  })

  test('Can trigger handler callback multiple times', () => {
    const spy = jest.fn()
    mount(
      <div>
        <KeypressListener keyCode={Keys.ENTER} handler={spy} />
      </div>
    )

    simulateKeyPress(Keys.ENTER) // 1
    simulateKeyPress(Keys.ENTER) // 2
    simulateKeyPress(Keys.ENTER) // 3
    simulateKeyPress(Keys.SPACE) // SHOULD NOT COUNT
    simulateKeyPress(Keys.ENTER) // 4
    simulateKeyPress(Keys.ENTER) // 5

    expect(spy).toHaveBeenCalledTimes(5)
  })

  test('Stops listening on unmount', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <div>
        <KeypressListener keyCode={Keys.ENTER} handler={spy} />
      </div>
    )

    simulateKeyPress(Keys.ENTER) // 1
    simulateKeyPress(Keys.ENTER) // 2

    expect(spy).toHaveBeenCalledTimes(2)

    wrapper.unmount()

    simulateKeyPress(Keys.ENTER)
    simulateKeyPress(Keys.ENTER)

    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('Does not auto-trigger on mount', () => {
    const spy = jest.fn()
    mount(<KeypressListener keyCode={Keys.ENTER} handler={spy} />)

    expect(spy).not.toHaveBeenCalled()
  })

  test('Does not auto-trigger on unmount', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <KeypressListener keyCode={Keys.ENTER} handler={spy} />
    )

    wrapper.unmount()

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('Modifier keys', () => {
  test('Shift modifier key', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <KeypressListener keyCode={Keys.ENTER} handler={spy} modifier="shift" />
    )

    simulateKeyPress(Keys.ENTER)
    expect(spy).not.toHaveBeenCalled()

    simulateKeyPress(Keys.ENTER, 'shiftKey')
    expect(spy).toHaveBeenCalled()

    wrapper.unmount()
  })

  test('Control modifier key', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <KeypressListener keyCode={Keys.ENTER} handler={spy} modifier="control" />
    )

    simulateKeyPress(Keys.ENTER)
    expect(spy).not.toHaveBeenCalled()

    simulateKeyPress(Keys.ENTER, 'ctrlKey')
    expect(spy).toHaveBeenCalled()

    wrapper.unmount()
  })

  test('Alt modifier key', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <KeypressListener keyCode={Keys.ENTER} handler={spy} modifier="alt" />
    )

    simulateKeyPress(Keys.ENTER)
    expect(spy).not.toHaveBeenCalled()

    simulateKeyPress(Keys.ENTER, 'altKey')
    expect(spy).toHaveBeenCalled()

    wrapper.unmount()
  })

  test('Command modifier key', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <KeypressListener keyCode={Keys.ENTER} handler={spy} modifier="command" />
    )

    simulateKeyPress(Keys.ENTER)
    expect(spy).not.toHaveBeenCalled()

    simulateKeyPress(Keys.ENTER, 'metaKey')
    expect(spy).toHaveBeenCalled()

    wrapper.unmount()
  })

  test('Meta modifier key', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <KeypressListener keyCode={Keys.ENTER} handler={spy} modifier="meta" />
    )

    simulateKeyPress(Keys.ENTER)
    expect(spy).not.toHaveBeenCalled()

    simulateKeyPress(Keys.ENTER, 'metaKey')
    expect(spy).toHaveBeenCalled()

    wrapper.unmount()
  })

  test('Option modifier key', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <KeypressListener keyCode={Keys.ENTER} handler={spy} modifier="option" />
    )

    simulateKeyPress(Keys.ENTER)
    expect(spy).not.toHaveBeenCalled()

    simulateKeyPress(Keys.ENTER, 'altKey')
    expect(spy).toHaveBeenCalled()

    wrapper.unmount()
  })
})

describe('Only, without modifier keys', () => {
  test('Does not trigger when modifier keys are pressed', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <KeypressListener keyCode={Keys.ENTER} handler={spy} noModifier />
    )

    simulateKeyPress(Keys.ENTER, 'shiftKey')
    simulateKeyPress(Keys.ENTER, 'altKey')
    simulateKeyPress(Keys.ENTER, 'ctrlKey')
    simulateKeyPress(Keys.ENTER, 'metaKey')
    expect(spy).not.toHaveBeenCalled()

    simulateKeyPress(Keys.ENTER)
    expect(spy).toHaveBeenCalledTimes(1)

    wrapper.unmount()
  })
})

describe('Scope', () => {
  test('Sets document as scope by default', () => {
    const wrapper = mount(<KeypressListener />)
    const o = wrapper.instance()

    expect(o.scope === document).toBeTruthy()
  })

  test('Can set a specific node scope', () => {
    const div = document.createElement('div')
    const wrapper = mount(<KeypressListener scope={div} />)
    const o = wrapper.instance()

    expect(o.scope === div).toBeTruthy()
  })
})
