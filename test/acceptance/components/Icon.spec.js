import React from 'react'
import { Icon } from '../../../src/index'

describe('Icon', () => {
  describe('Color', () => {
    it('should inherit icon color from parent node', () => {
      mount(
        <div style={{color: 'red'}} className='wrapper'>
          <Icon
            name='emoji'
            className='caret'
            center
          />
        </div>
      )
      const color = $('.wrapper').css('color')
      const icon = $('.caret')
      const svg = icon.find('.c-Icon__icon').first().find('svg path')

      expect(svg.css('fill')).toBe(color)
    })
  })

  describe('center', () => {
    it('should be able to center align Icon', () => {
      mount(
        <div>
          <Icon name='emoji' className='caret' center />
        </div>
      )
      const caret = $('.caret')

      expect(caret.css('margin-left')).not.toBe('0px')
      expect(caret.css('margin-left')).toBe(caret.css('margin-right'))
    })
  })

  describe('withCaret', () => {
    it('should not align caret below icon', () => {
      mount(
        <div>
          <Icon name='emoji' className='default' />
          <Icon name='emoji' className='caret' withCaret />
        </div>
      )
      const def = $('.default')
      const caret = $('.caret')

      expect(def.height()).toBe(caret.height())
      expect(def.width()).toBeLessThan(caret.width())
    })

    it('should be able to center align Icon withCaret', () => {
      mount(
        <div>
          <Icon name='emoji' className='caret' withCaret center />
        </div>
      )
      const caret = $('.caret')

      expect(caret.css('margin-left')).not.toBe('0px')
      expect(caret.css('margin-left')).toBe(caret.css('margin-right'))
    })

    it('should use the same color for both Icon and Caret', () => {
      mount(
        <div style={{color: 'red'}} className='wrapper'>
          <Icon
            name='emoji'
            className='caret'
            withCaret
            center
          />
        </div>
      )
      const color = $('.wrapper').css('color')
      const icon = $('.caret')
      const svg = icon.find('.c-Icon__icon').first().find('svg path')
      const caret = icon.find('.c-Icon__icon.is-caret svg path')

      expect(svg.css('fill')).toBe(color)
      expect(caret.css('fill')).toBe(color)
    })
  })
})
