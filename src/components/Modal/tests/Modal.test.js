import React, {PureComponent as Component} from 'react'
import { shallow, mount } from 'enzyme'
import { default as Modal, ModalComponent } from '..'
import Portal from '../../Portal'
import Scrollable from '../../Scrollable'
import Keys from '../../../constants/Keys'
import { MemoryRouter as Router } from 'react-router'

const MODAL_TEST_TIMEOUT = 500

const cleanUp = (wrapper) => {
  if (wrapper) wrapper.unmount()
  global.document.body.innerHTML = ''
}

const trigger = (
  <a className='trigger'>Trigger</a>
)

afterEach(() => {
  document.body.innerHTML = ''
  document.body.style.overflow = null
})

const simulateKeyPress = (keyCode) => {
  const event = new Event('keyup')
  event.keyCode = keyCode

  document.dispatchEvent(event)
}

describe('Trigger', () => {
  test('Can render', () => {
    const wrapper = shallow(<Modal isOpen trigger={trigger} />)
    const el = wrapper.find('.trigger')

    expect(el.exists()).toBeTruthy()
    expect(el.text()).toBe('Trigger')
  })

  test('Automatically receives click event', () => {
    const wrapper = shallow(<Modal isOpen trigger={trigger} />)
    const el = wrapper.find('.trigger')

    expect(el.prop('onClick')).toBeInstanceOf(Function)
  })
})

describe('Key events', () => {
  test('Closes modal when ESCAPE is pressed', (done) => {
    mount(<Modal isOpen trigger={trigger} />)
    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]
    const preCloseNodeCount = document.body.childNodes.length

    expect(modal).toBeTruthy()

    simulateKeyPress(Keys.ESCAPE)

    setTimeout(() => {
      expect(document.body.childNodes.length).toBeLessThan(preCloseNodeCount)
      expect(document.getElementsByClassName('c-Modal').length).toBe(0)
      done()
    }, MODAL_TEST_TIMEOUT)
  })
})

describe('CloseIcon', () => {
  test('Does not render closeIcon if specified', () => {
    mount(<Modal isOpen trigger={trigger} closeIcon={false} />)
    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    const closeIcon = modal.getElementsByClassName('c-Modal__close')

    expect(closeIcon.length).toBeFalsy()
  })
})

describe('Portal', () => {
  test('Does not render Modal next to trigger', () => {
    const wrapper = mount(<Modal isOpen trigger={trigger} />)
    const modal = wrapper.find('.c-Modal')

    expect(modal.exists()).toBeFalsy()

    wrapper.unmount()
    cleanUp()
  })

  test('Renders at the body', () => {
    const preMountNodeCount = document.body.childNodes.length
    mount(<Modal isOpen trigger={trigger} />)
    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]

    expect(document.body.childNodes.length).toBe(preMountNodeCount + 1)
    expect(modal).toBeTruthy()
    expect(modal.classList).toContain('c-Modal')
  })

  test('Does not render by default', (done) => {
    setTimeout(() => {
      const preMountNodeCount = document.body.childNodes.length
      mount(<Modal trigger={trigger} />)
      const portal = document.body.childNodes[0]

      expect(document.body.childNodes.length).toBe(preMountNodeCount)
      expect(portal).not.toBeTruthy()

      done()
    }, MODAL_TEST_TIMEOUT)
  })
})

describe('Route', () => {
  test('Automatically opens when a route path is defined', (done) => {
    const testBody = global.document.createElement('div')
    global.document.body.appendChild(testBody)

    const wrapper = mount(
      <Router initialEntries={['/']}>
        <div>
          <Modal exact path='/' />
          <Portal.Container />
        </div>
      </Router>
    , { attachTo: testBody })

    const modal = global.document.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    wrapper.detach()
    done()
  })

  test('Automatically opens when a route path changes', (done) => {
    const testBody = global.document.createElement('div')
    global.document.body.appendChild(testBody)

    const wrapper = mount(
      <Router initialEntries={['/new', '/']} initialIndex={1}>
        <div>
          <Modal exact path='/new' />
          <Portal.Container />
        </div>
      </Router>
    , { attachTo: testBody })

    wrapper.node.history.goBack()
    const modal = global.document.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    wrapper.detach()
    done()
  })

  test('Does not open when a route path is defined, but not active', (done) => {
    const testBody = global.document.createElement('div')
    global.document.body.appendChild(testBody)

    const wrapper = mount(
      <Router initialEntries={['/path']}>
        <div>
          <Modal exact path='/' />
          <Portal.Container />
        </div>
      </Router>
    , { attachTo: testBody })

    const modal = global.document.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeFalsy()

    wrapper.detach()
    done()
  })
})

describe('Style', () => {
  test('Can render extra styles', () => {
    const style = { background: 'red' }
    mount(<Modal isOpen trigger={trigger} closeIcon={false} style={style} />)
    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    const html = modal.outerHTML

    expect(html).toContain('background')
    expect(html).toContain('red')
  })

  test('Can render extra styles + zIndex', () => {
    const style = { background: 'red' }
    mount(<Modal isOpen trigger={trigger} closeIcon={false} style={style} zIndex={2000} />)
    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    const html = modal.outerHTML

    expect(html).toContain('background')
    expect(html).toContain('red')
    expect(html).toContain('z-index')
    expect(html).toContain('2000')
  })

  test('Can render zIndex, without style prop', () => {
    mount(<Modal isOpen trigger={trigger} closeIcon={false} zIndex={2000} />)
    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    const html = modal.outerHTML

    expect(html).toContain('z-index')
    expect(html).toContain('2000')
  })
})

describe('PortalWrapper', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

  test('onBeforeClose callback works', (done) => {
    const testBody = global.document.createElement('div')
    global.document.body.appendChild(testBody)

    const mockCallback = jest.fn()
    const onBeforeClose = (close) => {
      close()
      mockCallback()
    }

    const wrapper = mount(
      <Modal onBeforeClose={onBeforeClose} isOpen />
    , { attachTo: testBody })

    wrapper.unmount()

    setTimeout(() => {
      expect(mockCallback.mock.calls.length).toBe(1)
      wrapper.detach()
      done()
    }, MODAL_TEST_TIMEOUT)
  })
})

describe('Integration: Scrollable', () => {
  class MyComponent extends Component {
    constructor () {
      super()
      this.scrollable = null
    }
    render () {
      return (
        <ModalComponent
          scrollableRef={node => { this.scrollable = node }}
          {...this.props}
        />
      )
    }
  }

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
