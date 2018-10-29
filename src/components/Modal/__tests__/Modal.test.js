import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router'
import { default as Modal, ModalComponent } from '../Modal'
import { Card, Portal, Overlay, Scrollable } from '../../index'
import Keys from '../../../constants/Keys'

const trigger = <a className="trigger">Trigger</a>

jest.useFakeTimers()

beforeEach(() => {
  window.BluePortalWrapperGlobalManager = undefined
  document.body.innerHTML = ''
})

afterEach(() => {
  document.body.innerHTML = ''
})

const simulateKeyPress = (keyCode, eventType = 'keyup', modifier) => {
  const event = new Event(eventType)
  event.keyCode = keyCode
  if (modifier) {
    event[modifier] = true
  }

  document.dispatchEvent(event)
}

describe('Trigger', () => {
  test('Can render', () => {
    const wrapper = mount(<Modal isOpen trigger={trigger} />)
    const el = wrapper.find('.trigger')

    expect(el.exists()).toBeTruthy()
    expect(el.text()).toBe('Trigger')
  })

  test('Automatically receives click event', () => {
    const wrapper = mount(<Modal isOpen trigger={trigger} />)
    const el = wrapper.find('.trigger')

    expect(el.prop('onClick')).toBeInstanceOf(Function)
  })
})

describe('Key events', () => {
  test('Closes modal when ESCAPE is pressed', () => {
    mount(
      <Modal isOpen trigger={trigger}>
        <div className="TestContent">Hello</div>
      </Modal>
    )

    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]
    const o = document.querySelectorAll('.TestContent')

    expect(modal).toBeTruthy()
    expect(o.length).toBeTruthy()

    simulateKeyPress(Keys.ESCAPE)

    jest.runAllTimers()

    expect(document.querySelectorAll('.TestContent').length).toBe(0)
  })
})

describe('CloseIcon', () => {
  test('Does not render closeIcon if specified', () => {
    const wrapper = mount(<Modal isOpen trigger={trigger} closeIcon={false} />)

    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]
    const closeIcon = modal.getElementsByClassName('c-Modal__close')

    expect(modal).toBeTruthy()
    expect(closeIcon.length).toBeFalsy()
    wrapper.unmount()
  })

  test('Adjusts CloseButton position on mount', () => {
    const wrapper = mount(
      <ModalComponent isOpen>
        <Modal.Body />
      </ModalComponent>
    )
    const o = wrapper.find('.c-Modal__close')

    expect(o.html()).toContain('right:')
  })

  test('Repositions on window.resize', () => {
    const wrapper = mount(
      <ModalComponent isOpen>
        <Modal.Body />
      </ModalComponent>
    )
    const spy = jest.spyOn(wrapper.instance(), 'positionCloseNode')

    global.dispatchEvent(new Event('resize'))

    expect(spy).toHaveBeenCalled()
  })
})

describe('Portal', () => {
  test('Does not render Modal next to trigger', () => {
    const wrapper = mount(<Modal isOpen trigger={trigger} />)
    const modal = wrapper.find('.c-Modal')

    expect(modal.exists()).toBeFalsy()
    wrapper.unmount()
  })

  test('Renders at the body', () => {
    mount(<Modal isOpen trigger={trigger} />)

    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()
    expect(document.body.childNodes.length).toBe(1)
  })

  test('Does not render by default', () => {
    mount(<Modal trigger={trigger} />)

    expect(document.body.childNodes.length).toBe(0)
  })
})

describe('Route', () => {
  test('Automatically opens when a route path is defined', () => {
    const testBody = global.document.createElement('div')
    global.document.body.appendChild(testBody)

    const wrapper = mount(
      <Router initialEntries={['/']}>
        <div>
          <Modal exact path="/" />
          <Portal.Container />
        </div>
      </Router>,
      { attachTo: testBody }
    )

    const modal = global.document.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    wrapper.detach()
  })

  test('Automatically opens when a route path changes', () => {
    const testBody = global.document.createElement('div')
    global.document.body.appendChild(testBody)

    const wrapper = mount(
      <Router initialEntries={['/new', '/']} initialIndex={1}>
        <div>
          <Modal exact path="/new" />
          <Portal.Container />
        </div>
      </Router>,
      { attachTo: testBody }
    )

    wrapper.getNode().history.goBack()
    const modal = global.document.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    wrapper.detach()
  })

  test('Does not open when a route path is defined, but not active', () => {
    const testBody = global.document.createElement('div')
    global.document.body.appendChild(testBody)

    const wrapper = mount(
      <Router initialEntries={['/path']}>
        <div>
          <Modal exact path="/" />
          <Portal.Container />
        </div>
      </Router>,
      { attachTo: testBody }
    )

    const modal = global.document.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeFalsy()

    wrapper.detach()
  })
})

describe('Style', () => {
  test('Can render extra styles', () => {
    const style = { background: 'red' }
    mount(<Modal isOpen trigger={trigger} closeIcon={false} style={style} />)

    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    const html = modal.outerHTML

    expect(html).toContain('background')
    expect(html).toContain('red')
  })

  test('Can render extra styles + zIndex', () => {
    const style = { background: 'red' }
    mount(
      <Modal
        isOpen
        trigger={trigger}
        closeIcon={false}
        style={style}
        zIndex={2000}
      />
    )

    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    const html = modal.outerHTML

    expect(html).toContain('background')
    expect(html).toContain('red')
    expect(html).toContain('z-index')
    expect(html).toContain('2000')
  })

  test('Can render zIndex, without style prop', () => {
    mount(<Modal isOpen trigger={trigger} closeIcon={false} zIndex={2000} />)

    const portal = document.body.childNodes[0]
    const modal = portal.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    const html = modal.outerHTML

    expect(html).toContain('z-index')
    expect(html).toContain('2000')
  })
})

describe('PortalWrapper', () => {
  test('onBeforeClose callback works', () => {
    const testBody = global.document.createElement('div')
    global.document.body.appendChild(testBody)

    const mockCallback = jest.fn()
    const onBeforeClose = close => {
      close()
      mockCallback()
    }

    const wrapper = mount(<Modal onBeforeClose={onBeforeClose} isOpen />, {
      attachTo: testBody,
    })

    wrapper.unmount()
    jest.runAllTimers()

    expect(mockCallback.mock.calls.length).toBe(1)
    wrapper.detach()
  })
})

describe('Seamless', () => {
  test('Should not be seamless by default', () => {
    const wrapper = mount(
      <ModalComponent>
        <div className="ron">RON</div>
      </ModalComponent>
    )
    const o = wrapper.find(Card)

    expect(o.length).toBe(1)
  })

  test('Does not render the Card component, if seamless', () => {
    const wrapper = mount(
      <ModalComponent seamless>
        <Modal.Content>
          <div className="ron">RON</div>
        </Modal.Content>
      </ModalComponent>
    )
    const card = wrapper.find(Card)
    const o = wrapper.find('.ron')

    expect(card.length).toBe(0)
    expect(o.length).toBe(1)
  })
})

describe('wrapperClassName', () => {
  test('Adds default wrapperClassName', () => {
    mount(<Modal isOpen trigger={trigger} />)

    const o = document.body.childNodes[0]
    expect(o.className).toContain('c-ModalWrapper')
  })

  test('Can customize wrapperClassName', () => {
    mount(<Modal isOpen trigger={trigger} wrapperClassName="ron" />)

    const o = document.body.childNodes[0]
    expect(o.className).toContain('ron')
    expect(o.className).toContain('c-ModalWrapper')
  })
})

describe('cardClassName', () => {
  test('Can customize the Card className', () => {
    const wrapper = mount(<ModalComponent cardClassName="mugatu" />)
    const o = wrapper.find(Card)
    const m = wrapper.find('.mugatu')

    expect(o.hasClass('mugatu')).toBeTruthy()
    expect(o.hasClass('c-Modal__Card')).toBeTruthy()
    expect(m.length).toBe(1)
  })

  test('Does not add custom className to seamless Modals', () => {
    const wrapper = mount(<ModalComponent cardClassName="mugatu" seamless />)
    const o = wrapper.find('.mugatu')

    expect(o.length).toBe(0)
  })
})

describe('overlayClassName', () => {
  test('Can customize the Overlay className', () => {
    const wrapper = mount(<ModalComponent overlayClassName="mugatu" />)
    const o = wrapper.find(Overlay)

    expect(o.hasClass('c-Modal__Overlay')).toBeTruthy()
    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Header', () => {
  test('Does not render a Modal.Header by default', () => {
    const wrapper = mount(
      <ModalComponent>
        <Modal.Body>
          <div className="ron">Burgandy</div>
        </Modal.Body>
      </ModalComponent>
    )
    const o = wrapper.find(Modal.Header)

    expect(o.length).toBe(0)
  })

  test('Renders the Modal.Header within a Card', () => {
    const wrapper = mount(
      <ModalComponent>
        <Modal.Header />
        <div className="ron">Burgandy</div>
      </ModalComponent>
    )
    const o = wrapper.find(Card).find(Modal.Header)
    const bodyHeader = wrapper.find(Modal.Body).find(Modal.Header)

    expect(o.length).toBe(1)
    expect(bodyHeader.length).toBe(0)
  })
})

describe('Footer', () => {
  test('Does not render a Modal.Footer by default', () => {
    const wrapper = mount(
      <ModalComponent>
        <Modal.Body>
          <div className="ron">Burgandy</div>
        </Modal.Body>
      </ModalComponent>
    )
    const o = wrapper.find(Modal.Footer)

    expect(o.length).toBe(0)
  })

  test('Renders the Modal.Footer within a Card', () => {
    const wrapper = mount(
      <ModalComponent>
        <Modal.Footer />
        <div className="ron">Burgandy</div>
      </ModalComponent>
    )
    const o = wrapper.find(Card).find(Modal.Footer)
    const bodyFooter = wrapper.find(Modal.Body).find(Modal.Footer)

    expect(o.length).toBe(1)
    expect(bodyFooter.length).toBe(0)
  })
})

describe('Body', () => {
  test('Can parse plain-text', () => {
    const wrapper = mount(
      <ModalComponent>
        <Modal.Body>Ron</Modal.Body>
      </ModalComponent>
    )
    const body = wrapper.find(Modal.Body)

    expect(body.length).toBe(1)
    expect(body.html()).toContain('Ron')
  })

  test('Can render Modal.Body without children content', () => {
    const wrapper = mount(
      <ModalComponent>
        <Modal.Body />
      </ModalComponent>
    )
    const body = wrapper.find(Modal.Body)

    expect(body.length).toBe(1)
  })

  test('Can render Modal.Body without number content', () => {
    const wrapper = mount(
      <ModalComponent>
        <Modal.Body>1</Modal.Body>
      </ModalComponent>
    )
    const body = wrapper.find(Modal.Body)

    expect(body.length).toBe(1)
  })

  test('Can render a Modal.Body', () => {
    const wrapper = mount(
      <ModalComponent>
        <Modal.Body>
          <div className="ron">Burgandy</div>
        </Modal.Body>
      </ModalComponent>
    )
    const body = wrapper.find(Modal.Body)
    const div = body.find('.ron')

    expect(body.length).toBe(1)
    expect(div.length).toBe(1)
    expect(div.html()).toContain('Burgandy')
  })

  test('Renders Modal.Body within Card, by default', () => {
    const wrapper = mount(
      <ModalComponent>
        <Modal.Body>
          <div className="ron">Burgandy</div>
        </Modal.Body>
      </ModalComponent>
    )
    const card = wrapper.find(Card)
    const body = card.find(Modal.Body)
    const div = body.find('.ron')

    expect(card.length).toBe(1)
    expect(body.length).toBe(1)
    expect(div.length).toBe(1)
    expect(div.html()).toContain('Burgandy')
  })

  test('Renders content within a Scrollable, within Modal.Body, by default', () => {
    const wrapper = mount(
      <ModalComponent>
        <Modal.Body>
          <div className="ron">Burgandy</div>
        </Modal.Body>
      </ModalComponent>
    )
    const card = wrapper.find(Card)
    const body = card.find(Modal.Body)
    const scrollable = body.find(Scrollable)
    const div = scrollable.find('.ron')

    expect(card.length).toBe(1)
    expect(body.length).toBe(1)
    expect(scrollable.length).toBe(1)
    expect(div.length).toBe(1)
    expect(div.html()).toContain('Burgandy')
  })
})

describe('Content', () => {
  test('Does not set the scrollableNode if Modal.Body is absent', () => {
    const wrapper = mount(
      <ModalComponent>
        <Modal.Content>Ron</Modal.Content>
      </ModalComponent>
    )

    const o = wrapper.instance()

    expect(o.scrollableNode).not.toBeTruthy()
  })

  test('Can set the scrollNode from a Body nested within a Content', () => {
    const wrapper = mount(
      <ModalComponent>
        <Modal.Content>
          <Modal.Body>Ron</Modal.Body>
        </Modal.Content>
      </ModalComponent>
    )

    const o = wrapper.instance()

    expect(o.scrollableNode).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render non-sub component children', () => {
    const wrapper = mount(
      <ModalComponent>
        <div className="ron">Test</div>
      </ModalComponent>
    )
    const o = wrapper.find('.ron')

    expect(o.length).toBe(1)
  })

  test('Can render wrapper-like child components', () => {
    const WrapperComponent = props => {
      return <Modal.Content>{props.children}</Modal.Content>
    }

    const wrapper = mount(
      <ModalComponent>
        <WrapperComponent>
          <div className="ron">Test</div>
        </WrapperComponent>
      </ModalComponent>
    )
    const o = wrapper.find('.ron')

    expect(o.length).toBe(1)
  })

  test('Can handle null content', () => {
    const wrapper = mount(<ModalComponent>{[null]}</ModalComponent>)

    expect(wrapper).toBeTruthy()
  })
})

describe('isOpen', () => {
  test('Can open wrapped component with isOpen prop change to true', () => {
    const wrapper = mount(<Modal />)

    const o = document.body.childNodes[0]
    expect(o).not.toBeTruthy()

    wrapper.setProps({ isOpen: true })
    jest.runAllTimers()

    const o2 = document.body.childNodes[0]
    expect(o2).toBeTruthy()
  })

  test('Can close wrapped component with isOpen prop change to false', () => {
    const wrapper = mount(<Modal isOpen timeout={0} />)

    wrapper.setProps({ isOpen: false })
    jest.runAllTimers()

    const o = document.body.childNodes[0]
    expect(o).not.toBeTruthy()
  })
})

describe('modalAnimation', () => {
  test('modalAnimationDelay can be passed to Animate component', () => {
    const wrapper = mount(<ModalComponent modalAnimationDelay={66} />)
    const o = wrapper
      .find('Animate')
      .filterWhere(node => node.hasClass('c-Modal__Card-container'))
      .last()

    expect(o.prop('delay')).toBe(66)
  })

  test('modalAnimationDuration can be passed to Animate component', () => {
    const wrapper = mount(<ModalComponent modalAnimationDuration={66} />)
    const o = wrapper
      .find('Animate')
      .filterWhere(node => node.hasClass('c-Modal__Card-container'))
      .last()

    expect(o.prop('duration')).toBe(66)
  })

  test('modalAnimationEasing can be passed to Animate component', () => {
    const wrapper = mount(<ModalComponent modalAnimationEasing="fakeBounce" />)
    const o = wrapper
      .find('Animate')
      .filterWhere(node => node.hasClass('c-Modal__Card-container'))
      .last()

    expect(o.prop('easing')).toBe('fakeBounce')
  })
})

describe('Keyboard: Tab', () => {
  test('handleOnTab fires if Tab is pressed', () => {
    const wrapper = mount(<ModalComponent isOpen />)
    const spy = jest.spyOn(wrapper.instance(), 'handleOnTab')
    wrapper.instance().forceUpdate()

    simulateKeyPress(Keys.TAB, 'keydown')

    expect(spy).toHaveBeenCalled()
  })

  test('prevents tab from focusing next node, if current node is last focusable node', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ModalComponent isOpen>
        <button className="one">one</button>
        <button className="two">two</button>
        <button className="three">three</button>
      </ModalComponent>
    )
    const o = wrapper.find('.three').getNode()

    wrapper.instance().handleOnTab({
      target: o,
      preventDefault: spy,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('pressing tab on non-last focusable child nodes does not preventDefault', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ModalComponent isOpen>
        <button className="one">one</button>
        <button className="two">two</button>
        <button className="three">three</button>
      </ModalComponent>
    )
    const o = wrapper.find('.two').getNode()

    wrapper.instance().handleOnTab({
      target: o,
      preventDefault: spy,
    })

    expect(spy).not.toHaveBeenCalled()
  })

  test('handleOnShiftTab fires if Tab + shift is pressed', () => {
    const wrapper = mount(<ModalComponent isOpen />)
    const spy = jest.spyOn(wrapper.instance(), 'handleOnShiftTab')
    wrapper.instance().forceUpdate()

    simulateKeyPress(Keys.TAB, 'keydown', 'shiftKey')

    expect(spy).toHaveBeenCalled()
  })

  test('prevents shift and tab from focusing prev node, if current node is first focusable node', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ModalComponent isOpen>
        <button className="one">one</button>
        <button className="two">two</button>
        <button className="three">three</button>
      </ModalComponent>
    )
    const o = wrapper.find('.c-CloseButton').getNode()

    wrapper.instance().handleOnShiftTab({
      target: o,
      preventDefault: spy,
    })

    expect(spy).toHaveBeenCalled()
  })

  test('pressing tab on non-first focusable child nodes does not preventDefault', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ModalComponent isOpen>
        <button className="one">one</button>
        <button className="two">two</button>
        <button className="three">three</button>
      </ModalComponent>
    )
    const o = wrapper.find('.two').getNode()

    wrapper.instance().handleOnShiftTab({
      target: o,
      preventDefault: spy,
    })

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('Card: Focus', () => {
  test('Autofocuses card on mount', () => {
    const spy = jest.fn()
    const wrapper = mount(<ModalComponent />)
    const o = wrapper.instance().cardNode
    o.onfocus = spy
    wrapper.setProps({ isOpen: true })

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
  })
})
