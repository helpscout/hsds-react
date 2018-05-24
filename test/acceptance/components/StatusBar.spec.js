import React from 'react'
import { StatusBar } from '../../../src/index'

describe('StatusBar', () => {
  it('should have light/bold themes that look different', () => {
    mount(
      <div>
        <StatusBar className="light" theme="light" isOpen />
        <StatusBar className="bold" theme="bold" isOpen />
      </div>
    )
    const light = $('.light')
    const bold = $('.bold')

    expect(light.css('background')).not.toBe(bold.css('background'))
  })

  it('should adjust background-color based on status', () => {
    mount(
      <div>
        <StatusBar className="info" status="info" isOpen>
          <span className="content">Content</span>
        </StatusBar>
        <StatusBar className="success" status="success" isOpen>
          <span className="content">Content</span>
        </StatusBar>
      </div>
    )

    const info = $('.info')
    const success = $('.success')

    expect(info.css('background')).not.toBe(success.css('background'))
  })

  it('should align content in the center', () => {
    mount(
      <StatusBar className="bar" theme="light" isOpen>
        <div className="content">Content</div>
      </StatusBar>
    )

    const bar = $('.bar')
    const content = $('.content')
    const offset = content.offset()

    expect(offset.top < offset.left).toBe(true)
    expect(bar.width() > offset.left).toBe(true)
  })

  describe('Button', () => {
    it('should align with text content', () => {
      mount(
        <StatusBar className="bar" theme="light" isOpen>
          <span className="content">Content</span>
          <StatusBar.Button className="button">Action</StatusBar.Button>
        </StatusBar>
      )

      const content = $('.content')
      const button = $('.button')

      expect(button.offset().top < content.height()).toBe(true)
    })

    it('should adjust background-color based on theme', () => {
      mount(
        <div>
          <StatusBar className="light" theme="light" isOpen>
            <span className="content">Content</span>
            <StatusBar.Button className="button">Action</StatusBar.Button>
          </StatusBar>
          <StatusBar className="bold" theme="bold" isOpen>
            <span className="content">Content</span>
            <StatusBar.Button className="button">Action</StatusBar.Button>
          </StatusBar>
        </div>
      )

      const light = $('.light .button')
      const bold = $('.bold .button')

      expect(light.css('background')).not.toBe(bold.css('background'))
    })

    it('should adjust background-color based on status', () => {
      mount(
        <div>
          <StatusBar className="info" status="info" isOpen>
            <span className="content">Content</span>
            <StatusBar.Button className="button">Action</StatusBar.Button>
          </StatusBar>
          <StatusBar className="success" status="success" isOpen>
            <span className="content">Content</span>
            <StatusBar.Button className="button">Action</StatusBar.Button>
          </StatusBar>
        </div>
      )

      const info = $('.info .button')
      const success = $('.success .button')

      expect(info.css('background')).not.toBe(success.css('background'))
    })
  })
})
