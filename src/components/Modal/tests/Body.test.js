import React, {PureComponent as Component} from 'react'
import { mount, shallow } from 'enzyme'
import Body from '../Body'
import { Scrollable } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Body />)

    expect(wrapper.hasClass('c-ModalBody')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Body className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<Body><div className='child'>Hello</div></Body>)
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Scrollable', () => {
  class MyComponent extends Component {
    constructor () {
      super()
      this.scrollable = null
    }
    render () {
      return (
        <Body
          scrollableRef={node => { this.scrollable = node }}
          {...this.props}
        />
      )
    }
  }

  test('Applies scrollable styles by default', () => {
    const wrapper = shallow(<Body />)

    expect(wrapper.hasClass('is-scrollable')).toBeTruthy()
  })

  test('Removes scrollable styles, if disabled', () => {
    const wrapper = shallow(<Body scrollable={false} />)

    expect(wrapper.hasClass('is-scrollable')).not.toBeTruthy()
    expect(wrapper.hasClass('is-not-scrollable')).toBeTruthy()
  })

  test('Can pass scrollableRef to parent', () => {
    const wrapper = mount(<MyComponent />)
    const n = wrapper.find('.c-Scrollable__content').node
    const o = wrapper.instance()

    expect(o.scrollable).toBe(n)
  })

  test('Can fire onScroll callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<MyComponent onScroll={spy} />)
    const o = wrapper.find(Scrollable)

    o.node.props.onScroll()

    expect(spy).toHaveBeenCalled()
  })
})

describe('ScrollableNode', () => {
  test('Sets an internal scrollableNode on mount', () => {
    const wrapper = mount(<Body />)

    expect(wrapper.instance().scrollableNode).toBeTruthy()
  })

  test('Unsets an internal scrollableNode on unmount', () => {
    const wrapper = mount(<Body />)
    const o = wrapper.instance()
    wrapper.unmount()

    expect(o.scrollableNode).not.toBeTruthy()
  })

  test('scrollableRef callback prop still works', () => {
    const spy = jest.fn()
    const wrapper = mount(<Body scrollableRef={spy} />)
    const o = wrapper.instance().scrollableNode

    expect(spy).toHaveBeenCalledWith(o)
  })
})

describe('Context', () => {
  test('Position closeIcon using context', () => {
    const spy = jest.fn()
    mount(<Body />, {
      context: {
        positionCloseNode: spy
      }
    })

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Does not have seamless styles by default', () => {
    const wrapper = shallow(<Body />)

    expect(wrapper.hasClass('is-seamless')).not.toBeTruthy()
  })

  test('Applies isSeamless styles, if applied', () => {
    const wrapper = shallow(<Body isSeamless />)

    expect(wrapper.hasClass('is-seamless')).toBeTruthy()
  })
})
