import React from 'react'
import { mount, shallow } from 'enzyme'
import Drop from '.'
import classNames from 'classnames'
import {
  getViewportWidth,
  getComputedHeightProps,
  getComputedWidthProps,
  applyStylesToNode,
} from './Drop.utils'

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

test('Returns width as a number', () => {
  expect(getViewportWidth()).toBeTruthy()
  expect(typeof getViewportWidth()).toBe('number')
})

describe('getComputedHeightProps', () => {
  test('Returns empty if node (arg) is invalid', () => {
    expect(getComputedHeightProps()).toEqual({
      height: 0,
      offset: 0,
    })
  })

  test('Accepts document as a node prop', () => {
    const o = getComputedHeightProps(document)

    expect(o.height).not.toBe(null)
    expect(o.offset).not.toBe(null)
  })

  test('Accepts document.body as a node prop', () => {
    const o = getComputedHeightProps(document.body)
    expect(o.height).not.toBe(null)
    expect(o.offset).not.toBe(null)
  })

  test('Accepts node element as a node prop', () => {
    const n = document.createElement('div')
    const o = getComputedHeightProps(n)

    expect(o.height).not.toBe(null)
    expect(o.offset).not.toBe(null)
  })

  test('Returns object with height + offset values from document', () => {
    const props = getComputedHeightProps(document)

    expect(props.height).not.toBe(null)
    expect(props.offset).toBeTruthy()
  })

  test('Returns object with height + offset values from node', () => {
    const h = document.createElement('div')
    h.style.margin = '50px'

    const props = getComputedHeightProps(h)
    // Cannot test height. node.offsetHeight isn't supported in JSDOM
    expect(props.offset).toBe(100)
  })
})

describe('applyStylesToNode', () => {
  test('Returns false if node (arg) is invalid', () => {
    expect(applyStylesToNode()).not.toBeTruthy()
  })

  test('Returns node (arg) for invalid elements', () => {
    expect(applyStylesToNode(true)).toBe(true)
    expect(applyStylesToNode(1)).toBe(1)
    expect(applyStylesToNode('div')).toBe('div')
  })

  test('Returns node (arg) with untouched styles for invalid styles (arg)', () => {
    const o = document.createElement('div')
    expect(applyStylesToNode(o).style).toBe(o.style)
    expect(applyStylesToNode(o, true).style).toBe(o.style)
    expect(applyStylesToNode(o, 1).style).toBe(o.style)
  })

  test('Returns node with updated styles with valid styles (arg)', () => {
    const o = document.createElement('div')
    const styles = {
      background: 'red',
      padding: '10px',
    }
    expect(applyStylesToNode(o, styles).style.background).toBe('red')
    expect(applyStylesToNode(o, styles).style.padding).toBe('10px')
  })

  test('Style argument can resolve numbers', () => {
    const o = document.createElement('div')
    const styles = {
      padding: 10,
    }
    expect(applyStylesToNode(o, styles).style.padding).toBe('10px')
  })

  test('Style argument can resolve z-index numbers', () => {
    const o = document.createElement('div')
    const styles = {
      zIndex: 10,
    }
    expect(applyStylesToNode(o, styles).style.zIndex).toBe('10')
  })
})

describe('getComputedWidthProps', () => {
  test('Returns empty if node (arg) is invalid', () => {
    expect(getComputedWidthProps()).toEqual({
      width: 0,
      offset: 0,
    })
  })

  test('Accepts document as a node prop', () => {
    const o = getComputedWidthProps(document)

    expect(o.width).not.toBe(null)
    expect(o.offset).not.toBe(null)
  })

  test('Accepts document.body as a node prop', () => {
    const o = getComputedWidthProps(document.body)
    expect(o.width).not.toBe(null)
    expect(o.offset).not.toBe(null)
  })

  test('Accepts node element as a node prop', () => {
    const n = document.createElement('div')
    const o = getComputedWidthProps(n)

    expect(o.width).not.toBe(null)
    expect(o.offset).not.toBe(null)
  })

  test('Returns object with height + offset values from document', () => {
    const props = getComputedWidthProps(document)

    expect(props.width).not.toBe(null)
    expect(props.offset).toBeTruthy()
  })

  test('Returns object with height + offset values from node', () => {
    const h = document.createElement('div')
    h.style.margin = '50px'

    const props = getComputedWidthProps(h)
    // Cannot test width. node.offsetWidth isn't supported in JSDOM
    expect(props.offset).toBe(100)
  })
})
