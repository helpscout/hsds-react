import * as React from 'react'
import { mount } from 'enzyme'
import ChatBlock from '../Message.ChatBlock'
import Content from '../Message.Content'

const cx = 'c-MessageContent'
const ui = {
  base: `.${cx}`,
  content: '.c-MessageContent__content',
}

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Content />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Content className="mugatu" />)
    const o = wrapper.find(`.${cx}`).first()

    expect(o.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('ChatBlock', () => {
  test('Contains a ChatBlock component', () => {
    const wrapper = mount(<Content />)
    const o = wrapper.find(ChatBlock)

    expect(o.length).toBeTruthy()
  })

  test('ChatBlock does inherits component classNames', () => {
    const wrapper = mount(<Content />)
    const o = wrapper.find(ChatBlock)

    expect(o.getDOMNode().classList.contains(cx)).toBeTruthy()
  })

  test('Passes correct props to ChatBlock', () => {
    const wrapper = mount(<Content from to read ltr rtl timestamp="time" />)
    const props = wrapper.find(ChatBlock).instance().props

    expect(props.from).toBeTruthy()
    expect(props.to).toBeTruthy()
    expect(props.read).toBeTruthy()
    expect(props.ltr).toBeTruthy()
    expect(props.rtl).toBeTruthy()
    expect(props.timestamp).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Applies "from" styles, if defined', () => {
    const wrapper = mount(<Content from />)
    const o = wrapper.find(ui.content).first()

    expect(o.getDOMNode().classList.contains('is-from')).toBeTruthy()
  })

  test('Applies "to" styles, if defined', () => {
    const wrapper = mount(<Content to />)
    const o = wrapper.find(ui.content).first()

    expect(o.getDOMNode().classList.contains('is-to')).toBeTruthy()
  })

  test('Applies "ltr" styles, if defined', () => {
    const wrapper = mount(<Content ltr />)
    const o = wrapper.find(ui.content).first()

    expect(o.getDOMNode().classList.contains('is-ltr')).toBeTruthy()
  })

  test('Applies "rtl" styles, if defined', () => {
    const wrapper = mount(<Content rtl />)
    const o = wrapper.find(ui.content).first()

    expect(o.getDOMNode().classList.contains('is-rtl')).toBeTruthy()
  })

  test('Applies "isNote" styles, if defined', () => {
    const wrapper = mount(<Content isNote />)
    const b = wrapper.find(ui.base).first()
    const o = wrapper.find(ui.content).first()

    expect(b.getDOMNode().classList.contains('is-note')).toBeTruthy()
    expect(o.getDOMNode().classList.contains('is-note')).toBeTruthy()
  })
})
