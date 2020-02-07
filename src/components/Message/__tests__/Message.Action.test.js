import * as React from 'react'
import { mount } from 'enzyme'
import Action from '../Message.Action'
import Message from '../Message'
import { Text } from '../..'
import { Timestamp } from '../..'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Action />)
    const o = wrapper.find(Action)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Action className="mugatu" />)
    const o = wrapper.find(Action)

    expect(o.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('Timestamp', () => {
  test('Renders timestamp', () => {
    const wrapper = mount(<Action timestamp="time" />)

    expect(wrapper.find(Timestamp).length).toBeTruthy()
  })

  test('Renders timestamp with from', () => {
    const wrapper = mount(<Action timestamp="time" />)

    expect(wrapper.find(Timestamp).length).toBeTruthy()
  })
})

describe('Content', () => {
  test('Wraps children in a Text component', () => {
    const wrapper = mount(<Action>Relax</Action>)
    const o = wrapper.find(Text)

    expect(o.length).toBeTruthy()
    expect(o.instance().props.children).toBe('Relax')
  })
})

describe('Context', () => {
  test('Adds className based on context.theme', () => {
    const wrapper = mount(
      <Message.Provider theme="embed">
        <Action />
      </Message.Provider>
    )
    const o = wrapper.find(Action)
    expect(o.getDOMNode().classList.contains('is-theme-embed')).toBe(true)
  })
  test('Does not Change text props based on context.theme', () => {
    const wrapper = mount(
      <Message.Provider theme="embed">
        <Action />
      </Message.Provider>
    )
    let o = wrapper.find(Text).first()
    expect(o.getDOMNode().classList.contains('is-12')).toBe(true)
    expect(o.getDOMNode().classList.contains('is-shade-faint')).toBe(true)
  })
})
