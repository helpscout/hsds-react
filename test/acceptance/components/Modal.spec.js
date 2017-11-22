import React from 'react'
import { Heading, Link, Modal, Portal } from '../../../src/index'

describe('Modal', () => {
  it('should be able to open/close modal', () => {
    const triggerMarkup = (<Link className='trigger'>Click</Link>)
    const wrapper = mount(
      <div>
        <Modal
          trigger={triggerMarkup}
          className='test-modal'
          renderTo='#modals'
        >
          <Heading>Modal content</Heading>
        </Modal>
        <div id='modals' />
      </div>
    )
    expect($('.c-Modal').length).to.equal(0)

    $('.trigger')[0].click()

    expect($('.c-Modal').length).to.equal(1)

    $('.c-Overlay')[0].click()

    setTimeout(() => {
      expect($('.c-Modal').length).to.equal(0)
    }, 0)
  })
})
