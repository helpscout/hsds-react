import React from 'react'
import { mount } from 'enzyme'
import ChatBlock from '../ChatBlock'
import Content from '../Content'

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
    const o = wrapper.find(`.${cx}`)

    expect(o.hasClass('mugatu')).toBeTruthy()
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

    expect(o.hasClass(cx)).toBeTruthy()
  })

  test('Passes correct props to ChatBlock', () => {
    const wrapper = mount(<Content from to read ltr rtl timestamp="time" />)
    const props = wrapper.find(ChatBlock).getNode().props

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
    const o = wrapper.find(ui.content)

    expect(o.hasClass('is-from')).toBeTruthy()
  })

  test('Applies "to" styles, if defined', () => {
    const wrapper = mount(<Content to />)
    const o = wrapper.find(ui.content)

    expect(o.hasClass('is-to')).toBeTruthy()
  })

  test('Applies "ltr" styles, if defined', () => {
    const wrapper = mount(<Content ltr />)
    const o = wrapper.find(ui.content)

    expect(o.hasClass('is-ltr')).toBeTruthy()
  })

  test('Applies "rtl" styles, if defined', () => {
    const wrapper = mount(<Content rtl />)
    const o = wrapper.find(ui.content)

    expect(o.hasClass('is-rtl')).toBeTruthy()
  })

  test('Applies "isNote" styles, if defined', () => {
    const wrapper = mount(<Content isNote />)
    const b = wrapper.find(ui.base)
    const o = wrapper.find(ui.content)

    expect(b.hasClass('is-note')).toBeTruthy()
    expect(o.hasClass('is-note')).toBeTruthy()
  })
})
