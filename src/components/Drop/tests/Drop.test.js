import React from 'react'
import { mount, shallow } from 'enzyme'
import Drop from '..'
import classNames from '../../../utilities/classNames'
import wait from '../../../tests/helpers/wait'

const ContentComponent = props => {
  const { className, style } = props
  const componentClassName = classNames('content', className)
  const handleClick = () => {
    console.log('wee')
  }
  return (
    <div className={componentClassName} onClick={handleClick} style={style}>
      Content
    </div>
  )
}
const trigger = <a className="trigger">Trigger</a>

beforeEach(() => {
  document.body.innerHTML = ''
})

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Composed', () => {
  test('Can create a component as a HOC', done => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent isOpen />)

    wait().then(() => {
      const o = document.querySelector('.content')

      expect(o).toBeTruthy()
      expect(o.innerHTML).toContain('Content')
      wrapper.unmount()
      done()
    })
  })

  test('Can pass className to composed component', done => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent className="ron" isOpen />)

    wait().then(() => {
      const o = document.querySelector('.content')

      expect(o.classList.contains('ron')).toBeTruthy()
      wrapper.unmount()
      done()
    })
  })

  test('Should not steal composed component custom className', done => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent className="ron" isOpen />)

    wait().then(() => {
      const o = document.querySelector('.c-Drop')
      const content = document.querySelector('.content')

      expect(o.classList.contains('ron')).not.toBeTruthy()
      expect(content.classList.contains('ron')).toBeTruthy()
      wrapper.unmount()
      done()
    })
  })

  test('Can styles to composed component', done => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(
      <TestComponent style={{ background: 'red' }} isOpen />
    )

    wait().then(() => {
      const o = document.querySelector('.content')

      expect(o.style.background).toBe('red')
      wrapper.unmount()
      done()
    })
  })

  test('Adds default ID', done => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent isOpen />)

    wait().then(() => {
      const o = document.body.childNodes[0]

      expect(o.id).toContain('Drop')
      wrapper.unmount()
      done()
    })
  })

  test('Override default ID with options', done => {
    const options = {
      id: 'Brick',
    }
    const TestComponent = Drop(options)(ContentComponent)
    const wrapper = mount(<TestComponent isOpen />)

    wait().then(() => {
      const o = document.body.childNodes[0]

      expect(o.id).toContain('Brick')
      wrapper.unmount()
      done()
    })
  })
})

describe('Trigger', () => {
  test('Can render', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = shallow(<TestComponent isOpen trigger={trigger} />)
    const el = wrapper.find('.trigger')

    expect(el.exists()).toBeTruthy()
    expect(el.text()).toBe('Trigger')
  })

  test('Automatically receives click event', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = shallow(<TestComponent isOpen trigger={trigger} />)
    const el = wrapper.find('.trigger')

    expect(el.prop('onClick')).toBeInstanceOf(Function)
  })
})

describe('wrapperClassName', () => {
  test('Adds default wrapperClassName', done => {
    const TestComponent = Drop()(ContentComponent)
    mount(<TestComponent isOpen />)

    wait(40).then(() => {
      const o = document.body.childNodes[0]
      expect(o.className).toContain('c-DropWrapper')
      done()
    })
  })

  test('Can customize wrapperClassName', done => {
    const TestComponent = Drop()(ContentComponent)
    mount(<TestComponent isOpen wrapperClassName="ron" />)

    wait(40).then(() => {
      const o = document.body.childNodes[0]
      expect(o.className).toContain('ron')
      expect(o.className).toContain('c-DropWrapper')
      done()
    })
  })
})

describe('isOpen', () => {
  test('Can open wrapped component with isOpen prop change to true', done => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent />)

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
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent isOpen timeout={0} />)

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

describe('displayName', () => {
  test('Uses a ComposedComponent.name', () => {
    const Derek = () => <div />
    const WrappedComponent = Drop()(Derek)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Uses a ComposedComponent.displayName', () => {
    const Composed = () => <div />
    Composed.displayName = 'Derek'
    const WrappedComponent = Drop()(Composed)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Works with React.Component', () => {
    class Derek extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = Drop()(Derek)

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
    const WrappedComponent = Drop()(Composed)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })
})
