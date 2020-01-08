import React from 'react'
import { mount, shallow } from 'enzyme'
import Pop from '../Pop'
import Keys from '../../../constants/Keys'

jest.mock('../Pop.Portal', () => {
  const Portal = ({ children }) => <div>{children}</div>
  return {
    default: Portal,
  }
})

jest.mock('../../Animate', () => {
  const Animate = ({ children }) => <div>{children}</div>
  return {
    default: Animate,
  }
})

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

    test('Changes isOpen (true) state on prop change', async () => {
      const wrapper = shallow(<Pop isOpen={false} />)
      wrapper.setProps({ isOpen: true })

      await timeout()

      expect(wrapper.state().isOpen).toBe(true)
    })

    test('Changes isOpen (false) state on prop change', async () => {
      const wrapper = shallow(<Pop isOpen={true} />)
      wrapper.setProps({ isOpen: false })

      await timeout()

      expect(wrapper.state().isOpen).toBe(false)
    })

    test('Does not changes isOpen state on unrelated prop change', () => {
      const wrapper = shallow(<Pop />)
      wrapper.setProps({ nope: true })

      expect(wrapper.state().isOpen).toBe(false)
    })

    test('Fires onOpen/onClose on prop change', async () => {
      const spyOpen = jest.fn()
      const spyClose = jest.fn()
      const wrapper = shallow(
        <Pop
          triggerOn="click"
          onOpen={spyOpen}
          onClose={spyClose}
          isOpen={false}
        >
          <Pop.Reference />
        </Pop>
      )

      wrapper.setProps({ isOpen: true })
      await timeout()
      expect(spyOpen).toHaveBeenCalled()

      wrapper.setProps({ isOpen: false })
      await timeout()
      expect(spyClose).toHaveBeenCalled()
    })

    test('Fires onBeforeOpen promise + open on initial open', async () => {
      const spyOpen = jest.fn()
      const spyOnBeforeOpen = jest.fn()

      const onBeforeOpen = () => {
        spyOnBeforeOpen()
        return Promise.resolve()
      }

      const wrapper = shallow(
        <Pop onOpen={spyOpen} onBeforeOpen={onBeforeOpen} isOpen={true}>
          <Pop.Reference />
        </Pop>
      )

      wrapper.setProps({ isOpen: true })
      expect(spyOnBeforeOpen).toHaveBeenCalled()
      await timeout()
      expect(spyOpen).toHaveBeenCalled()
    })

    test('Fires onBeforeOpen promise before opening', async () => {
      const spyOpen = jest.fn()
      const spyOnBeforeOpen = jest.fn()

      const onBeforeOpen = () => {
        spyOnBeforeOpen()
        return Promise.resolve()
      }

      const wrapper = shallow(
        <Pop
          triggerOn="click"
          onOpen={spyOpen}
          onBeforeOpen={onBeforeOpen}
          isOpen={false}
        >
          <Pop.Reference />
        </Pop>
      )

      wrapper.setProps({ isOpen: true })
      expect(spyOnBeforeOpen).toHaveBeenCalled()
      await timeout()
      expect(spyOpen).toHaveBeenCalled()
    })

    test('Fires onBeforeClose promise before opening', async () => {
      const spyClose = jest.fn()
      const spyOnBeforeClose = jest.fn()

      const onBeforeClose = () => {
        spyOnBeforeClose()
        return Promise.resolve()
      }

      const wrapper = shallow(
        <Pop
          triggerOn="click"
          onClose={spyClose}
          onBeforeClose={onBeforeClose}
          isOpen={true}
        >
          <Pop.Reference />
        </Pop>
      )

      wrapper.setProps({ isOpen: false })
      expect(spyOnBeforeClose).toHaveBeenCalled()
      await timeout()
      expect(spyClose).toHaveBeenCalled()
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

  describe('Controlled', () => {
    test('Does not fire onOpen/onClose if isOpen remains the same on prop change', async () => {
      const openSpy = jest.fn()
      const closeSpy = jest.fn()
      const wrapper = mount(
        <Pop isOpen={true} onOpen={openSpy} onClose={closeSpy}>
          <Pop.Reference />
          <Pop.Popper>
            {() => <div className="content">Content</div>}
          </Pop.Popper>
        </Pop>
      )

      await timeout()

      expect(openSpy).toHaveBeenCalledTimes(1)
      expect(closeSpy).toHaveBeenCalledTimes(0)

      wrapper.setProps({ isOpen: true, anotherProp: true })

      await timeout()

      expect(openSpy).toHaveBeenCalledTimes(1)
      expect(closeSpy).toHaveBeenCalledTimes(0)
    })

    test('Fires onOpen when isOpen prop changes to true', async () => {
      const openSpy = jest.fn()
      const wrapper = mount(
        <Pop isOpen={false} onOpen={openSpy}>
          <Pop.Reference />
          <Pop.Popper>
            {() => <div className="content">Content</div>}
          </Pop.Popper>
        </Pop>
      )

      await timeout()

      expect(openSpy).toHaveBeenCalledTimes(0)

      wrapper.setProps({ isOpen: true })
      await timeout()

      expect(openSpy).toHaveBeenCalledTimes(1)
    })

    test('Fires onClose when isOpen prop changes to false', async () => {
      const closeSpy = jest.fn()
      const wrapper = mount(
        <Pop isOpen={true} onClose={closeSpy}>
          <Pop.Reference />
          <Pop.Popper>
            {() => <div className="content">Content</div>}
          </Pop.Popper>
        </Pop>
      )

      await timeout()

      expect(closeSpy).toHaveBeenCalledTimes(0)

      wrapper.setProps({ isOpen: false })
      await timeout()

      expect(closeSpy).toHaveBeenCalledTimes(1)
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

    test('Does not close if closeOnMouseLeave is disabled', async () => {
      const wrapper = shallow(
        <Pop triggerOn="hover" closeOnMouseLeave={false}>
          <Pop.Reference />
        </Pop>
      )
      const el = wrapper.find(cx.node)

      el.simulate('mousemove')
      await timeout()
      expect(wrapper.state().isOpen).toBe(true)

      el.simulate('mouseleave')
      await timeout()
      expect(wrapper.state().isOpen).toBe(true)
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

    test('Closes on content (Popper) mouseleave', async () => {
      const closeSpy = jest.fn()
      const wrapper = mount(
        <Pop triggerOn="hover" isOpen={true} onClose={closeSpy}>
          <Pop.Reference />
          <Pop.Popper>
            {() => <div className="content">Content</div>}
          </Pop.Popper>
        </Pop>
      )
      const el = wrapper.find('.c-PopPopperContentWrapper')
      el.simulate('mouseleave')

      await timeout()

      expect(closeSpy).toHaveBeenCalled()
    })

    test('Does not close on content (Popper) mouseleave, if triggerOn is click', async () => {
      const closeSpy = jest.fn()
      const wrapper = mount(
        <Pop triggerOn="click" isOpen={true} onClose={closeSpy}>
          <Pop.Reference />
          <Pop.Popper>
            {() => <div className="content">Content</div>}
          </Pop.Popper>
        </Pop>
      )
      const el = wrapper.find('.c-PopPopperContentWrapper')
      el.simulate('mouseleave')

      await timeout()

      expect(closeSpy).not.toHaveBeenCalled()
    })

    test('Closes on content click, if specified', async () => {
      const closeSpy = jest.fn()
      const wrapper = mount(
        <Pop
          triggerOn="hover"
          isOpen={true}
          onClose={closeSpy}
          closeOnContentClick={true}
        >
          <Pop.Reference />
          <Pop.Popper>
            {() => <div className="content">Content</div>}
          </Pop.Popper>
        </Pop>
      )
      const el = wrapper.find('.c-PopPopper')
      el.simulate('click')

      await timeout()

      expect(closeSpy).toHaveBeenCalled()
    })

    test('Does not close on content click, if specified', async () => {
      const closeSpy = jest.fn()
      const wrapper = mount(
        <Pop
          triggerOn="hover"
          isOpen={true}
          onClose={closeSpy}
          closeOnContentClick={false}
        >
          <Pop.Reference />
          <Pop.Popper>
            {() => <div className="content">Content</div>}
          </Pop.Popper>
        </Pop>
      )
      const el = wrapper.find('.c-PopPopper')
      el.simulate('click')

      await timeout()

      expect(closeSpy).not.toHaveBeenCalled()
    })
  })

  describe('Mouse: Click events', () => {
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

  describe('Keyboard accessibility', () => {
    test('Fires onOpen/onClose on enter press for trigger on click', async () => {
      const nonEvent = {
        keyCode: Keys.KEY_J,
        preventDefault: () => {},
        stopPropagation: () => {},
      }
      const toggleEvent = {
        ...nonEvent,
        keyCode: Keys.ENTER,
      }
      const spyOpen = jest.fn()
      const spyClose = jest.fn()
      const wrapper = shallow(
        <Pop triggerOn="click" onOpen={spyOpen} onClose={spyClose}>
          <Pop.Reference />
        </Pop>
      )
      const el = wrapper.find(cx.node)

      // Random key does not open closed pop
      el.simulate('keyUp', nonEvent)
      await timeout()
      expect(spyOpen).not.toHaveBeenCalled()

      // focus does not open closed pop
      el.simulate('focus')
      await timeout()
      expect(spyOpen).not.toHaveBeenCalled()

      // Enter key opens closed pop
      el.simulate('keyUp', toggleEvent)
      await timeout()
      expect(spyOpen).toHaveBeenCalled()

      // Random key does not close open pop
      el.simulate('keyUp', nonEvent)
      await timeout()
      expect(spyClose).not.toHaveBeenCalled()

      // Enter key closes open pop
      el.simulate('keyUp', toggleEvent)
      await timeout()
      expect(spyClose).toHaveBeenCalled()
    })

    test('Fires onOpen/onClose on focus/blur for trigger on hover', async () => {
      const spyOpen = jest.fn()
      const spyClose = jest.fn()
      const wrapper = shallow(
        <Pop triggerOn="hover" onOpen={spyOpen} onClose={spyClose}>
          <Pop.Reference />
        </Pop>
      )
      const el = wrapper.find(cx.node)

      // onClose does not get called when closed pop is blurred
      el.simulate('blur')
      await timeout()
      expect(spyOpen).not.toHaveBeenCalled()

      // focus opens closed pop
      el.simulate('focus')
      await timeout()
      expect(spyOpen).toHaveBeenCalled()

      // blur closes open pop
      el.simulate('blur')
      await timeout()
      expect(spyClose).toHaveBeenCalled()
    })
  })

  describe('Closing mechanisms', () => {
    test('Closes on block click, if defined', async () => {
      const spy = jest.fn()
      const wrapper = mount(
        <Pop closeOnBodyClick isOpen onClose={spy}>
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
        <Pop closeOnBodyClick={false} isOpen onClose={spy}>
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
  })
})
