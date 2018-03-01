import React from 'react'
import { mount, shallow } from 'enzyme'
import HoverWrapper from '..'

const Component = props => {
  const { children, isHovered, ...rest } = props
  const hoverContent = isHovered ? (
    <div className='c-Component__hoverOnly'>
      Hover only
    </div>
  ) : null
  return (
    <div className='c-Component' {...rest}>
      {hoverContent}
      {children}
    </div>
  )
}
const TestComponent = HoverWrapper(Component)

describe('Callbacks', () => {
  test('onMouseEnter callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = shallow(<TestComponent onMouseEnter={spy} />)

    wrapper.simulate('mouseenter')
    expect(spy).toHaveBeenCalled()
  })

  test('onMouseEnter callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = shallow(<TestComponent onMouseLeave={spy} />)

    wrapper.simulate('mouseleave')
    expect(spy).toHaveBeenCalled()
  })

  test('onBlur callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = shallow(<TestComponent onBlur={spy} />)

    wrapper.simulate('blur')
    expect(spy).toHaveBeenCalled()
  })

  test('onClick callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = shallow(<TestComponent onClick={spy} />)

    wrapper.simulate('click')
    expect(spy).toHaveBeenCalled()
  })

  test('onFocus callback can be triggered', () => {
    const spy = jest.fn()
    const wrapper = shallow(<TestComponent onFocus={spy} />)

    wrapper.simulate('focus')
    expect(spy).toHaveBeenCalled()
  })
})

describe('Interactions', () => {
  test('Passes isHovered:true to ComposedComponent on mouseenter', () => {
    const wrapper = mount(<TestComponent />)
    expect(wrapper.find('.c-Component__hoverOnly').length).not.toBeTruthy()

    wrapper.simulate('mouseenter')
    expect(wrapper.find('.c-Component__hoverOnly').length).toBeTruthy()
  })

  test('Passes isHovered:true to ComposedComponent on mouseleave', () => {
    const wrapper = mount(<TestComponent />)
    expect(wrapper.find('.c-Component__hoverOnly').length).not.toBeTruthy()

    wrapper.simulate('mouseenter')

    expect(wrapper.find('.c-Component__hoverOnly').length).toBeTruthy()

    wrapper.simulate('mouseleave')

    expect(wrapper.find('.c-Component__hoverOnly').length).not.toBeTruthy()
  })
})

describe('Props', () => {
  test('Correctly passes all props to ComposedComponent', () => {
    const wrapper = shallow(
      <TestComponent
        aria-role='presentation'
        data-attr='Attribute'
        style={{ background: 'red' }}
      />
    )

    expect(wrapper.props()['data-attr']).toBeTruthy()
    expect(wrapper.props().style.background).toBe('red')
  })
})

describe('displayName', () => {
  test('Uses a ComposedComponent.name', () => {
    const Derek = () => (
      <div />
    )
    const WrappedComponent = HoverWrapper(Derek)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Uses a ComposedComponent.displayName', () => {
    const Composed = () => (
      <div />
    )
    Composed.displayName = 'Derek'
    const WrappedComponent = HoverWrapper(Composed)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Works with React.Component', () => {
    class Derek extends React.Component {
      render () {
        return (<div />)
      }
    }
    const WrappedComponent = HoverWrapper(Derek)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Works with React.Component.displayName', () => {
    class Composed extends React.Component {
      render () {
        return (<div />)
      }
    }
    Composed.displayName = 'Derek'
    const WrappedComponent = HoverWrapper(Composed)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })
})
