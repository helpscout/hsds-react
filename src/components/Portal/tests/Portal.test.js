import React from 'react'
import { mount } from 'enzyme'
import Portal from '..'

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
const PORTAL_TEST_TIMEOUT = 300

const cleanUp = wrapper => {
  if (wrapper) wrapper.unmount()
  global.document.body.innerHTML = ''
}

describe('Renders', () => {
  test('Renders at the body on mount', () => {
    const preMountNodeCount = document.body.childNodes.length
    const wrapper = mount(
      <Portal>
        <div className="brick">BRICK</div>
      </Portal>
    )
    const portal = document.body.childNodes[0]
    const el = portal.getElementsByClassName('brick')[0]

    expect(document.body.childNodes.length).toBe(preMountNodeCount + 1)
    expect(el).toBeTruthy()
    expect(el.innerHTML).toBe('BRICK')

    cleanUp(wrapper)
  })

  test('Is removed from the body on unmount', done => {
    const wrapper = mount(
      <Portal>
        <div className="brick">BRICK</div>
      </Portal>
    )

    wrapper.unmount()

    setTimeout(() => {
      expect(document.getElementsByClassName('brick').length).toBe(0)
      cleanUp()
      done()
    }, PORTAL_TEST_TIMEOUT)
  })

  test('Can add custom className', () => {
    const wrapper = mount(
      <Portal className="champ">
        <div className="brick">BRICK</div>
      </Portal>
    )

    expect(document.getElementsByClassName('champ').length).toBe(1)

    cleanUp(wrapper)
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

    wrapper.unmount()
    wrapper.detach()
    cleanUp()
  })

  test('Can render to custom DOM element, if specified', () => {
    const testBody = global.document.createElement('div')
    global.document.body.appendChild(testBody)

    const wrapper = mount(
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

    wrapper.unmount()
    wrapper.detach()
    cleanUp()
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

    wrapper.unmount()
    wrapper.detach()
    cleanUp()
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

    wrapper.unmount()
    wrapper.detach()
    cleanUp()
  })
})

describe('Events', () => {
  test('onBeforeOpen callback works', () => {
    const mockCallback = jest.fn()
    const onBeforeOpen = open => {
      open()
      mockCallback()
    }
    const wrapper = mount(
      <Portal onBeforeOpen={onBeforeOpen} isOpen>
        <div className="brick">BRICK</div>
      </Portal>
    )

    expect(mockCallback.mock.calls.length).toBe(1)

    cleanUp(wrapper)
  })

  test('onOpen callback works', () => {
    const mockCallback = jest.fn()
    const wrapper = mount(
      <Portal onOpen={mockCallback} isOpen>
        <div className="brick">BRICK</div>
      </Portal>
    )

    expect(mockCallback.mock.calls.length).toBe(1)

    cleanUp(wrapper)
  })

  test('onBeforeOpen + onOpen callback works', () => {
    const mockCallback = jest.fn()
    const onBeforeOpen = open => {
      open()
      mockCallback()
    }
    const wrapper = mount(
      <Portal onBeforeOpen={onBeforeOpen} onOpen={mockCallback} isOpen>
        <div className="brick">BRICK</div>
      </Portal>
    )

    expect(mockCallback.mock.calls.length).toBe(2)

    cleanUp(wrapper)
  })

  test('onBeforeClose callback works', done => {
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

    setTimeout(() => {
      expect(mockCallback.mock.calls.length).toBe(1)
      cleanUp()
      wrapper.detach()
      done()
    }, PORTAL_TEST_TIMEOUT)
  })

  test('onClose callback works', done => {
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

    setTimeout(() => {
      expect(mockCallback.mock.calls.length).toBe(1)
      cleanUp()
      wrapper.detach()
      done()
    }, PORTAL_TEST_TIMEOUT)
  })

  test('onBeforeClose + onClose callback works', done => {
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

    setTimeout(() => {
      expect(mockCallback.mock.calls.length).toBe(2)
      wrapper.detach()
      cleanUp()
      done()
    }, PORTAL_TEST_TIMEOUT)
  })
})
