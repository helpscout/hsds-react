import React from 'react'
import { mount, shallow } from 'enzyme'
import Pop from '../Pop'

const cx = {
  node: '.c-PopWrapper',
}

const cleanUp = () => {
  global.document.body.innerHTML = ''
}

// Helper method to allow for the onBeforeOpen/onBeforeClose async Promises
// to resolve before checking wrapper.state()
function timeout(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('Pop', () => {
  afterEach(() => {
    cleanUp()
  })

  describe('isOpen', () => {
    test('Is closed by default', () => {
      const wrapper = shallow(<Pop />)

      expect(wrapper.state().isOpen).toBe(false)
    })

    test('Can be open by default', () => {
      const wrapper = shallow(<Pop isOpen />)

      expect(wrapper.state().isOpen).toBe(true)
    })

    test('Changes isOpen state on prop change', async () => {
      const wrapper = shallow(<Pop isOpen={false} />)
      wrapper.setProps({ isOpen: true })

      await timeout()

      expect(wrapper.state().isOpen).toBe(true)
    })

    test('Does not changes isOpen state on unrelated prop change', () => {
      const wrapper = shallow(<Pop />)
      wrapper.setProps({ nope: true })

      expect(wrapper.state().isOpen).toBe(false)
    })
  })

  describe('Children', () => {
    test('Does not render non Reference/Popper children', () => {
      const wrapper = mount(
        <Pop>
          <div className="ron" />
        </Pop>
      )
      const el = wrapper.find('.ron')

      expect(el.length).toBe(0)
    })
  })

  describe('Reference', () => {
    test('Renders a Reference child', () => {
      const wrapper = mount(
        <Pop>
          <Pop.Reference>
            <div className="ron" />
          </Pop.Reference>
        </Pop>
      )

      const el = wrapper.find('.ron')

      expect(el.length).toBe(1)
    })

    test('Nullifies on unmount', () => {
      const wrapper = mount(
        <Pop>
          <Pop.Reference>
            <div className="ron" />
          </Pop.Reference>
        </Pop>
      )
      const o = wrapper.instance()

      expect(wrapper.instance().node).toBeTruthy()

      wrapper.unmount()

      expect(o.node).toBeFalsy()
    })
  })

  describe('Mouse: Hover events', () => {
    test('Does not changes open/close states on mousemove/mouseleave, if triggerOn is click', () => {
      const wrapper = shallow(
        <Pop triggerOn="click">
          <Pop.Reference />
        </Pop>
      )
      const el = wrapper.find(cx.node)

      el.simulate('mousemove')
      expect(wrapper.state().isOpen).not.toBe(true)

      el.simulate('mouseleave')
      expect(wrapper.state().isOpen).toBe(false)
    })

    test('Changes open/close states on mousemove/mouseleave', async () => {
      const wrapper = shallow(
        <Pop triggerOn="hover">
          <Pop.Reference />
        </Pop>
      )
      const el = wrapper.find(cx.node)

      el.simulate('mousemove')
      await timeout()
      expect(wrapper.state().isOpen).toBe(true)

      el.simulate('mouseleave')
      await timeout()
      expect(wrapper.state().isOpen).toBe(false)
    })

    test('Fires onOpen/onClose on mousemove/mouseleave', async () => {
      const spyOpen = jest.fn()
      const spyClose = jest.fn()
      const wrapper = shallow(
        <Pop triggerOn="hover" onOpen={spyOpen} onClose={spyClose}>
          <Pop.Reference />
        </Pop>
      )
      const el = wrapper.find(cx.node)

      el.simulate('mousemove')
      await timeout()
      expect(spyOpen).toHaveBeenCalled()

      el.simulate('mouseleave')
      await timeout()
      expect(spyClose).toHaveBeenCalled()
    })

    test('Does not re-trigger open on mousemove, if already open', () => {
      const spy = jest.fn()
      const wrapper = shallow(
        <Pop triggerOn="hover" onOpen={spy}>
          <Pop.Reference />
        </Pop>
      )
      const el = wrapper.find(cx.node)
      wrapper.setState({ isOpen: true })

      el.simulate('mousemove')

      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('Mouse: Cick events', () => {
    test('Stops propogation on click', () => {
      const spy = jest.fn()
      const wrapper = shallow(
        <Pop triggerOn="click">
          <Pop.Reference />
        </Pop>
      )
      const el = wrapper.find(cx.node)

      el.simulate('click', { stopPropagation: spy })

      expect(spy).toHaveBeenCalled()
    })

    test('Does not changes open/close states on click, if triggerOn is hover', () => {
      const wrapper = shallow(
        <Pop triggerOn="hover">
          <Pop.Reference />
        </Pop>
      )
      const el = wrapper.find(cx.node)

      el.simulate('click')
      expect(wrapper.state().isOpen).not.toBe(true)

      el.simulate('click')
      expect(wrapper.state().isOpen).toBe(false)
    })

    test('Changes open/close states on click', async () => {
      const wrapper = shallow(
        <Pop triggerOn="click">
          <Pop.Reference />
        </Pop>
      )
      const el = wrapper.find(cx.node)

      el.simulate('click')
      await timeout()
      expect(wrapper.state().isOpen).toBe(true)

      el.simulate('click')
      await timeout()
      expect(wrapper.state().isOpen).toBe(false)
    })

    test('Fires onOpen/onClose on click', async () => {
      const spyOpen = jest.fn()
      const spyClose = jest.fn()
      const wrapper = shallow(
        <Pop triggerOn="click" onOpen={spyOpen} onClose={spyClose}>
          <Pop.Reference />
        </Pop>
      )
      const el = wrapper.find(cx.node)

      el.simulate('click')
      await timeout()
      expect(spyOpen).toHaveBeenCalled()

      el.simulate('click')
      await timeout()
      expect(spyClose).toHaveBeenCalled()
    })
  })

  describe('Closing mechanisms', () => {
    test('Closes on block click, if defined', async () => {
      const spy = jest.fn()
      const wrapper = mount(
        <Pop closeOnBodyClick onClose={spy}>
          <Pop.Reference />
        </Pop>
      )

      wrapper.instance().handleOnBodyClick({
        target: document.body,
      })

      await timeout()

      expect(spy).toHaveBeenCalled()
    })

    test('Does not close on block click, if defined', () => {
      const spy = jest.fn()
      const wrapper = mount(
        <Pop closeOnBodyClick={false} onClose={spy}>
          <Pop.Reference />
        </Pop>
      )

      wrapper.instance().handleOnBodyClick({
        target: document.body,
      })

      expect(spy).not.toHaveBeenCalled()
    })

    test('Does not close on block click, if target is referenceNode', () => {
      const spy = jest.fn()
      const wrapper = mount(
        <Pop closeOnBodyClick onClose={spy}>
          <Pop.Reference />
        </Pop>
      )

      wrapper.instance().handleOnBodyClick({
        target: wrapper.instance().node,
      })

      expect(spy).not.toHaveBeenCalled()
    })

    test('Closes on ESC press, if defined', async () => {
      const spy = jest.fn()
      const wrapper = mount(<Pop closeOnEscPress onClose={spy} />)

      wrapper.instance().handleOnEsc()

      await timeout()

      expect(spy).toHaveBeenCalled()
    })

    test('Does not closes on ESC press, if defined', () => {
      const spy = jest.fn()
      const wrapper = mount(<Pop closeOnEscPress={false} onClose={spy} />)

      wrapper.instance().handleOnEsc()

      expect(spy).not.toHaveBeenCalled()
    })
  })
})
