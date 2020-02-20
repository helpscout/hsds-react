import React from 'react'
import { mount, shallow } from 'enzyme'
import StatusBar from './StatusBar'
import { Collapsible, Text, Icon } from '../index'

describe('StatusBar ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<StatusBar isOpen />)
    const o = wrapper.find('.c-StatusBar')

    expect(o.length).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<StatusBar className={customClass} isOpen />)
    const o = wrapper.find('.c-StatusBar')

    expect(o.hasClass(customClass)).toBeTruthy()
  })
})

describe('StatusBar Children', () => {
  test('Can render children', () => {
    const wrapper = shallow(
      <StatusBar isOpen>
        <Text>Hello</Text>
      </StatusBar>
    )
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Hello')
  })
})

describe('StatusBar Collapsible', () => {
  test('isOpen prop change updates state', () => {
    const wrapper = shallow(<StatusBar isOpen />)
    expect(wrapper.state().isOpen).toBe(true)

    wrapper.setProps({ isOpen: false })
    expect(wrapper.state().isOpen).toBe(false)
  })

  test('Contains content within <Collapsible>', () => {
    const wrapper = shallow(
      <StatusBar isOpen>
        <Text>Content</Text>
      </StatusBar>
    )
    const o = wrapper.find(Collapsible)

    expect(o.length).toBeTruthy()
    expect(o.find(Text).length).toBeTruthy()
  })

  test('Is collapsed by default', () => {
    const wrapper = shallow(<StatusBar />)
    const o = wrapper.find(Collapsible)

    expect(o.props().isOpen).not.toBeTruthy()
  })

  test('Can be expanded with isOpen prop', () => {
    const wrapper = shallow(
      <StatusBar isOpen>
        <Text>Content</Text>
      </StatusBar>
    )
    const o = wrapper.find(Collapsible)

    expect(o.props().isOpen).toBeTruthy()
    expect(o.find(Text).html()).toContain('Content')
  })

  test('Should pass isOpen prop to Collapsible', () => {
    const wrapper = mount(<StatusBar />)

    wrapper.setProps({ isOpen: true })
    let o = wrapper.find(Collapsible)
    expect(o.props().isOpen).toBeTruthy()

    wrapper.setProps({ isOpen: false })
    o = wrapper.find(Collapsible)
    expect(o.props().isOpen).not.toBeTruthy()
  })

  test('Should collapse on click', () => {
    const spy = jest.fn()
    const wrapper = shallow(<StatusBar isOpen onClick={spy} />)
    const o = wrapper.find('.c-StatusBar')

    o.simulate('click')

    expect(wrapper.state().isOpen).not.toBeTruthy()
    expect(spy).toHaveBeenCalled()
  })

  test('Close on click can be disabled', () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <StatusBar isOpen onClose={spy} closeOnClick={false} />
    )
    const o = wrapper.find('.c-StatusBar')

    o.simulate('click')

    expect(wrapper.state().isOpen).toBeTruthy()
    expect(spy).not.toHaveBeenCalled()
  })
})

describe('StatusBar.Button ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<StatusBar.Button />)

    expect(wrapper.hasClass('c-StatusBarButton')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<StatusBar.Button className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('StatusBar.Button Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(
      <StatusBar.Button>
        <span className="child">Hello</span>
      </StatusBar.Button>
    )
    const el = wrapper.find('span.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('StatusBar.Button Icon', () => {
  test('Does not render an icon by default', () => {
    const wrapper = shallow(<StatusBar.Button>Hello</StatusBar.Button>)
    const o = wrapper.find(Icon)

    expect(o.length).toBe(0)
  })

  test('Can render an Icon if specified', () => {
    const wrapper = shallow(
      <StatusBar.Button icon="tick">Hello</StatusBar.Button>
    )
    const o = wrapper.find(Icon)

    expect(o.length).toBe(1)
    expect(o.props().name).toBe('tick')
  })
})
