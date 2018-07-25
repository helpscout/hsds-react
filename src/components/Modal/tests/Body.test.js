import React, { PureComponent as Component } from 'react'
import { mount } from 'enzyme'
import Body from '../Body'
import { Scrollable } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Body />)

    expect(wrapper.hasClass('c-ModalBody')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Body className={customClass} />)

    expect(wrapper.hasClass(customClass)).toBe(true)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Body>
        <div className="child">Hello</div>
      </Body>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Scrollable', () => {
  class MyComponent extends Component {
    constructor() {
      super()
      this.scrollable = null
    }
    render() {
      return (
        <Body
          scrollableRef={node => {
            this.scrollable = node
          }}
          {...this.props}
        />
      )
    }
  }

  test('Applies scrollable styles by default', () => {
    const wrapper = mount(<Body />)

    expect(wrapper.hasClass('is-scrollable')).toBeTruthy()
  })

  test('Removes scrollable styles, if disabled', () => {
    const wrapper = mount(<Body scrollable={false} />)

    expect(wrapper.hasClass('is-scrollable')).not.toBeTruthy()
    expect(wrapper.hasClass('is-not-scrollable')).toBeTruthy()
  })

  test('Can pass scrollableRef to parent', () => {
    const wrapper = mount(<MyComponent />)
    const n = wrapper.find('.c-Scrollable__content').getNode()
    const o = wrapper.instance()

    expect(o.scrollable).toBe(n)
  })

  test('Can fire onScroll callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<MyComponent onScroll={spy} />)
    const o = wrapper.find(Scrollable)

    o.getNode().props.onScroll()

    expect(spy).toHaveBeenCalled()
  })
})

describe('ScrollableNode', () => {
  test('Sets an internal scrollableNode on mount', () => {
    let node = null
    const ref = el => (node = el)
    const wrapper = mount(<Body scrollableRef={ref} />)

    expect(node).toBeTruthy()
  })

  test('Unsets an internal scrollableNode on unmount', () => {
    let node = null
    const ref = el => (node = el)
    const wrapper = mount(<Body scrollableRef={ref} />)

    wrapper.unmount()

    expect(node).toBeFalsy()
  })

  test('scrollableRef callback prop still works', () => {
    const spy = jest.fn()
    const wrapper = mount(<Body scrollableRef={spy} />)
    const o = wrapper.instance().scrollableNode

    expect(spy).toHaveBeenCalled()
  })
})

describe('Styles', () => {
  test('Does not have seamless styles by default', () => {
    const wrapper = mount(<Body />)

    expect(wrapper.hasClass('is-seamless')).not.toBeTruthy()
  })

  test('Applies isSeamless styles, if applied', () => {
    const wrapper = mount(<Body isSeamless />)

    expect(wrapper.hasClass('is-seamless')).toBeTruthy()
  })
})
