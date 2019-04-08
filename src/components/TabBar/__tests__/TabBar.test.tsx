import * as React from 'react'
import { mount, render } from 'enzyme'
import { TabBar } from '../TabBar'
import { RightContentUI } from '../TabBar.css'
import Item from '../../Nav/Nav.Item'
import Toolbar from '../../Toolbar'

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

describe('Right content', () => {
  test('Renders nothing if prop is empty', () => {
    const wrapper = mount(<TabBar />)
    expect(wrapper.find(RightContentUI).length).toBeFalsy()
  })
  test('Renders right content text', () => {
    const text = 'right content text'
    const wrapper = mount(<TabBar rightContent={text} />)
    expect(wrapper.find(RightContentUI).text()).toBe(text)
  })

  test('Renders right content child', () => {
    const text = 'this is a test'
    const node = <span>{text}</span>
    const wrapper = mount(<TabBar rightContent={node} />)
    expect(wrapper.find(RightContentUI).text()).toBe(text)
  })
})
