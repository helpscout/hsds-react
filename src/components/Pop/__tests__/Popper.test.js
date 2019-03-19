import React from 'react'
import { mount } from 'enzyme'
import Popper, { enhancePopperStyles } from '../Popper'
import ReactPopper from '../../Popper/Popper'

jest.mock('../../Portal', () => {
  const Portal = ({ children }) => <div>{children}</div>

  return Portal
})

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
      const el = wrapper.find('Portal')

      expect(el.length).toBeTruthy()
    })

    test('Renders in a Portal (DOM)', () => {
      const wrapper = mount(<Popper />)
      const el = wrapper.find('Portal div.c-PopPopper')

      expect(el.length).toBeTruthy()
    })
  })

  describe('onClick', () => {
    test('Fires onClick callback on click', () => {
      const spy = jest.fn()
      const wrapper = mount(<Popper onClick={spy} />)
      const el = wrapper.find('Portal div.c-PopPopper')

      el.simulate('click')

      expect(spy).toHaveBeenCalled()
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
    expect(enhancePopperStyles({ placement: 'left' }).left).toBe('-2.5px')
    expect(enhancePopperStyles({ placement: 'right' }).left).toBe('2.5px')
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
