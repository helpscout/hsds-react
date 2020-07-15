import React, { PureComponent as Component } from 'react'
import { mount, render } from 'enzyme'
import { Scrollable } from './Scrollable'

jest.useFakeTimers()

const ui = {
  content: '.c-Scrollable__content',
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = render(<Scrollable />)

    expect(wrapper.hasClass('c-Scrollable')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = render(<Scrollable className={className} />)

    expect(wrapper.hasClass(className)).toBeTruthy()
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Scrollable>
        <div className="brick">BRICK</div>
      </Scrollable>
    )
    const brick = wrapper.find('div.brick')

    expect(brick.exists()).toBeTruthy()
    expect(brick.text()).toBe('BRICK')
  })
})

describe('Fade', () => {
  test('Renders fade elements', () => {
    const wrapper = render(<Scrollable fade />)
    const fade = wrapper.find('.c-Scrollable__fader')

    expect(fade.length).toBe(1)
  })

  test('Renders left fade elements', () => {
    const wrapper = render(<Scrollable fadeLeft />)
    const fade = wrapper.find('.c-Scrollable__fader')

    expect(fade.length).toBe(1)
  })

  test('Renders right fade elements', () => {
    const wrapper = render(<Scrollable fadeRight />)
    const fade = wrapper.find('.c-Scrollable__fader')

    expect(fade.length).toBe(1)
  })

  test('Applies bottom fade styles on mount, if applicable', () => {
    const wrapper = mount(<Scrollable fadeBottom />)
    const o = wrapper.instance()
    const fade = o.faderNodeBottom

    expect(fade.style.transform).toBe('scaleY(0)')

    const currentTarget = {
      clientHeight: 100,
      scrollHeight: 200,
      scrollTop: 30,
    }

    o.handleOnScroll({ currentTarget })

    jest.runAllTimers()

    expect(o.faderNodeBottom.style.transform).toBe('scaleY(1)')
  })

  test('Applies right fade styles on mount, if applicable', () => {
    const wrapper = mount(<Scrollable fadeLeft fadeRight />)
    const o = wrapper.instance()
    const fade = o.faderNodeRight

    expect(fade.style.transform).toBe('scaleX(0)')

    const currentTarget = {
      clientWidth: 100,
      scrollWidth: 200,
      scrollLeft: 30,
    }

    o.handleOnScroll({ currentTarget })

    jest.runAllTimers()

    expect(o.faderNodeRight.style.transform).toBe('scaleX(1)')
  })

  test('Applies top fade styles when scrolled', () => {
    const wrapper = mount(<Scrollable fade />)
    const o = wrapper.instance()

    const currentTarget = {
      clientHeight: 100,
      scrollHeight: 200,
      scrollTop: 30,
    }

    o.handleOnScroll({ currentTarget })

    jest.runAllTimers()

    expect(o.faderNodeTop.style.transform).toContain('scaleY')
  })

  test('Applies bottom fade styles when scrolled', () => {
    const wrapper = mount(<Scrollable fadeBottom />)
    const o = wrapper.instance()

    const currentTarget = {
      clientHeight: 100,
      scrollHeight: 200,
      scrollTop: 30,
    }

    o.handleOnScroll({ currentTarget })

    jest.runAllTimers()

    expect(o.faderNodeBottom.style.transform).toContain('scaleY')
  })
})

test('Applies left fade styles when scrolled', () => {
  const wrapper = mount(<Scrollable fadeLeft fadeRight />)
  const o = wrapper.instance()

  const currentTarget = {
    clientWidth: 100,
    scrollWidth: 200,
    scrollLeft: 30,
  }

  o.handleOnScroll({ currentTarget })

  jest.runAllTimers()

  expect(o.faderNodeLeft.style.transform).toContain('scaleX')
})

test('Applies right fade styles when scrolled', () => {
  const wrapper = mount(<Scrollable fadeLeft fadeRight />)
  const o = wrapper.instance()

  const currentTarget = {
    clientWidth: 100,
    scrollWidth: 200,
    scrollLeft: 30,
  }

  o.handleOnScroll({ currentTarget })

  jest.runAllTimers()

  expect(o.faderNodeRight.style.transform).toContain('scaleX')
})

describe('Content', () => {
  test('Renders content within the content node', () => {
    const wrapper = render(
      <Scrollable>
        <div className="mugatu">Mugatu</div>
      </Scrollable>
    )
    const o = wrapper.find(ui.content)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('mugatu')
    expect(o.html()).toContain('Mugatu')
  })

  test('Can provide content with custom className', () => {
    const wrapper = render(<Scrollable contentClassName="mugatu" />)
    const o = wrapper.find(ui.content)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Applies rounded styles when specified', () => {
    const wrapper = render(<Scrollable fade fadeBottom rounded />)

    expect(wrapper.hasClass('is-rounded')).toBe(true)
    expect(wrapper.find('.c-Scrollable__fader').hasClass('is-rounded')).toBe(
      true
    )
  })
})

describe('Events', () => {
  test('Fires onScroll callback when scrolled', () => {
    const onScrollSpy = jest.fn()
    const wrapper = mount(<Scrollable onScroll={onScrollSpy} />)
    const o = wrapper.instance()
    const applyFadeStylesSpy = jest.spyOn(o, 'applyFadeStyles')

    o.handleOnScroll()

    expect(onScrollSpy).toHaveBeenCalled()
    expect(applyFadeStylesSpy).toHaveBeenCalled()
  })

  test('Re applies fader on sides when the window resizes', () => {
    const wrapper = mount(<Scrollable fadeLeft fadeRight />)
    const spy = jest.spyOn(wrapper.instance(), 'applyFade')

    global.dispatchEvent(new Event('resize'))
    wrapper.unmount()

    expect(spy).toHaveBeenCalled()
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
        <Scrollable
          scrollableRef={node => {
            this.scrollable = node
          }}
        />
      )
    }
  }

  test('Can pass scrollableRef to parent', () => {
    const wrapper = mount(<MyComponent />)
    const n = wrapper.find('div.c-Scrollable__content').getDOMNode()
    const o = wrapper.instance()

    expect(o.scrollable).toBe(n)
  })
})
