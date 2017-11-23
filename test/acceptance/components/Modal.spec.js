import React from 'react'
import { Heading, Link, Modal, Portal } from '../../../src/index'

describe('Modal', () => {
  it('should be able to open/close modal', (done) => {
    const triggerMarkup = (<Link className='trigger'>Click</Link>)
    const wrapper = mount(
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
    expect($('.modal').length).to.equal(0)

    $('.trigger')[0].click()

    expect($('.modal').length).to.equal(1)

    $('.c-Overlay')[0].click()

    setTimeout(() => {
      expect($('.modal').length).to.equal(0)
      done()
    }, 450)
  })
})
