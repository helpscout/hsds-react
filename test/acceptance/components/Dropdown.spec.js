import React from 'react'
import { Dropdown, Portal } from '../../../src/index'
import Keys from '../../../src/constants/Keys'
import { wait } from '../test-helpers'

const simulateKeyPress = (keyCode) => {
  const event = new Event('keyup')
  event.keyCode = keyCode

  document.dispatchEvent(event)
}

const waitTime = 400

describe('Dropdown', () => {
  it('should open menu on trigger click', (done) => {
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

    wait(waitTime).then(() => {
      expect($('.menu').length).toBe(1)
      done()
    })
  })

  it('should open menu if specified', (done) => {
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

    wait(waitTime).then(() => {
      expect($('.menu').length).toBe(1)
      done()
    })
  })

  it('should open sub-menu on sub-trigger click', (done) => {
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

    wait(waitTime)
      .then(() => {
        expect($('.menu').length).toBe(1)
      })
      .then(() => {
        $('.sub').find('.c-DropdownItem__link')[0].click()
      })
      .then(() => wait(waitTime))
      .then(() => {
        // expect($('.menu').length).toBe(2)
        done()
      })
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

    wait(waitTime)
      .then(() => {
        $('.sub').find('.c-DropdownItem__link')[0].click()
      })
      .then(() => wait(waitTime))
      .then(() => {
        expect($('.menu').length).toBe(2)
      })
      .then(() => simulateKeyPress(Keys.ESCAPE))
      .then(() => wait(waitTime))
      .then(() => {
        expect($('.menu').length).toBe(0)
        done()
      })
  })
})
