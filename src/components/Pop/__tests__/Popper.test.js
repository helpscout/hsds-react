import React from 'react'
import { mount } from 'enzyme'
import Popper, { enhancePopperStyles } from '../Popper'
import ReactPopper from '../../Popper/Popper'

const cleanUp = () => {
  global.document.body.innerHTML = ''
}

describe('Popper', () => {
  afterEach(() => {
    cleanUp()
  })

  describe('Portal', () => {
    test('Renders a Portal', () => {
      const wrapper = mount(<Popper />)

      expect(wrapper.instance().portal).toBeTruthy()
    })

    test('Renders in a Portal (DOM)', () => {
      mount(<Popper />)

      const el = document.getElementsByClassName('c-PopPopper')[0]

      expect(el).toBeTruthy()
    })

    test('Nullifies Portal on unmount', () => {
      const wrapper = mount(<Popper />)
      const o = wrapper.instance()

      expect(wrapper.instance().portal).toBeTruthy()

      wrapper.unmount()

      expect(o.portal).not.toBeTruthy()
    })
  })

  describe('onClick', () => {
    test('Fires onClick callback on click', () => {
      const spy = jest.fn()
      const wrapper = mount(<Popper onClick={spy} />)

      const el = document.getElementsByClassName('c-PopPopper')[0]

      el.click()

      expect(spy).toHaveBeenCalled()
      cleanUp(wrapper)
    })
  })

  describe('Content', () => {
    test('Renders ReactPopper', () => {
      const wrapper = mount(<Popper />)
      const portal = wrapper.instance().portal

      expect(portal.props.children.type === ReactPopper).toBeTruthy()
    })
  })
})

describe('enhancePopperStyles', () => {
  test('Returns an object', () => {
    expect(typeof enhancePopperStyles()).toBe('object')
  })

  test('Adjusts placement styles', () => {
    expect(enhancePopperStyles({ placement: 'top' }).top).toBe('-5px')
    expect(enhancePopperStyles({ placement: 'bottom' }).top).toBe('5px')
    expect(enhancePopperStyles({ placement: 'left' }).left).toBe('-10px')
    expect(enhancePopperStyles({ placement: 'right' }).left).toBe('10px')
    expect(enhancePopperStyles({ placement: 'drrrr' }).left).toBe(undefined)
  })

  test('Extends styles placement styles', () => {
    const styles = enhancePopperStyles({
      placement: 'top',
      style: {
        background: 'red',
      },
    })

    expect(styles.top).toBe('-5px')
    expect(styles.background).toBe('red')
  })
})
