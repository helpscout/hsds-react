import React from 'react'
import Frame from 'react-frame-component'
import { mount } from 'enzyme'
import { Portal } from './Portal'

const cleanUp = () => {
  global.document.body.innerHTML = ''
}

describe('Portal', () => {
  jest.useFakeTimers()

  afterEach(() => {
    cleanUp()
  })

  describe('Renders', () => {
    test('Renders at the body on mount', () => {
      const preMountNodeCount = document.body.childNodes.length
      mount(
        <Portal>
          <div className="brick">BRICK</div>
        </Portal>
      )
      const portal = document.body.childNodes[0]
      const el = portal.getElementsByClassName('brick')[0]

      expect(document.body.childNodes.length).toBe(preMountNodeCount + 1)
      expect(el).toBeTruthy()
      expect(el.innerHTML).toBe('BRICK')
    })

    test('Is removed from the body on unmount', () => {
      const wrapper = mount(
        <Portal>
          <div className="brick">BRICK</div>
        </Portal>
      )

      wrapper.unmount()
      jest.runAllTimers()

      expect(document.getElementsByClassName('brick').length).toBe(0)
    })

    test('Can add custom className', () => {
      mount(
        <Portal className="champ">
          <div className="brick">BRICK</div>
        </Portal>
      )

      expect(document.getElementsByClassName('champ').length).toBe(1)
    })

    test('Can add custom ID', () => {
      const wrapper = mount(
        <Portal id="champ">
          <div className="brick">BRICK</div>
        </Portal>
      )

      expect(document.getElementById('champ')).toBeTruthy()
      cleanUp(wrapper)
    })
  })

  describe('renderTo', () => {
    test('Can render to custom selector, if specified', () => {
      const testBody = global.document.createElement('div')
      global.document.body.appendChild(testBody)

      const wrapper = mount(
        <div className="channel4">
          <div className="custom" />
          <Portal id="champ" renderTo=".custom">
            <div className="brick">BRICK</div>
          </Portal>
        </div>,
        { attachTo: testBody }
      )

      const custom = wrapper.find('.custom').html()

      expect(custom).toContain('id')
      expect(custom).toContain('champ')
      expect(custom).toContain('BRICK')
    })

    test('Can render to custom DOM element, if specified', () => {
      const testBody = global.document.createElement('div')
      global.document.body.appendChild(testBody)

      mount(
        <div className="channel4">
          <div className="custom" />
          <Portal id="champ" renderTo={global.document.body}>
            <div className="brick">BRICK</div>
          </Portal>
        </div>,
        { attachTo: testBody }
      )

      const body = global.document.body.innerHTML

      expect(body).toContain('id')
      expect(body).toContain('champ')
      expect(body).toContain('BRICK')
    })

    test('Can render to Portal.Container, if exists', () => {
      const testBody = global.document.createElement('div')
      global.document.body.appendChild(testBody)

      const wrapper = mount(
        <div className="channel4">
          <Portal id="champ">
            <div className="brick">BRICK</div>
          </Portal>
          <p>Content</p>
          <div className="channel4-inner">
            <Portal.Container />
          </div>
        </div>,
        { attachTo: testBody }
      )

      const custom = wrapper.find(Portal.Container).html()

      expect(custom).toContain('id')
      expect(custom).toContain('champ')
      expect(custom).toContain('BRICK')
    })

    test("Fallsback to document.body if custom selector doesn't exist", () => {
      const testBody = global.document.createElement('div')
      global.document.body.appendChild(testBody)

      const nodeCount = global.document.body.childNodes.length

      const wrapper = mount(
        <div className="channel4">
          <div className="custom" />
          <Portal id="champ" renderTo=".nope">
            <div className="brick">BRICK</div>
          </Portal>
        </div>,
        { attachTo: testBody }
      )

      const custom = wrapper.find('.custom').html()
      const postMountNodeCount = global.document.body.childNodes.length
      const portal = global.document.body.childNodes[1]

      expect(custom).not.toContain('BRICK')
      expect(nodeCount).toBe(postMountNodeCount - 1)
      expect(portal).toBeTruthy()
      expect(portal.innerHTML).toContain('BRICK')
    })
  })

  describe('Events', () => {
    test('onBeforeOpen callback works', () => {
      const mockCallback = jest.fn()
      const onBeforeOpen = open => {
        open()
        mockCallback()
      }
      mount(
        <Portal onBeforeOpen={onBeforeOpen} isOpen>
          <div className="brick">BRICK</div>
        </Portal>
      )

      expect(mockCallback.mock.calls.length).toBe(1)
    })

    test('onOpen callback works', () => {
      const mockCallback = jest.fn()
      mount(
        <Portal onOpen={mockCallback} isOpen>
          <div className="brick">BRICK</div>
        </Portal>
      )

      expect(mockCallback.mock.calls.length).toBe(1)
    })

    test('onBeforeOpen + onOpen callback works', () => {
      const mockCallback = jest.fn()
      const onBeforeOpen = open => {
        open()
        mockCallback()
      }
      mount(
        <Portal onBeforeOpen={onBeforeOpen} onOpen={mockCallback} isOpen>
          <div className="brick">BRICK</div>
        </Portal>
      )

      expect(mockCallback.mock.calls.length).toBe(2)
    })

    test('onBeforeClose callback works', () => {
      const testBody = global.document.createElement('div')
      global.document.body.appendChild(testBody)

      const mockCallback = jest.fn()
      const onBeforeClose = close => {
        close()
        mockCallback()
      }

      const wrapper = mount(
        <Portal onBeforeClose={onBeforeClose} isOpen>
          <div className="brick">BRICK</div>
        </Portal>,
        { attachTo: testBody }
      )

      wrapper.unmount()
      jest.runAllTimers()

      expect(mockCallback.mock.calls.length).toBe(1)
    })

    test('onClose callback works', () => {
      const testBody = global.document.createElement('div')
      global.document.body.appendChild(testBody)
      const mockCallback = jest.fn()

      const wrapper = mount(
        <Portal onClose={mockCallback} isOpen>
          <div className="brick">BRICK</div>
        </Portal>,
        { attachTo: testBody }
      )

      wrapper.unmount()

      jest.runAllTimers()
      expect(mockCallback.mock.calls.length).toBe(1)
    })

    test('onBeforeClose + onClose callback works', () => {
      const testBody = global.document.createElement('div')
      global.document.body.appendChild(testBody)

      const mockCallback = jest.fn()
      const onBeforeClose = close => {
        close()
        mockCallback()
      }

      const wrapper = mount(
        <Portal onBeforeClose={onBeforeClose} onClose={mockCallback} isOpen>
          <div className="brick">BRICK</div>
        </Portal>,
        { attachTo: testBody }
      )

      wrapper.unmount()
      jest.runAllTimers()

      expect(mockCallback.mock.calls.length).toBe(2)
      wrapper.detach()
    })
  })

  describe('iFrame', () => {
    test('Renders content within an iFrame, not global document', () => {
      mount(
        <Frame>
          <Portal>
            <div>Derek</div>
          </Portal>
        </Frame>
      )

      expect(document.body.innerHTML).not.toContain('Derek')
    })
  })

  describe('Updates', () => {
    test('Attempts to (re)mountPortal if props change', () => {
      const spy = jest.fn()
      const wrapper = mount(<Portal />)
      wrapper.instance().mountPortal = spy

      wrapper.setProps({ in: true })

      expect(spy).toHaveBeenCalled()
    })

    test('Does not (re)render content if mountSelector is falsy', () => {
      const spy = jest.fn()
      const wrapper = mount(<Portal />)
      wrapper.setState({ mountSelector: undefined })

      wrapper.instance().renderPortalContent = spy

      wrapper.setProps({ in: true })

      expect(spy).not.toHaveBeenCalled()
    })
  })
})
