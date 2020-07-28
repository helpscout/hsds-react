import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router'
import { default as Modal, ModalComponent } from '../Modal'
import { Card, Portal, Overlay, Scrollable } from '../../index'
import Keys from '../../../constants/Keys'
import { MODAL_KIND } from '../Modal.utils'

const trigger = <a className="trigger">Trigger</a>

jest.useFakeTimers()

beforeEach(() => {
  window.HSDSPortalWrapperGlobalManager = undefined
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

    const modal = document.getElementsByClassName('c-Modal')[0]
    const o = document.querySelectorAll('.TestContent')

    expect(modal).toBeTruthy()
    expect(o.length).toBeTruthy()

    // simulateKeyPress(Keys.ESCAPE)
    // This breaks Enzyme 3 + JSDom

    // jest.runAllTimers()

    // expect(document.querySelectorAll('.TestContent').length).toBe(0)
  })
})

describe('CloseIcon', () => {
  test('Does not render closeIcon if specified', () => {
    const wrapper = mount(<Modal isOpen trigger={trigger} closeIcon={false} />)

    const modal = document.getElementsByClassName('c-Modal')[0]
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

    jest.runAllTimers()

    const o = wrapper.find('div.c-Modal__close').first()

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

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
  })
})

describe('Portal', () => {
  test('Renders at the body', () => {
    mount(<Modal isOpen trigger={trigger} />)

    const modal = document.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()
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

    wrapper.instance().history.goBack()
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

    const modal = document.getElementsByClassName('c-Modal')[0]

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

    const modal = document.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    const html = modal.outerHTML

    expect(html).toContain('background')
    expect(html).toContain('red')
    expect(html).toContain('z-index')
    expect(html).toContain('2000')
  })

  test('Can render zIndex, without style prop', () => {
    mount(<Modal isOpen trigger={trigger} closeIcon={false} zIndex={2000} />)

    const modal = document.getElementsByClassName('c-Modal')[0]

    expect(modal).toBeTruthy()

    const html = modal.outerHTML

    expect(html).toContain('z-index')
    expect(html).toContain('2000')
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

    expect(document.querySelector('.c-ModalWrapper')).toBeTruthy()
  })

  test('Can customize wrapperClassName', () => {
    mount(<Modal isOpen trigger={trigger} wrapperClassName="ron" />)

    expect(document.querySelector('.c-ModalWrapper')).toBeTruthy()
    expect(document.querySelector('.ron')).toBeTruthy()
  })
})

describe('cardClassName', () => {
  test('Can customize the Card className', () => {
    const wrapper = mount(<ModalComponent cardClassName="mugatu" />)
    const o = wrapper.find(Card).first()
    const m = wrapper.find('.mugatu').first()

    expect(o.hasClass('mugatu')).toBeTruthy()
    expect(o.hasClass('c-Modal__Card')).toBeTruthy()
    expect(m.length).toBe(1)
  })

  test('Does not add custom className to seamless Modals', () => {
    const wrapper = mount(<ModalComponent cardClassName="mugatu" seamless />)
    const o = wrapper.find('.mugatu').first()

    expect(o.length).toBe(0)
  })
})

describe('overlayClassName', () => {
  test('Can customize the Overlay className', () => {
    const wrapper = mount(<ModalComponent overlayClassName="mugatu" />)
    const o = wrapper.find(Overlay).first()

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
    const o = wrapper.find('.three').getDOMNode()

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
    const o = wrapper.find('.two').getDOMNode()

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
    const o = wrapper.find('button.c-CloseButton').getDOMNode()

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
    const o = wrapper.find('.two').getDOMNode()

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

describe('Modal V2', () => {
  test('Renders as default style', () => {
    mount(
      <Modal version={2} title={'Title'} isOpen={true} trigger={trigger}>
        <div className="TestContent">Hello</div>
      </Modal>
    )

    const modal = document.getElementsByClassName('c-Modal')[0]
    const style = document.querySelectorAll('.is-default')
    const content = document.querySelectorAll('.TestContent')
    const header = document.querySelectorAll('.c-ModalHeaderV2')

    expect(modal).toBeTruthy()
    expect(style.length).toBeTruthy()
    expect(content.length).toBeTruthy()
    expect(header.length).toBeTruthy()
  })

  test('Renders as default style w/description', () => {
    mount(
      <Modal
        version={2}
        title={'Title'}
        description={'Description'}
        isOpen={true}
        trigger={trigger}
      >
        <div className="TestContent">Hello</div>
      </Modal>
    )

    const modal = document.getElementsByClassName('c-Modal')[0]
    const style = document.querySelectorAll('.is-default')
    const content = document.querySelectorAll('.TestContent')
    const header = document.querySelectorAll('.c-ModalHeaderV2')

    expect(modal).toBeTruthy()
    expect(style.length).toBeTruthy()
    expect(content.length).toBeTruthy()
    expect(header.length).toBeTruthy()
  })

  test('Renders as branded style', () => {
    mount(
      <Modal
        version={2}
        kind={MODAL_KIND.BRANDED}
        title={'Title'}
        isOpen={true}
        trigger={trigger}
      >
        <div className="TestContent">Hello</div>
      </Modal>
    )

    const modal = document.getElementsByClassName('c-Modal')[0]
    const style = document.querySelectorAll('.is-branded')
    const content = document.querySelectorAll('.TestContent')
    const header = document.querySelectorAll('.c-ModalHeaderV2')

    expect(modal).toBeTruthy()
    expect(style.length).toBeTruthy()
    expect(content.length).toBeTruthy()
    expect(header.length).toBeTruthy()
  })

  test('Renders as branded style w/description', () => {
    mount(
      <Modal
        version={2}
        kind={MODAL_KIND.BRANDED}
        description={'Description'}
        title={'Title'}
        isOpen={true}
        trigger={trigger}
      >
        <div className="TestContent">Hello</div>
      </Modal>
    )

    const modal = document.getElementsByClassName('c-Modal')[0]
    const style = document.querySelectorAll('.is-branded')
    const content = document.querySelectorAll('.TestContent')
    const header = document.querySelectorAll('.c-ModalHeaderV2')

    expect(modal).toBeTruthy()
    expect(style.length).toBeTruthy()
    expect(content.length).toBeTruthy()
    expect(header.length).toBeTruthy()
  })

  test('Renders as alert style', () => {
    mount(
      <Modal
        version={2}
        kind={MODAL_KIND.ALERT}
        title={'Title'}
        isOpen={true}
        trigger={trigger}
      >
        <div className="TestContent">Hello</div>
      </Modal>
    )

    const modal = document.getElementsByClassName('c-Modal')[0]
    const style = document.querySelectorAll('.is-alert')
    const content = document.querySelectorAll('.TestContent')
    const header = document.querySelectorAll('.c-ModalHeaderV2')

    expect(modal).toBeTruthy()
    expect(style.length).toBeTruthy()
    expect(content.length).toBeTruthy()
    expect(header.length).toBeTruthy()
  })

  test('Renders as alert style w/description', () => {
    mount(
      <Modal
        version={2}
        kind={MODAL_KIND.ALERT}
        description={'Description'}
        title={'Title'}
        description={'Description'}
        isOpen={true}
        trigger={trigger}
      >
        <div className="TestContent">Hello</div>
      </Modal>
    )

    const modal = document.getElementsByClassName('c-Modal')[0]
    const style = document.querySelectorAll('.is-alert')
    const content = document.querySelectorAll('.TestContent')
    const header = document.querySelectorAll('.c-ModalHeaderV2')

    expect(modal).toBeTruthy()
    expect(style.length).toBeTruthy()
    expect(content.length).toBeTruthy()
    expect(header.length).toBeTruthy()
  })

  test('Renders as sequence style', () => {
    mount(
      <Modal
        version={2}
        kind={MODAL_KIND.SEQUENCE}
        title={'Title'}
        isOpen={true}
        trigger={trigger}
      >
        <div className="TestContent">Hello</div>
      </Modal>
    )

    const modal = document.getElementsByClassName('c-Modal')[0]
    const style = document.querySelectorAll('.is-sequence')
    const content = document.querySelectorAll('.TestContent')
    const header = document.querySelectorAll('.c-ModalHeaderV2')

    expect(modal).toBeTruthy()
    expect(style.length).toBeTruthy()
    expect(content.length).toBeTruthy()
    expect(header.length).toBeTruthy()
  })

  test('Renders as sequence style w/description', () => {
    mount(
      <Modal
        version={2}
        kind={MODAL_KIND.SEQUENCE}
        title={'Title'}
        description={'Description'}
        isOpen={true}
        trigger={trigger}
      >
        <div className="TestContent">Hello</div>
      </Modal>
    )

    const modal = document.getElementsByClassName('c-Modal')[0]
    const style = document.querySelectorAll('.is-sequence')
    const content = document.querySelectorAll('.TestContent')
    const header = document.querySelectorAll('.c-ModalHeaderV2')

    expect(modal).toBeTruthy()
    expect(style.length).toBeTruthy()
    expect(content.length).toBeTruthy()
    expect(header.length).toBeTruthy()
  })

  test('Renders with danger style', () => {
    mount(
      <Modal
        version={2}
        title={'Title'}
        description={'Description'}
        isOpen={true}
        state={'danger'}
        trigger={trigger}
      >
        <div className="TestContent">Hello</div>
      </Modal>
    )

    const modal = document.getElementsByClassName('c-Modal')[0]
    const style = document.querySelectorAll('.is-danger')
    const content = document.querySelectorAll('.TestContent')
    const header = document.querySelectorAll('.c-ModalHeaderV2')

    expect(modal).toBeTruthy()
    expect(style.length).toBeTruthy()
    expect(content.length).toBeTruthy()
    expect(header.length).toBeTruthy()
  })

  test('Renders with icon if provided', () => {
    mount(
      <Modal
        version={2}
        title={'Title'}
        description={'Description'}
        icon={'alert'}
        isOpen={true}
        state={'danger'}
        trigger={trigger}
      >
        <div className="TestContent">Hello</div>
      </Modal>
    )

    const modal = document.getElementsByClassName('c-Modal')[0]
    const style = document.querySelectorAll('.is-danger')
    const content = document.querySelectorAll('.TestContent')
    const header = document.querySelectorAll('.c-ModalHeaderV2')
    const icon = document.querySelectorAll('.c-Icon')

    expect(modal).toBeTruthy()
    expect(style.length).toBeTruthy()
    expect(content.length).toBeTruthy()
    expect(header.length).toBeTruthy()
    expect(icon.length).toBeTruthy()
  })

  test('Renders with Illo when in Branded style if provided', () => {
    mount(
      <Modal
        version={2}
        title={'Title'}
        kind={MODAL_KIND.BRANDED}
        illo={<div className={'fake-illo'} />}
        illoSize={42}
        isOpen={true}
        trigger={trigger}
      >
        <div className="TestContent">Hello</div>
      </Modal>
    )

    const modal = document.getElementsByClassName('c-Modal')[0]
    const content = document.querySelectorAll('.TestContent')
    const header = document.querySelectorAll('.c-ModalHeaderV2')
    const icon = document.querySelectorAll('.fake-illo')

    expect(modal).toBeTruthy()
    expect(content.length).toBeTruthy()
    expect(header.length).toBeTruthy()
    expect(icon.length).toBeTruthy()
  })
})
