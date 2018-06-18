import React from 'react'
import { mount } from 'enzyme'
import PortalWrapper from '..'
import Keys from '../../../constants/Keys'
import classNames from '../../../utilities/classNames'
import wait from '../../../tests/helpers/wait'

const TestButton = props => {
  const { className } = props
  const componentClassName = classNames('button', className)
  const handleClick = () => {
    console.log('wee')
  }
  return (
    <div>
      <button className={componentClassName} onClick={handleClick}>
        Click
      </button>
    </div>
  )
}

beforeEach(() => {
  window.BluePortalWrapperGlobalManager = undefined
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
  test('Can create a component as a HOC', done => {
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent isOpen />, context)

    wait().then(() => {
      const c = document.body.childNodes[0]
      expect(c.querySelector('button')).toBeTruthy()
      done()
    })
  })
})

describe('ClassName', () => {
  test('Can pass className to composed component', done => {
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent className="ron" isOpen />, context)

    wait().then(() => {
      const o = document.querySelector('.button')
      expect(o.classList.contains('ron')).toBeTruthy()
      done()
    })
  })
})

describe('ID', () => {
  test('Adds default ID', done => {
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent isOpen />, context)

    wait().then(() => {
      const c = document.body.childNodes[0]
      expect(c.id).toContain('PortalWrapper')
      done()
    })
  })

  test('Override default ID with options', done => {
    const options = {
      id: 'Brick',
      timeout: 0,
    }
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent isOpen />, context)

    wait().then(() => {
      const c = document.body.childNodes[0]
      expect(c.id).toContain('Brick')
      done()
    })
  })
})

describe('Manager', () => {
  test('Can close last Manage item ', done => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(
      <div>
        <TestComponent isOpen />
        <TestComponent isOpen />
      </div>,
      context
    )

    const o = wrapper.find(TestComponent).last()

    wait()
      .then(() => {
        o.getNode().closePortal()
      })
      .then(() => wait())
      .then(() => {
        expect(o.getNode().state.isOpen).toBe(false)
        done()
      })
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

    o.getNode().closePortal()
    expect(o.getNode().state.isOpen).toBe(true)
  })
})

describe('wrapperClassName', () => {
  test('Does not add a wrapperClassName to portal', done => {
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent isOpen />, context)

    wait().then(() => {
      const c = document.body.childNodes[0]
      expect(c.className).toBeFalsy()
      done()
    })
  })

  test('Can customize wrapperClassName', done => {
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent isOpen wrapperClassName="blue" />, context)

    wait().then(() => {
      const c = document.body.childNodes[0]
      expect(c.className).toContain('blue')
      done()
    })
  })
})

describe('isOpen', () => {
  test('Can open wrapped component with isOpen prop change to true', done => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent />, context)

    wait()
      .then(() => {
        const o = document.body.childNodes[0]
        expect(o).not.toBeTruthy()

        wrapper.setProps({ isOpen: true })
      })
      .then(() => wait(10))
      .then(() => {
        const o = document.body.childNodes[0]
        expect(o).toBeTruthy()
        done()
      })
  })

  test('Can close wrapped component with isOpen prop change to false', done => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const wrapper = mount(<TestComponent isOpen timeout={0} />, context)

    wait()
      .then(() => {
        wrapper.setProps({ isOpen: false })
      })
      .then(() => wait(500))
      .then(() => {
        const o = document.body.childNodes[0]
        expect(o).not.toBeTruthy()
        done()
      })
  })
})

describe('Router', () => {
  test('Does not render if path is provided, but no context', done => {
    const TestComponent = PortalWrapper(options)(TestButton)
    mount(<TestComponent path="/test" timeout={0} />)

    wait(10).then(() => {
      const o = document.body.childNodes[0]
      expect(o).not.toBeTruthy()
      done()
    })
  })

  test('Does not render if the router shape is in valid', done => {
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

    wait(100).then(() => {
      const o = document.body.childNodes[0]
      expect(o).not.toBeTruthy()
      done()
    })
  })

  test('Does not render if the route path does not match', done => {
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

    wait(100).then(() => {
      const o = document.body.childNodes[0]
      expect(o).not.toBeTruthy()
      done()
    })
  })

  test('Renders if path matches router', done => {
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

    wait(10).then(() => {
      const o = document.body.childNodes[0]
      expect(o).toBeTruthy()
      done()
    })
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
    const o = wrapper.getNode()

    expect(o.triggerComponent).toBeTruthy()
    expect(o.triggerNode).toBeTruthy()
  })

  test('Unsets triggerNode on unmount', () => {
    const TestComponent = PortalWrapper(options)(TestButton)
    const trigger = <button>Trigger</button>
    const wrapper = mount(<TestComponent timeout={0} trigger={trigger} />)
    const o = wrapper.getNode()

    wrapper.unmount()

    expect(o.triggerNode).not.toBeTruthy()
  })

  test('Does not focus triggerNode if prop change remains false', done => {
    const spy = jest.fn()
    const TestComponent = PortalWrapper(options)(TestButton)
    const trigger = <button>Trigger</button>
    const wrapper = mount(<TestComponent timeout={0} trigger={trigger} />)
    const o = wrapper.find('button')
    o.getNode().onfocus = spy
    wrapper.setProps({ isOpen: false })

    setTimeout(() => {
      expect(spy).not.toHaveBeenCalled()
      done()
    }, 40)
  })

  test('Focuses triggerNode on isOpen prop change to false', done => {
    const spy = jest.fn()
    const TestComponent = PortalWrapper(options)(TestButton)
    const trigger = <button>Trigger</button>
    const wrapper = mount(
      <TestComponent timeout={0} trigger={trigger} isOpen />
    )
    const o = wrapper.find('button')
    o.getNode().onfocus = spy
    wrapper.setProps({ isOpen: false })

    setTimeout(() => {
      expect(spy).toHaveBeenCalled()
      done()
    }, 40)
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
