import React from 'react'
import { shallow, mount } from 'enzyme'
import Modal from '..'
import Portal from '../../Portal'
import Keys from '../../../constants/Keys'
import { MemoryRouter as Router } from 'react-router'

const trigger = (
  <a className='trigger'>Trigger</a>
)

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

    wrapper.unmount()
  })

  test('Automatically receives click event', () => {
    const wrapper = shallow(<Modal isOpen trigger={trigger} />)
    const el = wrapper.find('.trigger')

    expect(el.prop('onClick')).toBeInstanceOf(Function)

    wrapper.unmount()
  })
})

describe('Key events', () => {
  test('Closes modal when ESCAPE is pressed', (done) => {
    const wrapper = mount(<Modal isOpen trigger={trigger} />)
    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]
    const preCloseNodeCount = document.body.childNodes.length

    expect(modal).toBeTruthy()

    simulateKeyPress(Keys.ESCAPE)

    setTimeout(() => {
      expect(document.body.childNodes.length).toBeLessThan(preCloseNodeCount)
      expect(document.getElementsByClassName('c-Modal').length).toBe(0)
      done()
    }, 500)

    wrapper.unmount()
  })
})

describe('CloseIcon', () => {
  test('Does not render closeIcon if specified', (done) => {
    const wrapper = mount(<Modal isOpen trigger={trigger} closeIcon={false} />)
    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    const closeIcon = modal.getElementsByClassName('c-Modal__close')

    expect(closeIcon.length).toBeFalsy()

    wrapper.unmount()
    done()
  })
})

describe('Portal', () => {
  test('Does not render Modal next to trigger', () => {
    const wrapper = mount(<Modal isOpen trigger={trigger} />)
    const modal = wrapper.find('.c-Modal')

    expect(modal.exists()).toBeFalsy()

    wrapper.unmount()
  })

  test('Renders at the body', () => {
    const preMountNodeCount = document.body.childNodes.length
    const wrapper = mount(<Modal isOpen trigger={trigger} />)
    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]

    expect(document.body.childNodes.length).toBe(preMountNodeCount + 1)
    expect(modal).toBeTruthy()
    expect(modal.classList).toContain('c-Modal')

    wrapper.unmount()
  })

  test('Does not render by default', (done) => {
    setTimeout(() => {
      const preMountNodeCount = document.body.childNodes.length
      const wrapper = mount(<Modal trigger={trigger} />)
      const portal = document.body.childNodes[0]

      expect(document.body.childNodes.length).toBe(preMountNodeCount)
      expect(portal).not.toBeTruthy()

      wrapper.unmount()

      done()
    }, 500)
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
    global.document.body.removeChild(testBody)
    global.document.body.innerHTML = ''
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
    global.document.body.removeChild(testBody)
    global.document.body.innerHTML = ''
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
    global.document.body.removeChild(testBody)
    global.document.body.innerHTML = ''
    done()
  })
})
