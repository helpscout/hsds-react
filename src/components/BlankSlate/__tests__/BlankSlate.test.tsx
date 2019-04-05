import * as React from 'react'
import { mount, render } from 'enzyme'
import BlankSlate from '../BlankSlate'
import { TextUI, HeadingUI, IlloUI } from '../BlankSlate.css'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<BlankSlate />)

    expect(wrapper.getDOMNode().classList.contains('c-BlankSlate')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<BlankSlate className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })

  test('Applies with-light-background className if specified', () => {
    const className = 'with-light-background'
    const wrapper = mount(<BlankSlate lightBackground={true} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })

  test('Applies align-top className if specified', () => {
    const className = 'align-top'
    const wrapper = mount(<BlankSlate alignTop={true} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Message', () => {
  test('Renders a message', () => {
    const message = 'this is a message'
    const wrapper = mount(<BlankSlate message={message} />)
    const component = wrapper.find(TextUI)
    expect(component.length).toBeTruthy()
    expect(component.first().text()).toBe(message)
  })

  test('Does not render a message if no prop', () => {
    const wrapper = mount(<BlankSlate />)
    const component = wrapper.find(TextUI)
    expect(component.length).toBeFalsy()
  })
})

describe('Heading', () => {
  test('Renders a heading', () => {
    const title = 'this is a title'
    const wrapper = mount(<BlankSlate title={title} />)
    const component = wrapper.find(HeadingUI)
    expect(component.length).toBeTruthy()
    expect(component.first().text()).toBe(title)
  })

  test('Does not render a heading if no prop', () => {
    const wrapper = mount(<BlankSlate />)
    const component = wrapper.find(HeadingUI)
    expect(component.length).toBeFalsy()
  })
})

describe('Illo', () => {
  test('Renders an illustration', () => {
    const illoName = 'chatListBlankSlate'
    const wrapper = mount(<BlankSlate illoName={illoName} />)
    const component = wrapper.find(IlloUI)
    expect(component.length).toBeTruthy()
    expect(component.first().prop('name')).toBe(illoName)
  })

  test('Does not render an illustration if no prop', () => {
    const wrapper = mount(<BlankSlate />)
    const component = wrapper.find(IlloUI)
    expect(component.length).toBeFalsy()
  })
})
