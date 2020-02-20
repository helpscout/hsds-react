import React from 'react'
import { mount, render } from 'enzyme'
import { TabBar } from './TabBar'
import { SecContentUI, TabBarUI } from './TabBar.css'
import Item from '../Nav/Nav.Item'
import Toolbar from '../Toolbar'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<TabBar />)

    expect(wrapper.hasClass('c-TabBar')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<TabBar className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('Sub-components', () => {
  test('Has Item sub-component', () => {
    expect(TabBar.Item).toBe(Item)
  })
})

describe('Render', () => {
  test('Has a Toolbar component', () => {
    const wrapper = mount(<TabBar />)
    expect(wrapper.find(Toolbar).length).toBeTruthy()
  })
})

describe('Align', () => {
  test('Sets align prop to TabBarUI', () => {
    const align = 'right'
    const wrapper = mount(<TabBar align={align} />)
    expect(wrapper.find(TabBarUI).prop('align')).toBe(align)
  })

  test('Sets align prop to childrens', () => {
    const align = 'right'
    const wrapper = mount(<TabBar align={align} secContent="test" />)
    expect(wrapper.find(TabBarUI).prop('align')).toBe(align)
    expect(wrapper.find(SecContentUI).prop('align')).toBe(align)
  })
})

describe('Secondary content', () => {
  test('Renders nothing if prop is empty', () => {
    const wrapper = mount(<TabBar />)
    expect(wrapper.find(SecContentUI).length).toBeFalsy()
  })
  test('Renders secondary content text', () => {
    const text = 'sec content text'
    const wrapper = mount(<TabBar secContent={text} />)
    expect(wrapper.find(SecContentUI).text()).toBe(text)
  })

  test('Renders secondary content child', () => {
    const text = 'this is a test'
    const node = <span>{text}</span>
    const wrapper = mount(<TabBar secContent={node} />)
    expect(wrapper.find(SecContentUI).text()).toBe(text)
  })
})
