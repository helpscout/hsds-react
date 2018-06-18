import React, { PureComponent as Component } from 'react'
import { mount, shallow } from 'enzyme'
import Scrollable from '..'
import wait from '../../../tests/helpers/wait'

const ui = {
  content: '.c-Scrollable__content',
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Scrollable />)

    expect(wrapper.prop('className')).toContain('c-Scrollable')
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = shallow(<Scrollable className={className} />)

    expect(wrapper.prop('className')).toContain(className)
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
    const wrapper = shallow(<Scrollable fade />)
    const fade = wrapper.find('.c-Scrollable__fader')

    expect(fade.length).toBe(2)
  })

  test('Applies bottom fade styles on mount, if applicable', done => {
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

    wait(60).then(() => {
      expect(o.faderNodeBottom.style.transform).toBe('scaleY(1)')
      done()
    })
  })

  test('Applies top fade styles when scrolled', done => {
    const wrapper = mount(<Scrollable fade />)
    const o = wrapper.instance()

    const currentTarget = {
      clientHeight: 100,
      scrollHeight: 200,
      scrollTop: 30,
    }

    o.handleOnScroll({ currentTarget })

    wait(60).then(() => {
      expect(o.faderNodeTop.style.transform).toContain('scaleY')
      done()
    })
  })

  test('Applies bottom fade styles when scrolled', done => {
    const wrapper = mount(<Scrollable fadeBottom />)
    const o = wrapper.instance()

    const currentTarget = {
      clientHeight: 100,
      scrollHeight: 200,
      scrollTop: 30,
    }

    o.handleOnScroll({ currentTarget })

    wait(60).then(() => {
      expect(o.faderNodeBottom.style.transform).toContain('scaleY')
      done()
    })
  })
})

describe('Content', () => {
  test('Renders content within the content node', () => {
    const wrapper = shallow(
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
    const wrapper = shallow(<Scrollable contentClassName="mugatu" />)
    const o = wrapper.find(ui.content)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Applies rounded styles when specified', () => {
    const wrapper = shallow(<Scrollable fade rounded />)

    expect(wrapper.prop('className')).toContain('is-rounded')
  })
})

describe('Events', () => {
  test('Fires onScroll callback when scrolled', () => {
    const spy = jest.fn()
    const wrapper = mount(<Scrollable onScroll={spy} />)
    const o = wrapper.instance()

    o.handleOnScroll()

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
    const n = wrapper.find('.c-Scrollable__content').getNode()
    const o = wrapper.instance()

    expect(o.scrollable).toBe(n)
  })
})
