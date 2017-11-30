import React from 'react'
import { MemoryRouter as Router } from 'react-router'
import { Heading, Link, Modal, Portal } from '../../../src/index'
import Keys from '../../../src/constants/Keys'

const simulateKeyPress = (keyCode) => {
  const event = new Event('keyup')
  event.keyCode = keyCode

  document.dispatchEvent(event)
}

describe('Modal', () => {
  it('should be able to open/close modal', (done) => {
    const triggerMarkup = (<Link className='trigger'>Click</Link>)
    mount(
      <div>
        <Modal
          trigger={triggerMarkup}
          className='modal'
          renderTo='#modals'
          timeout={0}
          modalAnimationDelay={0}
          overlayAnimationDelay={0}
        >
          <Heading>Modal content</Heading>
        </Modal>
        <div id='modals' />
      </div>
    )
    expect($('.modal').length).toBe(0)

    $('.trigger')[0].click()

    expect($('.modal').length).toBe(1)

    $('.c-Overlay')[0].click()

    setTimeout(() => {
      expect($('.modal').length).toBe(0)
      done()
    }, 450)
  })

  it('should be able to open with route', (done) => {
    mount(
      <Router initialEntries={['/']}>
        <div>
          <Modal className='modal' exact path='/' />
          <Portal.Container />
        </div>
      </Router>
    )

    expect($('.modal').length).toBe(1)
    done()
  })

  it('should be able to open multiple modals on route change', (done) => {
    const wrapper = mount(
      <Router initialEntries={['/new/path', '/']} initialIndex={1}>
        <div>
          <Modal className='modal' path='/' />
          <Modal className='modal' path='/new' />
          <Modal className='modal' path='/new/path' />
          <Portal.Container />
        </div>
      </Router>
    )

    expect($('.modal').length).toBe(1)

    wrapper.node.history.goBack()

    expect($('.modal').length).toBe(3)
    done()
  })

  it('should be able to close individual modals, in order', (done) => {
    const wrapper = mount(
      <Router initialEntries={['/new/path', '/']} initialIndex={1}>
        <div>
          <Modal className='modal one' path='/' />
          <Modal className='modal two' path='/new' />
          <Modal className='modal three' path='/new/path' />
          <Portal.Container />
        </div>
      </Router>
    )

    wrapper.node.history.goBack()

    simulateKeyPress(Keys.ESCAPE)

    setTimeout(() => {
      expect($('.modal').length).toBe(2)
      expect($('.modal.one').length).toBe(1)
      expect($('.modal.two').length).toBe(1)
      expect($('.modal.three').length).toBe(0)

      simulateKeyPress(Keys.ESCAPE)

      setTimeout(() => {
        expect($('.modal').length).toBe(1)
        expect($('.modal.one').length).toBe(1)
        expect($('.modal.two').length).toBe(0)
        expect($('.modal.three').length).toBe(0)
        done()
      }, 450)
    }, 450)
  })
})
