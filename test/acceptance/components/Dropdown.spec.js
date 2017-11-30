import React from 'react'
import { Dropdown, Portal } from '../../../src/index'
import Keys from '../../../src/constants/Keys'

const simulateKeyPress = (keyCode) => {
  const event = new Event('keyup')
  event.keyCode = keyCode

  document.dispatchEvent(event)
}

describe('Dropdown', () => {
  it('should open menu on trigger click', () => {
    mount(
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
        <Portal.Container />
      </div>
    )

    expect($('.menu').length).toBe(0)

    $('.trigger')[0].click()

    expect($('.menu').length).toBe(1)
  })

  it('should open menu if specified', () => {
    mount(
      <div>
        <Dropdown isOpen>
          <Dropdown.Trigger className='trigger'>Action</Dropdown.Trigger>
          <Dropdown.Menu className='menu'>
            <Dropdown.Item>Ron</Dropdown.Item>
            <Dropdown.Item>Champ</Dropdown.Item>
            <Dropdown.Item>Brian</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Brick</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Portal.Container />
      </div>
    )
    expect($('.menu').length).toBe(1)
  })

  it('should can open sub-menu on sub-trigger click', () => {
    mount(
      <div>
        <Dropdown isOpen>
          <Dropdown.Trigger className='trigger'>Action</Dropdown.Trigger>
          <Dropdown.Menu className='menu'>
            <Dropdown.Item className='sub'>
              Ron
              <Dropdown.Menu className='menu'>
                <Dropdown.Item>Ron</Dropdown.Item>
                <Dropdown.Item>Champ</Dropdown.Item>
                <Dropdown.Item>Brian</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Brick</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>Champ</Dropdown.Item>
            <Dropdown.Item>Brian</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Brick</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Portal.Container />
      </div>
    )

    expect($('.menu').length).toBe(1)
    $('.sub').find('.c-DropdownItem__link')[0].click()
    expect($('.menu').length).toBe(2)
  })

  it('should close all menus on ESCAPE press', (done) => {
    mount(
      <div>
        <Dropdown isOpen>
          <Dropdown.Trigger className='trigger'>Action</Dropdown.Trigger>
          <Dropdown.Menu className='menu'>
            <Dropdown.Item className='sub'>
              Ron
              <Dropdown.Menu className='menu'>
                <Dropdown.Item>Ron</Dropdown.Item>
                <Dropdown.Item>Champ</Dropdown.Item>
                <Dropdown.Item>Brian</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Brick</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>Champ</Dropdown.Item>
            <Dropdown.Item>Brian</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Brick</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Portal.Container />
      </div>
    )

    $('.sub').find('.c-DropdownItem__link')[0].click()
    expect($('.menu').length).toBe(2)

    simulateKeyPress(Keys.ESCAPE)

    setTimeout(() => {
      expect($('.menu').length).toBe(0)
      done()
    }, 300)
  })
})
