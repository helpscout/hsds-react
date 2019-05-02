import * as React from 'react'
import { mount } from 'enzyme'
import { default as BlankSlate } from '../BlankSlate'
import { Illo, Text } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<BlankSlate />)
    const el = wrapper.find('div.c-ChatListBlankSlate')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<BlankSlate className={customClass} />)
    const el = wrapper.find('div.c-ChatListBlankSlate')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child', () => {
    const wrapper = mount(
      <BlankSlate>
        <div className="child">Hello</div>
      </BlankSlate>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Illo', () => {
  test('Renders an Illo by default', () => {
    const wrapper = mount(<BlankSlate />)
    const o = wrapper.find(Illo)

    expect(o.length).toBeTruthy()
  })

  test('Does not render an Illo if illoName prop is blank', () => {
    const wrapper = mount(<BlankSlate illoName="" />)
    const o = wrapper.find(Illo)

    expect(o.length).not.toBeTruthy()
  })
})

describe('Message', () => {
  test('Render child message into a <Text>', () => {
    const wrapper = mount(<BlankSlate>Mugatu</BlankSlate>)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Mugatu')
  })

  test('Renders a default message, if childless', () => {
    const wrapper = mount(<BlankSlate />)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('all caught-up')
  })
})
