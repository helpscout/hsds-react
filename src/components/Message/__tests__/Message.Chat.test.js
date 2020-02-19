import * as React from 'react'
import cy from '@helpscout/cyan'
import { mount } from 'enzyme'

import Bubble from '../Message.Bubble'
import ChatBlock from '../Message.ChatBlock'
import Chat from '../Message.Chat'
import Caption from '../Message.Caption'

const cx = 'c-MessageChat'
const ui = {
  caption: `.${cx}__caption`,
  error: `.${cx}__error`,
  metaState: `.${cx}__metaState`,
  loadingSpinner: `.${cx}__loadingSpinner`,
}

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Chat />)

    expect(wrapper.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Chat className="mugatu" />)

    expect(wrapper.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('Bubble', () => {
  test('Contains Bubble component', () => {
    const wrapper = mount(<Chat />)
    const o = wrapper.find(Bubble)

    expect(o.length).toBeTruthy()
  })

  test('Bubble does not inherit component classNames', () => {
    const wrapper = mount(<Chat />)
    const o = wrapper.find(Bubble)

    expect(o.getDOMNode().classList.contains(cx)).not.toBeTruthy()
  })

  test('Renders content inside of Bubble', () => {
    const wrapper = mount(<Chat>Mugatu</Chat>)
    const o = wrapper.find(Bubble)

    expect(o.instance().props.children).toBe('Mugatu')
  })

  test('Passes correct props to Bubble', () => {
    const wrapper = mount(
      <Chat body="body" from isNote ltr rtl size="sm" title="title" to typing />
    )
    const props = wrapper.find(Bubble).instance().props

    expect(props.body).toBeTruthy()
    expect(props.from).toBeTruthy()
    expect(props.isNote).toBeTruthy()
    expect(props.ltr).toBeTruthy()
    expect(props.rtl).toBeTruthy()
    expect(props.size).toBeTruthy()
    expect(props.title).toBeTruthy()
    expect(props.to).toBeTruthy()
    expect(props.typing).toBeTruthy()
  })
})

describe('ChatBlock', () => {
  test('Contains a ChatBlock component', () => {
    const wrapper = mount(<Chat />)
    const o = wrapper.find(ChatBlock)

    expect(o.length).toBeTruthy()
  })

  test('ChatBlock inherits component classNames', () => {
    const wrapper = mount(<Chat />)
    const o = wrapper.find(ChatBlock)

    expect(o.getDOMNode().classList.contains(cx)).toBeTruthy()
  })

  test('Passes correct props to ChatBlock', () => {
    const wrapper = mount(<Chat from to read ltr rtl timestamp="time" />)
    const props = wrapper.find(ChatBlock).instance().props

    expect(props.from).toBeTruthy()
    expect(props.to).toBeTruthy()
    expect(props.read).toBeTruthy()
    expect(props.ltr).toBeTruthy()
    expect(props.rtl).toBeTruthy()
    expect(props.timestamp).toBeTruthy()
  })
})

describe('Caption', () => {
  test('Does not render a Caption by default', () => {
    const wrapper = mount(<Chat />)
    const o = wrapper.find(Caption)

    expect(o.length).not.toBeTruthy()
  })

  test('Renders a caption, if one is provided', () => {
    const wrapper = mount(<Chat caption="Derek" />)
    const o = wrapper.find(Caption)

    expect(o.length).toBeTruthy()
    expect(o.prop('children')).toBe('Derek')
  })
})

describe('Error', () => {
  test('Does not render error by default', () => {
    const wrapper = mount(<Chat />)
    const o = wrapper.find(ui.error)

    expect(o.length).toBe(0)
  })

  test('Renders error, if specified (bool)', () => {
    const wrapper = mount(<Chat error />)
    const o = wrapper.find(ui.error)

    expect(o.length).toBe(1)
  })

  test('Renders error, if specified (string)', () => {
    const wrapper = mount(<Chat error="nope" />)
    const o = wrapper.find(ui.error)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('nope')
  })

  test('Can customize the default error message', () => {
    const wrapper = mount(<Chat error errorMessage="nope" />)
    const o = wrapper.find(ui.error)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('nope')
  })
})

describe('Loading', () => {
  test('Does not render by default', () => {
    const wrapper = mount(<Chat />)
    const o = wrapper.find(ui.metaState)
    const s = wrapper.find(ui.loadingSpinner)

    expect(o.length).toBe(0)
    expect(s.length).toBe(0)
  })

  test('Renders, if specified', () => {
    const wrapper = mount(<Chat isLoading />)
    const o = wrapper.find(ui.metaState).first()
    const s = wrapper.find(ui.loadingSpinner).first()

    expect(o.length).toBe(1)
    expect(s.length).toBe(1)
    expect(o.find(ui.loadingSpinner).first().length).toBe(1)
  })

  test('Does not interfere with rendering of meta content', () => {
    const wrapper = mount(<Chat isLoading caption="derek.jpg" error />)
    const o = wrapper.find(ui.metaState).first()
    const l = wrapper.find(ui.loadingSpinner).first()
    const c = wrapper.find(ui.caption).first()
    const e = wrapper.find(ui.error).first()

    expect(o.length).toBe(1)
    expect(l.length).toBe(1)
    expect(c.length).toBe(1)
    expect(e.length).toBe(1)
  })
})

describe('Meta', () => {
  test('Renders meta', () => {
    const wrapper = cy.render(<Chat caption="test" />)

    expect(wrapper.get('.c-MessageChat__meta').exists()).toBeTruthy()
    expect(wrapper.get('.c-MessageChat__meta').text()).toBe('test')
  })

  test('Renders meta before the bubble', () => {
    const wrapper = cy.render(<Chat caption="test" metaPosition="top" />)

    expect(
      wrapper
        .get('.c-MessageChatBlock')
        .children()
        .first()
        .hasClassName('c-MessageChat__meta')
    ).toBeTruthy()
  })

  test('Renders meta after bubble by default', () => {
    const wrapper = cy.render(<Chat caption="test" />)

    expect(
      wrapper
        .get('.c-MessageChatBlock')
        .children()
        .last()
        .hasClassName('c-MessageChat__meta')
    ).toBeTruthy()
  })

  test('Renders meta after bubble when passing random value', () => {
    const wrapper = cy.render(<Chat caption="test" metaPostion="noclue" />)

    expect(
      wrapper
        .get('.c-MessageChatBlock')
        .children()
        .last()
        .hasClassName('c-MessageChat__meta')
    ).toBeTruthy()
  })
})
