import React from 'react'
import { mount } from 'enzyme'
import KeypressListener from '../KeypressListener'
import PortalWrapper from './PortalWrapper'
import Keys from '../../constants/Keys'
import { classNames } from '../../utilities/classNames'

jest.useFakeTimers()

const TestButton = props => {
  const { className, children } = props
  const componentClassName = classNames('button', className)
  const handleClick = () => {
    console.log('wee')
  }
  return (
    <div>
      <button className={componentClassName} onClick={handleClick}>
        Click
      </button>
      {children}
    </div>
  )
}

beforeEach(() => {
  window.HSDSPortalWrapperGlobalManager = undefined
})

afterEach(() => {
  document.body.innerHTML = ''
  document.body.style.overflow = null
})

const options = {
  timeout: 0,
}

const context = {
  context: {
    router: {},
  },
}

describe('HOC', () => {
  test('Can create a component as a HOC', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent isOpen />, context)

    const c = document.body.childNodes[0]
    expect(c.querySelector('button')).toBeTruthy()
  })
})

describe('ClassName', () => {
  test('Can pass className to composed component', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent className="ron" isOpen />, context)

    const o = document.querySelector('.button')
    expect(o.classList.contains('ron')).toBeTruthy()
  })
})

describe('ID', () => {
  test('Adds default ID', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent isOpen />, context)

    const comp = wrapper.find('Portal').first()
    expect(comp.props().id).toContain('PortalWrapper')
  })

  test('Override default ID with options', () => {
    const options = {
      id: 'Brick',
      timeout: 0,
    }
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent isOpen />, context)

    const comp = wrapper.find('Portal').first()
    expect(comp.props().id).toContain('Brick')
  })
})

describe('Manager', () => {
  test('Can close last Manage item ', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(
      <div>
        <TestComponent isOpen />
        <TestComponent isOpen />
      </div>,
      context
    )

    const o = wrapper.find(TestComponent).last()

    o.instance().closePortal()
    expect(o.instance().state.isOpen).toBe(false)
  })

  test('Cannot close Component that is not last in Manage list', () => {
    const TestComponent = PortalWrapper()(TestButton)
    const wrapper = mount(
      <div>
        <TestComponent isOpen />
        <TestComponent isOpen />
      </div>,
      context
    )
    const o = wrapper.find(TestComponent).first()

    o.instance().closePortal()
    expect(o.instance().state.isOpen).toBe(true)
  })
})

describe('isOpen', () => {
  test('Can open wrapped component with isOpen prop change to true', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent />, context)

    const o = document.body.childNodes[0]
    expect(o).not.toBeTruthy()

    wrapper.setProps({ isOpen: true })

    const o2 = document.body.childNodes[0]
    expect(o2).toBeTruthy()
  })

  test('Can close wrapped component with isOpen prop change to false', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent isOpen={false} timeout={0} />, context)

    wrapper.setProps({ isOpen: true })
    expect(wrapper.find('Animate').first().props().in).toBe(true)

    wrapper.setProps({ isOpen: false })

    expect(wrapper.find('Animate').first().props().in).toBe(false)
  })
})

describe('Router', () => {
  test('Does not render if path is provided, but no context', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent path="/test" timeout={0} />)

    const o = document.body.childNodes[0]
    expect(o).not.toBeTruthy()
  })

  test('Does not render if the router shape is in valid', () => {
    const context = {
      context: {
        router: {
          history: {},
          location: { pathname: '/different' },
        },
      },
    }
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent path="/diff" timeout={0} />, context)

    const o = document.body.childNodes[0]
    expect(o).not.toBeTruthy()
  })

  test('Does not render if the route path does not match', () => {
    const context = {
      context: {
        router: {
          history: {
            location: { pathname: '/different' },
          },
        },
      },
    }
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent path="/diff" timeout={0} />, context)

    const o = document.body.childNodes[0]
    expect(o).not.toBeTruthy()
  })

  test('Renders if path matches router', () => {
    const context = {
      context: {
        router: {
          history: {
            location: { pathname: '/test' },
          },
        },
      },
    }
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent path="/test" timeout={0} />, context)

    const o = document.body.childNodes[0]
    expect(o).toBeTruthy()
  })
})

describe('Mounting', () => {
  test('Tracks mount status internally', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent timeout={0} />)
    const o = wrapper.instance()

    expect(o._isMounted).toBe(true)

    wrapper.unmount()

    expect(o._isMounted).toBe(false)
  })
})

describe('Trigger', () => {
  test('Sets triggerNode on mount', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const trigger = <button>Trigger</button>
    const wrapper = mount(<TestComponent timeout={0} trigger={trigger} />)
    const o = wrapper.instance()

    expect(o.triggerComponent).toBeTruthy()
    expect(o.triggerNode).toBeTruthy()
  })

  test('Unsets triggerNode on unmount', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const trigger = <button>Trigger</button>
    const wrapper = mount(<TestComponent timeout={0} trigger={trigger} />)
    const o = wrapper.instance()

    wrapper.unmount()

    expect(o.triggerNode).not.toBeTruthy()
  })

  test('Does not focus triggerNode if prop change remains false', () => {
    const spy = jest.fn()
    const TestComponent = PortalWrapper(options)(TestButton)
    const trigger = <button>Trigger</button>
    const wrapper = mount(<TestComponent timeout={0} trigger={trigger} />)
    const o = wrapper.find('button')
    o.getDOMNode().onfocus = spy
    wrapper.setProps({ isOpen: false })

    expect(spy).not.toHaveBeenCalled()
  })

  test('Allows for ref', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    let refNode = null
    const trigger = (
      <div
        ref={node => {
          refNode = node
        }}
      >
        Trigger
      </div>
    )
    mount(<TestComponent timeout={0} trigger={trigger} isOpen />)

    expect(refNode).not.toBe(null)
  })

  test('Allows for onClick', () => {
    const spy = jest.fn()
    const TestComponent = PortalWrapper(options)(TestButton)
    const trigger = (
      <div onClick={spy} className="trigger">
        Trigger
      </div>
    )
    const wrapper = mount(
      <TestComponent timeout={0} trigger={trigger} isOpen />
    )
    const o = wrapper.find('.trigger')

    o.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Esc keypress', () => {
  test('Prevents event from bubbling when open', () => {
    const globalSpy = jest.fn()
    const event = new Event('keyup')
    event.keyCode = Keys.ESCAPE

    const TestComponent = PortalWrapper(options)(TestButton)
    const trigger = <div className="trigger">Trigger</div>
    const wrapper = mount(
      <TestComponent timeout={0} trigger={trigger} isOpen />
    )

    setTimeout(() => {
      window.addEventListener('keyup', globalSpy)
      window.dispatchEvent(event)

      expect(globalSpy).not.toHaveBeenCalled()
      wrapper.unmount()
      window.removeEventListener('keyup', globalSpy)
    }, 20)
  })

  test('Prevents event from bubbling when closed', () => {
    const globalSpy = jest.fn()
    const event = new Event('keyup')
    event.keyCode = Keys.ESCAPE

    const TestComponent = PortalWrapper(options)(TestButton)
    const trigger = <div className="trigger">Trigger</div>
    const wrapper = mount(<TestComponent timeout={0} trigger={trigger} />)

    setTimeout(() => {
      window.addEventListener('keyup', globalSpy)
      window.dispatchEvent(event)

      expect(globalSpy).toHaveBeenCalled()
      wrapper.unmount()
      window.removeEventListener('keyup', globalSpy)
    }, 20)
  })

  test('Prevents adding KeypressListener when closeOnEscape is false', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const trigger = <div className="trigger">Trigger</div>
    const wrapper = mount(
      <TestComponent timeout={0} closeOnEscape={false} trigger={trigger} />
    )
    expect(wrapper.find(KeypressListener)).toHaveLength(0)
  })

  test('Adds KeypressListener when closeOnEscape is true', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const trigger = <div className="trigger">Trigger</div>
    const wrapper = mount(
      <TestComponent timeout={0} closeOnEscape trigger={trigger} />
    )
    expect(wrapper.find(KeypressListener)).toHaveLength(1)
  })
})

describe('displayName', () => {
  test('Uses a ComposedComponent.name', () => {
    const Derek = () => <div />
    const WrappedComponent = PortalWrapper()(Derek)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Uses a ComposedComponent.displayName', () => {
    const Composed = () => <div />
    Composed.displayName = 'Derek'
    const WrappedComponent = PortalWrapper()(Composed)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Works with React.Component', () => {
    class Derek extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = PortalWrapper()(Derek)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Works with React.Component.displayName', () => {
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    Composed.displayName = 'Derek'
    const WrappedComponent = PortalWrapper()(Composed)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })
})

describe('Closing', () => {
  test('Closes portal and stops even propagation on Esc', () => {
    const eventSpy = jest.fn()
    class Derek extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = PortalWrapper()(Derek)

    const wrapper = mount(<WrappedComponent isOpen />)

    expect(wrapper.state().isOpen).toBe(true)

    wrapper.instance().handleOnEsc({
      stopPropagation: eventSpy,
    })

    expect(eventSpy).toHaveBeenCalled()
    expect(wrapper.state().isOpen).toBe(false)
  })
})
