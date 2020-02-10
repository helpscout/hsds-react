import * as React from 'react'
import { mount } from 'enzyme'
import Action from '../Message.Action'
import ChatBlock from '../Message.ChatBlock'
import Bubble from '../Message.Bubble'
import Message from '../Message'
import { Timestamp } from '../..'

const cx = 'c-MessageChatBlock'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<ChatBlock />)

    expect(wrapper.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<ChatBlock className="mugatu" />)

    expect(wrapper.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('Timestamp', () => {
  test('Renders timestamp', () => {
    const wrapper = mount(<ChatBlock timestamp="time" to />)

    expect(wrapper.find(Timestamp).length).toBeTruthy()
  })

  test('Renders timestamp with from', () => {
    const wrapper = mount(<ChatBlock timestamp="time" from />)

    expect(wrapper.find(Timestamp).length).toBeTruthy()
  })
})

describe('Content', () => {
  test('Can render children content', () => {
    const wrapper = mount(<ChatBlock>Mugatu</ChatBlock>)
    const o = wrapper.find(`.${cx}__block`).first()

    expect(o.length).toBeTruthy()
    expect(o.getDOMNode().innerHTML).toContain('Mugatu')
  })

  test('Enhances Bubble child component', () => {
    const wrapper = mount(
      <ChatBlock to from ltr rtl timestamp="time">
        <Bubble />
      </ChatBlock>
    )
    const b = wrapper.find(`.${cx}__block`)
    const o = b.find(Bubble)
    const p = o.props()

    expect(o.length).toBeTruthy()
    expect(p.to).toBeTruthy()
    expect(p.from).toBeTruthy()
    expect(p.ltr).toBeTruthy()
    expect(p.rtl).toBeTruthy()
    expect(p.timestamp).toBeTruthy()
  })
})

describe('To/From', () => {
  test('Applies "from" styles, if defined', () => {
    const wrapper = mount(<ChatBlock from />)
    const o = wrapper.find(`.${cx}`)

    expect(o.getDOMNode().classList.contains('is-from')).toBeTruthy()
  })

  test('Applies "to" styles, if defined', () => {
    const wrapper = mount(<ChatBlock to />)
    const o = wrapper.find(`.${cx}`)

    expect(o.getDOMNode().classList.contains('is-to')).toBeTruthy()
  })
})

describe('Context', () => {
  test('Adds className based on context.theme', () => {
    const wrapper = mount(
      <Message.Provider theme="embed">
        <ChatBlock />
      </Message.Provider>
    )
    const el = wrapper.find(`.${cx}`)

    expect(el.props().className).toContain('is-theme-embed')
  })
})
