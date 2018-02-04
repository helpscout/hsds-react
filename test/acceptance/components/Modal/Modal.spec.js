import React from 'react'
import { MemoryRouter as Router } from 'react-router'
import { Heading, Link, Modal, Portal } from '../../../../src/index'
import Keys from '../../../../src/constants/Keys'
import { wait } from '../../test-helpers'
import getScrollbarWidth from '../../../../src/vendors/getScrollbarWidth'

const modalUnmountTime = 450

const simulateKeyPress = (keyCode) => {
  const event = new Event('keyup')
  event.keyCode = keyCode

  document.dispatchEvent(event)
}

describe('Open/Close', () => {
  it('should be able to open/close modal', (done) => {
    const triggerMarkup = (<Link className='trigger'>Click</Link>)
    mount(
      <div>
        <Modal
          trigger={triggerMarkup}
          cardClassName='modal'
          renderTo='#modals'
          timeout={0}
          modalAnimationDelay={0}
          overlayAnimationDelay={0}
        >
          <Modal.Body>
            <Heading>Modal content</Heading>
          </Modal.Body>
        </Modal>
        <div id='modals' />
      </div>
    )
    expect($('.modal').length).toBe(0)

    $('.trigger')[0].click()

    wait(100)
      .then(() => {
        expect($('.modal').length).toBe(1)
      })
      .then(() => {
        $('.c-Overlay')[0].click()
      })
      .then(() => wait(modalUnmountTime))
      .then(() => {
        expect($('.modal').length).toBe(0)
        done()
      })
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

    wait(100)
      .then(() => {
        expect($('.modal').length).toBe(1)
        done()
      })
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

    wait(100)
      .then(() => {
        expect($('.modal').length).toBe(1)
      })
      .then(() => {
        wrapper.node.history.goBack()
      })
      .then(() => wait(100))
      .then(() => {
        expect($('.modal').length).toBe(3)
        done()
      })
  })

  it('should be able to close individual modals, in order', (done) => {
    const wrapper = mount(
      <Router initialEntries={['/view/path', '/']} initialIndex={1}>
        <div>
          <Modal cardClassName='modal one' path='/' />
          <Modal cardClassName='modal two' path='/view' />
          <Modal cardClassName='modal three' path='/view/path' />
          <Portal.Container />
        </div>
      </Router>
    )

    wrapper.node.history.goBack()

    wait(100)
      .then(() => {
        simulateKeyPress(Keys.ESCAPE)
      })
      .then(() => wait(modalUnmountTime))
      .then(() => {
        expect($('.modal').length).toBe(2)
        expect($('.modal.one').length).toBe(1)
        expect($('.modal.two').length).toBe(1)
        expect($('.modal.three').length).toBe(0)
        done()
      })
  })

  it('should be able to open with prop change', (done) => {
    const wrapper = mount(
      <Modal cardClassName='modal' />
    )

    wait()
      .then(() => {
        wrapper.setProps({ isOpen: true })
      })
      .then(() => wait(100))
      .then(() => {
        expect($('.modal').length).toBe(1)
        wrapper.unmount()
        done()
      })
  })

  it('should be able to close with prop change', (done) => {
    const wrapper = mount(
      <Modal cardClassName='modal' isOpen timeout={0} />
    )

    wait(modalUnmountTime)
      .then(() => {
        expect($('.modal').length).toBe(1)
      })
      .then(() => {
        wrapper.setProps({ isOpen: false })
      })
      .then(() => wait(modalUnmountTime))
      .then(() => {
        expect($('.modal').length).toBe(0)
        wrapper.unmount()
        done()
      })
  })
})

describe('Scrollable', () => {
  it('should not extend beyond the Modal (height)', (done) => {
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
          <Modal.Body>
            <Heading>Modal content</Heading>
            <div className='big' style={{height: 4000}} />
          </Modal.Body>
        </Modal>
        <div id='modals' />
      </div>
    )
    $('.trigger')[0].click()

    wait(100)
      .then(() => {
        expect($('.c-Modal__innerWrapper').height())
          .toBeGreaterThan($('.c-ModalBody__scrollable').height())
        done()
      })
  })

  it('should adjust CloseButton position to account for scrollbar', (done) => {
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
          <Modal.Body>
            <Heading>Modal content</Heading>
            <div className='big' style={{height: 4000}} />
          </Modal.Body>
        </Modal>
        <div id='modals' />
      </div>
    )
    $('.trigger')[0].click()

    wait(300)
      .then(() => {
        const scrollbarWidth = getScrollbarWidth()
        const right = parseInt($('.c-Modal__close').css('right'), 10)

        expect(right >= scrollbarWidth).toBe(true)
        done()
      })
  })
})
