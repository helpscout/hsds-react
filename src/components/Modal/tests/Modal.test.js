import React from 'react'
import { shallow, mount } from 'enzyme'
import Modal from '..'
import Keys from '../../../constants/Keys'

const trigger = (
  <a className='trigger'>Trigger</a>
)

const simulateKeyPress = (keyCode) => {
  const event = new Event('keyup')
  event.keyCode = keyCode

  document.dispatchEvent(event)
}

describe('Trigger', () => {
  test('Can render', () => {
    const wrapper = shallow(<Modal isOpen trigger={trigger} />)
    const el = wrapper.find('.trigger')

    expect(el.exists()).toBeTruthy()
    expect(el.text()).toBe('Trigger')

    wrapper.unmount()
  })

  test('Automatically receives click event', () => {
    const wrapper = shallow(<Modal isOpen trigger={trigger} />)
    const el = wrapper.find('.trigger')

    expect(el.prop('onClick')).toBeInstanceOf(Function)

    wrapper.unmount()
  })
})

describe('Key events', () => {
  test('Closes modal when ESCAPE is pressed', (done) => {
    const wrapper = mount(<Modal isOpen trigger={trigger} />)
    const modal = wrapper.find('.c-Modal')

    expect(modal.length).toBe(1)

    simulateKeyPress(Keys.ESCAPE)

    setTimeout(() => {
      expect(wrapper.find('.c-Modal').length).toBe(0)
      wrapper.unmount()
      done()
    }, 500)
  })
})

describe('CloseIcon', () => {
  test('Does not render closeIcon if specified', (done) => {
    const wrapper = mount(<Modal isOpen trigger={trigger} closeIcon={false} />)
    const closeIcon = wrapper.find('.c-Modal__close')

    expect(closeIcon.length).toBe(0)

    wrapper.unmount()
    done()
  })
})

describe('Portal', () => {
  test('Renders Modal next to trigger', () => {
    const wrapper = mount(<Modal isOpen trigger={trigger} />)
    const modal = wrapper.find('.c-Modal')

    expect(modal.exists()).toBeTruthy()

    wrapper.unmount()
  })

  test('Does not render at the body', () => {
    const preMountNodeCount = document.body.childNodes.length
    const wrapper = mount(<Modal isOpen trigger={trigger} />)
    const portal = document.body.childNodes[0]

    expect(document.body.childNodes.length).toBe(preMountNodeCount)
    expect(portal).toBeFalsy()

    wrapper.unmount()
  })

  test('Does not render by default', (done) => {
    setTimeout(() => {
      const preMountNodeCount = document.body.childNodes.length
      const wrapper = mount(<Modal trigger={trigger} />)
      const portal = document.body.childNodes[0]

      expect(document.body.childNodes.length).toBe(preMountNodeCount)
      expect(portal).not.toBeTruthy()

      wrapper.unmount()

      done()
    }, 500)
  })
})
