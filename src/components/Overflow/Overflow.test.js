import React, { PureComponent as Component } from 'react'
import { mount } from 'enzyme'
import { waitFor } from '@testing-library/react'
import { Overflow } from './Overflow'
import {
  isMouseWheelYEvent,
  remapScrollingPlane,
  hasContentOverflowX,
} from './Overflow.utils'

jest.useFakeTimers()

const ui = {
  container: '.c-Overflow__container',
  faderLeft: '.c-Overflow__fader.is-left',
  faderRight: '.c-Overflow__fader.is-right',
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Overflow />)

    expect(wrapper.getDOMNode().classList.contains('c-Overflow')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<Overflow className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Overflow>
        <div className="brick">BRICK</div>
      </Overflow>
    )
    const brick = wrapper.find('div.brick')

    expect(brick.exists()).toBeTruthy()
    expect(brick.text()).toBe('BRICK')
  })
})

describe('Fade', () => {
  test('Renders fade elements', () => {
    const wrapper = mount(<Overflow />)
    const fade = wrapper.find('.c-Overflow__fader')

    expect(fade.length).toBe(2)
  })

  test('Applies right fade styles on mount, if applicable', () => {
    const wrapper = mount(<Overflow />)
    const fade = wrapper.instance().faderNodeRight
    wrapper.setState({ shouldFadeOnMount: true })

    expect(fade.style.transform).toBe('scaleX(1)')
  })

  test('Applies left fade styles when scrolled', async () => {
    const wrapper = mount(<Overflow />)
    const o = wrapper.instance()

    const currentTarget = {
      clientWidth: 100,
      scrollWidth: 200,
      scrollLeft: 40,
    }

    o.handleOnScroll({ currentTarget })

    await waitFor(() => {
      expect(o.faderNodeLeft.style.transform).toContain('scaleX')
    })
  })

  test('Applies right fade styles when scrolled', () => {
    const wrapper = mount(<Overflow />)
    const o = wrapper.instance()

    const currentTarget = {
      clientHeight: 100,
      scrollHeight: 200,
      scrollLeft: 40,
    }

    o.handleOnScroll({ currentTarget })

    expect(o.faderNodeRight.style.transform).toContain('scaleX')
  })

  test('Fade styles can be disabled', () => {
    const wrapper = mount(<Overflow isScrollable={false} />)
    const o = wrapper.instance()

    const currentTarget = {
      clientHeight: 100,
      scrollHeight: 200,
      scrollLeft: 40,
    }

    o.handleOnScroll({ currentTarget })

    expect(o.faderNodeLeft.style.transform).not.toBeTruthy()
  })

  test('Does not have backgroundColor by default', () => {
    const wrapper = mount(<Overflow />)
    const o = wrapper.instance()
    const faderLeft = o.faderNodeLeft
    const faderRight = o.faderNodeLeft

    expect(faderLeft.style.color).not.toBeTruthy()
    expect(faderRight.style.color).not.toBeTruthy()
  })

  test('Can apply custom background colors', () => {
    const wrapper = mount(<Overflow backgroundColor="red" />)
    const o = wrapper.instance()
    const faderLeft = o.faderNodeLeft
    const faderRight = o.faderNodeLeft

    expect(faderLeft.style.color).toBe('red')
    expect(faderRight.style.color).toBe('red')
  })

  test('Passes resize function to refApplyFade', () => {
    let testMethod = null
    const stubMethod = ref => (testMethod = ref)
    mount(<Overflow refApplyFade={stubMethod} />)

    expect(typeof testMethod).toBe('function')
  })
})

describe('Events', () => {
  test('Fires onScroll callback when scrolled', () => {
    const spy = jest.fn()
    const wrapper = mount(<Overflow onScroll={spy} />)
    const o = wrapper.instance()

    const currentTarget = {
      clientWidth: 100,
      scrollWidth: 200,
      scrollLeft: 40,
    }

    o.handleOnScroll({ currentTarget })

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onWheel callback when scrolled by wheel', () => {
    const spy = jest.fn()
    const wrapper = mount(<Overflow onWheel={spy} />)
    const o = wrapper.find(ui.container)

    o.simulate('wheel')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Height adjustments', () => {
  test('Method fires on mount', () => {
    const wrapper = mount(<Overflow />)
    const spy = jest.fn()
    wrapper.instance().handleOnResize = spy

    wrapper.instance().componentDidMount()

    expect(spy).toHaveBeenCalled()
    spy.mockReset()
    spy.mockRestore()
  })
})

describe('scrollableRef', () => {
  class MyComponent extends Component {
    constructor() {
      super()
      this.scrollable = null
    }
    render() {
      return (
        <Overflow
          scrollableRef={node => {
            this.scrollable = node
          }}
        />
      )
    }
  }

  test('Can pass scrollableRef to parent', () => {
    const wrapper = mount(<MyComponent />)
    const n = wrapper.find('.c-Overflow__container').getDOMNode()
    const o = wrapper.instance()

    expect(o.scrollable).toBe(n)
  })
})

describe('Mount', () => {
  test('Sets internal mount state to true once mounted', () => {
    const wrapper = mount(<Overflow />)

    expect(wrapper.instance()._isMounted).toBe(true)
  })

  test('Sets internal mount state to false once unmounted', () => {
    const wrapper = mount(<Overflow />)
    const o = wrapper.instance()
    wrapper.unmount()

    expect(o._isMounted).toBe(false)
  })

  test('Cannot adjustHeight if unmounted', () => {
    const wrapper = mount(<Overflow />)
    const o = wrapper.instance()
    wrapper.setState({ shouldFadeOnMount: 'stub' })
    wrapper.unmount()

    o.adjustHeight()

    expect(o.state.shouldFadeOnMount).toBe('stub')
  })
})

describe('Scroll', () => {
  test('Scrolls the container left when fader (left) is clicked', () => {
    const spy = jest.fn()
    const wrapper = mount(<Overflow />)
    const o = wrapper.instance()
    o.scrollContainerView = spy

    wrapper.find(ui.faderLeft).simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('Does not scroll the container left when fader (left) is clicked,. if specified', () => {
    const spy = jest.fn()
    const wrapper = mount(<Overflow scrollOnClickFade={false} />)
    const o = wrapper.instance()
    o.scrollContainerView = spy

    wrapper.find(ui.faderLeft).simulate('click')

    expect(spy).not.toHaveBeenCalled()
  })

  test('Scrolls the container left when fader (Right) is clicked', () => {
    const spy = jest.fn()
    const wrapper = mount(<Overflow />)
    const o = wrapper.instance()
    o.scrollContainerView = spy

    wrapper.find(ui.faderRight).simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('Does not scroll the container left when fader (Right) is clicked,. if specified', () => {
    const spy = jest.fn()
    const wrapper = mount(<Overflow scrollOnClickFade={false} />)
    const o = wrapper.instance()
    o.scrollContainerView = spy

    wrapper.find(ui.faderRight).simulate('click')

    expect(spy).not.toHaveBeenCalled()
  })

  test('remapScrollDirections can fire', () => {
    const wrapper = mount(<Overflow />)
    wrapper.instance().remapScrollDirections()
  })

  test('scrollContainerView can fire with value', () => {
    const wrapper = mount(<Overflow />)
    wrapper.instance().scrollContainerView(40)
  })

  test('scrollContainerView can fire without value', () => {
    const wrapper = mount(<Overflow />)
    wrapper.instance().scrollContainerView()
  })

  test('scrollToEnd can fire without value', () => {
    const wrapper = mount(<Overflow />)
    wrapper.instance().scrollToEnd()
  })

  test('Passes scrollToEnd function to refScrollToEnd', () => {
    let testMethod = null
    const stubMethod = ref => (testMethod = ref)
    mount(<Overflow refScrollToEnd={stubMethod} />)

    expect(typeof testMethod).toBe('function')
  })
})

describe('isMouseWheelYEvent', () => {
  test('Returns false if X, Y delta coordinates are missing', () => {
    expect(isMouseWheelYEvent()).toBe(false)
    expect(isMouseWheelYEvent({})).toBe(false)
    expect(isMouseWheelYEvent({ delta: 123 })).toBe(false)
  })

  test('Returns false if X delta is anything other than zero', () => {
    // Non-zero deltaX come from diagonal-like movements, which come from
    // trackpad devices or purely horizontal scroll wheels.
    expect(isMouseWheelYEvent({ deltaX: -1, deltaY: 0 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 1, deltaY: 0 })).toBe(false)
    // Horizontal scroll wheel
    expect(isMouseWheelYEvent({ deltaX: 8, deltaY: 0 })).toBe(false)
    // Trackpad scroll wheel
    expect(isMouseWheelYEvent({ deltaX: 1, deltaY: 4 })).toBe(false)
  })

  test('Returns false if Y delta is too small', () => {
    // Smaller y delta values come from minor (vertical) trackpad based
    // movements.
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: 12 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: 8 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: 4 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: 1 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: -4 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: -8 })).toBe(false)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: -12 })).toBe(false)
  })

  test('Returns true if Y delta surpasses threshold', () => {
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: -48 })).toBe(true)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: -24 })).toBe(true)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: 24 })).toBe(true)
    expect(isMouseWheelYEvent({ deltaX: 0, deltaY: 48 })).toBe(true)
  })
})

describe('remapScrollingPlane', () => {
  test('Adjusts scrollLeft based on deltaY value', () => {
    const event = {
      currentTarget: {
        scrollLeft: 0,
      },
      deltaX: 0,
      deltaY: 40,
      target: {
        shiftKey: false,
      },
      preventDefault: () => null,
    }
    remapScrollingPlane(event)

    expect(event.currentTarget.scrollLeft).toBe(40)
  })

  test('Does not adjusts scrollLeft, if scroll may not come from a mouse wheel', () => {
    const event = {
      currentTarget: {
        scrollLeft: 0,
      },
      deltaX: 0,
      deltaY: 10,
      target: {
        shiftKey: false,
      },
      preventDefault: () => null,
    }
    remapScrollingPlane(event)

    expect(event.currentTarget.scrollLeft).toBe(0)
  })

  test('Does not adjusts scrollLeft based on deltaY value, if shiftKey is pressed', () => {
    const event = {
      currentTarget: {
        scrollLeft: 0,
      },
      deltaX: 0,
      deltaY: 40,
      target: {
        shiftKey: true,
      },
      preventDefault: () => null,
    }
    remapScrollingPlane(event)

    expect(event.currentTarget.scrollLeft).toBe(0)
  })

  test('Does not adjust scrollLeft if deltaX is more than deltaY', () => {
    const spy = jest.fn()
    const event = {
      currentTarget: {
        scrollLeft: 0,
      },
      deltaX: 41,
      deltaY: 40,
      target: {
        shiftKey: false,
      },
      preventDefault: spy,
    }
    remapScrollingPlane(event)

    expect(spy).not.toHaveBeenCalled()
    expect(event.currentTarget.scrollLeft).toBe(0)
  })

  test('Calls preventDefault on successful scroll', () => {
    const spy = jest.fn()
    const event = {
      cancelable: true,
      currentTarget: {
        scrollLeft: 0,
      },
      deltaX: 0,
      deltaY: 40,
      target: {
        shiftKey: false,
      },
      preventDefault: spy,
    }
    remapScrollingPlane(event)

    expect(spy).toHaveBeenCalled()
  })

  test('Does not call preventDefault if node is missing', () => {
    const spy = jest.fn()
    const event = {
      deltaX: 0,
      deltaY: 40,
      target: {
        shiftKey: false,
      },
      preventDefault: spy,
    }
    remapScrollingPlane(event)

    expect(spy).not.toHaveBeenCalled()
  })
})

test('Returns false for invalid elements', () => {
  expect(hasContentOverflowX()).not.toBeTruthy()
  expect(hasContentOverflowX(true)).not.toBeTruthy()
  expect(hasContentOverflowX('div')).not.toBeTruthy()
  expect(hasContentOverflowX(window)).not.toBeTruthy()
  expect(hasContentOverflowX({})).not.toBeTruthy()
})
