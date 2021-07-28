import React from 'react'
import { mount, shallow } from 'enzyme'
import Drop from '.'
import classNames from 'classnames'

jest.useFakeTimers()

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
  test('Can create a component as a HOC', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent isOpen />)

    jest.runAllTimers()

    const o = document.querySelector('.content')

    expect(o).toBeTruthy()
    expect(o.innerHTML).toContain('Content')
    wrapper.unmount()
  })

  test('Can pass className to composed component', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent className="ron" isOpen />)

    jest.runAllTimers()

    const o = document.querySelector('.content')

    expect(o.classList.contains('ron')).toBeTruthy()
    wrapper.unmount()
  })

  test('Should not steal composed component custom className', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent className="ron" isOpen />)

    jest.runAllTimers()

    const o = document.querySelector('.c-Drop')
    const content = document.querySelector('.content')

    expect(o.classList.contains('ron')).not.toBeTruthy()
    expect(content.classList.contains('ron')).toBeTruthy()
    wrapper.unmount()
  })

  test('Can styles to composed component', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(
      <TestComponent style={{ background: 'red' }} isOpen />
    )

    jest.runAllTimers()

    const o = document.querySelector('.content')

    expect(o.style.background).toBe('red')
    wrapper.unmount()
  })

  test('Adds default ID', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent isOpen />)

    jest.runAllTimers()

    const o = wrapper.find('Portal').first()

    expect(o.props().id).toContain('Drop')
    wrapper.unmount()
  })

  test('Override default ID with options', () => {
    const options = {
      id: 'Brick',
    }
    const TestComponent = Drop(options)(ContentComponent)
    const wrapper = mount(<TestComponent isOpen />)

    jest.runAllTimers()

    const o = wrapper.find('Portal').first()

    expect(o.props().id).toContain('Brick')
    wrapper.unmount()
  })
})

describe('Trigger', () => {
  test('Can render', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = shallow(<TestComponent isOpen trigger={trigger} />).dive()
    const el = wrapper.find('.trigger')

    expect(el.exists()).toBeTruthy()
    expect(el.text()).toBe('Trigger')
  })

  test('Automatically receives click event', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = shallow(<TestComponent isOpen trigger={trigger} />).dive()
    const el = wrapper.find('.trigger')

    expect(el.prop('onClick')).toBeInstanceOf(Function)
  })
})

describe('wrapperClassName', () => {
  test('Adds default wrapperClassName', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent isOpen />)

    jest.runAllTimers()

    const o = wrapper.find('Portal').first()

    expect(o.hasClass('c-DropWrapper')).toBe(true)
  })

  test('Can customize wrapperClassName', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent isOpen wrapperClassName="ron" />)

    jest.runAllTimers()

    const o = wrapper.find('Portal').first()

    expect(o.hasClass('ron')).toBe(true)
  })
})

describe('isOpen', () => {
  test('Can open wrapped component with isOpen prop change to true', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent />)
    let o

    jest.runAllTimers()

    o = document.body.childNodes[0]
    expect(o).not.toBeTruthy()

    wrapper.setProps({ isOpen: true })

    jest.runAllTimers()

    o = document.body.childNodes[0]
    expect(o).toBeTruthy()
  })

  test('Can close wrapped component with isOpen prop change to false', () => {
    const TestComponent = Drop()(ContentComponent)
    const wrapper = mount(<TestComponent isOpen timeout={0} />)

    jest.runAllTimers()
    wrapper.setProps({ isOpen: false })

    jest.runAllTimers()

    const o = document.body.childNodes[0]
    expect(o).not.toBeTruthy()
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
