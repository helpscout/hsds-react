import React, {PureComponent as Component} from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router'
import { default as Modal, ModalComponent } from '..'
import Portal from '../../Portal'
import Scrollable from '../../Scrollable'
import Keys from '../../../constants/Keys'
import wait from '../../../tests/helpers/wait'

const MODAL_TEST_TIMEOUT = 400

const trigger = (
  <a className='trigger'>Trigger</a>
)

beforeEach(() => {
  window.BluePortalWrapperGlobalManager = undefined
  document.body.innerHTML = ''
})

afterEach(() => {
  document.body.innerHTML = ''
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

    wait(40)
      .then(() => {
        const portal = document.body.childNodes[0]
        const modal = portal.getElementsByClassName('c-Modal')[0]

        expect(modal).toBeTruthy()
      })
      .then(() => {
        simulateKeyPress(Keys.ESCAPE)
      })
      .then(() => wait(MODAL_TEST_TIMEOUT + 200))
      .then(() => {
        expect(document.querySelectorAll('.c-Modal').length).toBe(0)
        done()
      })
  })
})

describe('CloseIcon', () => {
  test('Does not render closeIcon if specified', (done) => {
    const wrapper = mount(<Modal isOpen trigger={trigger} closeIcon={false} />)

    wait(40)
      .then(() => {
        const portal = document.body.childNodes[0]
        const modal = portal.getElementsByClassName('c-Modal')[0]
        const closeIcon = modal.getElementsByClassName('c-Modal__close')

        expect(modal).toBeTruthy()
        expect(closeIcon.length).toBeFalsy()
        wrapper.unmount()
        done()
      })
  })
})

describe('Portal', () => {
  test('Does not render Modal next to trigger', () => {
    const wrapper = mount(<Modal isOpen trigger={trigger} />)
    const modal = wrapper.find('.c-Modal')

    expect(modal.exists()).toBeFalsy()
    wrapper.unmount()
  })

  test('Renders at the body', (done) => {
    const wrapper = mount(<Modal isOpen trigger={trigger} />)

    wait(40)
      .then(() => {
        const portal = document.body.childNodes[0]
        const modal = portal.getElementsByClassName('c-Modal')[0]

        expect(modal).toBeTruthy()
        expect(document.body.childNodes.length).toBe(1)
        wrapper.unmount()
        done()
      })
  })

  test('Does not render by default', (done) => {
    const wrapper = mount(<Modal trigger={trigger} />)

    wait(MODAL_TEST_TIMEOUT)
      .then(() => {
        expect(document.body.childNodes.length).toBe(0)
        wrapper.unmount()
        done()
      })
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

    wait(40)
      .then(() => {
        const modal = global.document.getElementsByClassName('c-Modal')[0]

        expect(modal).toBeTruthy()

        wrapper.detach()
        done()
      })
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

    wait()
      .then(() => {
        wrapper.node.history.goBack()
      })
      .then(() => wait(40))
      .then(() => {
        const modal = global.document.getElementsByClassName('c-Modal')[0]

        expect(modal).toBeTruthy()

        wrapper.detach()
        done()
      })
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

    wait(40)
      .then(() => {
        const modal = global.document.getElementsByClassName('c-Modal')[0]

        expect(modal).toBeFalsy()

        wrapper.detach()
        done()
      })
  })
})

describe('Style', () => {
  test('Can render extra styles', (done) => {
    const style = { background: 'red' }
    const wrapper = mount(
      <Modal isOpen trigger={trigger} closeIcon={false} style={style} />
    )

    wait(40)
      .then(() => {
        const portal = document.body.childNodes[0]
        const modal = portal.getElementsByClassName('c-Modal')[0]

        expect(modal).toBeTruthy()

        const html = modal.outerHTML

        expect(html).toContain('background')
        expect(html).toContain('red')

        wrapper.unmount()
        done()
      })
  })

  test('Can render extra styles + zIndex', (done) => {
    const style = { background: 'red' }
    const wrapper = mount(<Modal isOpen trigger={trigger} closeIcon={false} style={style} zIndex={2000} />)

    wait(40)
      .then(() => {
        const portal = document.body.childNodes[0]
        const modal = portal.getElementsByClassName('c-Modal')[0]

        expect(modal).toBeTruthy()

        const html = modal.outerHTML

        expect(html).toContain('background')
        expect(html).toContain('red')
        expect(html).toContain('z-index')
        expect(html).toContain('2000')
        wrapper.unmount()
        done()
      })
  })

  test('Can render zIndex, without style prop', (done) => {
    const wrapper = mount(<Modal isOpen trigger={trigger} closeIcon={false} zIndex={2000} />)

    wait(40)
      .then(() => {
        const portal = document.body.childNodes[0]
        const modal = portal.getElementsByClassName('c-Modal')[0]

        expect(modal).toBeTruthy()

        const html = modal.outerHTML

        expect(html).toContain('z-index')
        expect(html).toContain('2000')
        wrapper.unmount()
        done()
      })
  })
})

describe('PortalWrapper', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

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

    wait(40)
      .then(() => {
        wrapper.unmount()
      })
      .then(() => wait(MODAL_TEST_TIMEOUT))
      .then(() => {
        expect(mockCallback.mock.calls.length).toBe(1)
        wrapper.detach()
        done()
      })
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
