import * as React from 'react'
import { mount } from 'enzyme'
import ChatBlock from '../Message.ChatBlock'
import Action from '../Message.Action'
import Message from '../Message'
import { Text } from '../../'

const cx = 'c-MessageAction'
const ui = {
  action: `.${cx}`,
  text: `.${cx}__text`,
}

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Action />)
    const o = wrapper.find(ui.action)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Action className="mugatu" />)
    const o = wrapper.find(ui.action)

    expect(o.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('ChatBlock', () => {
  test('Contains a ChatBlock component', () => {
    const wrapper = mount(<Action />)
    const o = wrapper.find(ChatBlock)

    expect(o.length).toBeTruthy()
  })

  test('ChatBlock does not inherit component classNames', () => {
    const wrapper = mount(<Action />)
    const o = wrapper.find(ChatBlock)

    expect(o.getDOMNode().classList.contains(cx)).not.toBeTruthy()
  })

  test('Passes correct props to ChatBlock', () => {
    const wrapper = mount(<Action from to read ltr rtl timestamp="time" />)
    const props = wrapper.find(ChatBlock).instance().props

    expect(props.from).toBeTruthy()
    expect(props.to).toBeTruthy()
    expect(props.read).toBeTruthy()
    expect(props.ltr).toBeTruthy()
    expect(props.rtl).toBeTruthy()
    expect(props.timestamp).toBeTruthy()
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
    const o = wrapper.find(ui.action)

    expect(o.getDOMNode().classList.contains('is-theme-embed')).toBe(true)
  })

  test('Does not Change text props based on context.theme', () => {
    const wrapper = mount(
      <Message.Provider theme="embed">
        <Action />
      </Message.Provider>
    )
    let o = wrapper.find(ui.text).first()

    expect(o.getDOMNode().classList.contains('is-12')).toBe(true)
    expect(o.getDOMNode().classList.contains('is-shade-faint')).toBe(true)
  })
})
