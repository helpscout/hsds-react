import React from 'react'
import { mount, shallow } from 'enzyme'
import StatusBar from '..'
import { Collapsible, Text } from '../../index'

describe('ClassName', () => {
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

describe('Children', () => {
  test('Can render children', () => {
    const wrapper = shallow(<StatusBar isOpen><Text>Hello</Text></StatusBar>)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Hello')
  })
})

describe('Collapsible', () => {
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
    const o = wrapper.find(Collapsible)

    wrapper.setProps({ isOpen: true })
    expect(o.props().isOpen).toBeTruthy()

    wrapper.setProps({ isOpen: false })
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
    const wrapper = shallow(<StatusBar isOpen onClose={spy} closeOnClick={false} />)
    const o = wrapper.find('.c-StatusBar')

    o.simulate('click')

    expect(wrapper.state().isOpen).toBeTruthy()
    expect(spy).not.toHaveBeenCalled()
  })
})
