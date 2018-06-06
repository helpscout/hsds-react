import React, { PureComponent as Component } from 'react'
import { mount, shallow } from 'enzyme'
import Overflow from '..'
import wait from '../../../tests/helpers/wait'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Overflow />)

    expect(wrapper.prop('className')).toContain('c-Overflow')
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = shallow(<Overflow className={className} />)

    expect(wrapper.prop('className')).toContain(className)
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
    const wrapper = shallow(<Overflow />)
    const fade = wrapper.find('.c-Overflow__fader')

    expect(fade.length).toBe(2)
  })

  test('Applies right fade styles on mount, if applicable', () => {
    const wrapper = mount(<Overflow />)
    const fade = wrapper.instance().faderNodeRight
    wrapper.setState({ shouldFadeOnMount: true })

    expect(fade.style.transform).toBe('scaleX(1)')
  })

  test('Applies left fade styles when scrolled', done => {
    const wrapper = mount(<Overflow />)
    const o = wrapper.instance()

    const currentTarget = {
      clientWidth: 100,
      scrollWidth: 200,
      scrollLeft: 40,
    }

    o.handleOnScroll({ currentTarget })

    wait(20).then(() => {
      expect(o.faderNodeLeft.style.transform).toContain('scaleX')
      done()
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
})

describe('adjustHeight', () => {
  test('Method fires on mount', () => {
    const spy = jest.spyOn(Overflow.prototype, 'adjustHeight')
    const wrapper = mount(<Overflow />)

    wrapper.mount()
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
    const n = wrapper.find('.c-Overflow__container').node
    const o = wrapper.instance()

    expect(o.scrollable).toBe(n)
  })
})
