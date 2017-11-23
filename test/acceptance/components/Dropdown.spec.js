import React from 'react'
import { Dropdown, Portal } from '../../../src/index'

describe('Dropdown', () => {
  it('should position menu correctly on open', (done) => {
    const wrapper = mount(
      <div>
        <Dropdown>
          <Dropdown.Trigger className='trigger'>Action</Dropdown.Trigger>
          <Dropdown.Menu className='menu'>
            <Dropdown.Item>Ron</Dropdown.Item>
            <Dropdown.Item>Champ</Dropdown.Item>
            <Dropdown.Item>Brian</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Brick</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div id='modals' />
      </div>
    )

    expect($('.menu').length).to.equal(0)

    $('.trigger')[0].click()

    setTimeout(() => {
      expect($('.menu').length).to.equal(1)
      done()
    }, 300)
  })
})
