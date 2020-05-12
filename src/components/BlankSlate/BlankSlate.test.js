import React from 'react'
import { mount } from 'enzyme'
import BlankSlate from './BlankSlate'
import { TextUI, HeadingUI } from './BlankSlate.css.js'
import Illo from '../Illo'
import WrenchCat from '@helpscout/hsds-illos/wrench-cat'

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
    const component = wrapper.find(Illo)
    expect(component.length).toBeTruthy()
    expect(component.first().prop('name')).toBe(illoName)
  })

  test('Does not render an illustration if no prop', () => {
    const wrapper = mount(<BlankSlate />)
    const component = wrapper.find(Illo)
    expect(component.length).toBeFalsy()
  })

  test('Render illo size if set in props', () => {
    const wrapper = mount(
      <BlankSlate illoName="chatListBlankSlate" illoSize="90" />
    )
    const o = wrapper.find(Illo)

    expect(o.first().prop('size')).toBe('90')
  })

  test('Render custom illo', () => {
    const wrapper = mount(<BlankSlate illo={<WrenchCat />} />)
    expect(wrapper.find(Illo)).toHaveLength(0)
    expect(wrapper.find(WrenchCat)).toHaveLength(1)
  })

  test('Maintains props on custom illo', () => {
    const wrapper = mount(<BlankSlate illo={<WrenchCat size="90" />} />)
    const o = wrapper.find(WrenchCat)
    expect(o.first().prop('size')).toBe('90')
  })
})
