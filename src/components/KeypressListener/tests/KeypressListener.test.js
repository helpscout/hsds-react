import React from 'react'
import { mount } from 'enzyme'
import KeypressListener from '..'
import Keys from '../../../constants/Keys'

const simulateKeyPress = (keyCode) => {
  const event = new Event('keyup')
  event.keyCode = keyCode

  document.dispatchEvent(event)
}

describe('Events', () => {
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
    const wrapper = mount(<KeypressListener keyCode={Keys.ENTER} handler={spy} />)

    wrapper.unmount()

    expect(spy).not.toHaveBeenCalled()
  })
})
