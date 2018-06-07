import React from 'react'
import { shallow } from 'enzyme'
import ChatBlock from '../ChatBlock'
import Content from '../Content'

const cx = 'c-MessageContent'
const ui = {
  main: `.${cx}`,
  content: '.c-MessageContent__content',
}

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Content />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Content className="mugatu" />)
    const o = wrapper.find(`.${cx}`)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('ChatBlock', () => {
  test('Contains a ChatBlock component', () => {
    const wrapper = shallow(<Content />)
    const o = wrapper.find(ChatBlock)

    expect(o.length).toBeTruthy()
  })

  test('ChatBlock does inherits component classNames', () => {
    const wrapper = shallow(<Content />)
    const o = wrapper.find(ChatBlock)

    expect(o.hasClass(cx)).toBeTruthy()
  })

  test('Passes correct props to ChatBlock', () => {
    const wrapper = shallow(<Content from to read ltr rtl timestamp="time" />)
    const props = wrapper.find(ChatBlock).node.props

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
    const wrapper = shallow(<Content from />)
    const o = wrapper.find(ui.content)

    expect(o.hasClass('is-from')).toBeTruthy()
  })

  test('Applies "to" styles, if defined', () => {
    const wrapper = shallow(<Content to />)
    const o = wrapper.find(ui.content)

    expect(o.hasClass('is-to')).toBeTruthy()
  })

  test('Applies "ltr" styles, if defined', () => {
    const wrapper = shallow(<Content ltr />)
    const o = wrapper.find(ui.content)

    expect(o.hasClass('is-ltr')).toBeTruthy()
  })

  test('Applies "rtl" styles, if defined', () => {
    const wrapper = shallow(<Content rtl />)
    const o = wrapper.find(ui.content)

    expect(o.hasClass('is-rtl')).toBeTruthy()
  })
})
