import React from 'react'
import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import Chat from '../Message.Chat'
import ChatBlock from '../Message.ChatBlock'
import Bubble from '../Message.Bubble'
import Caption from '../Message.Caption'

const cx = 'c-MessageChat'
const cxBubble = 'c-MessageBubble'
const ui = {
  caption: `.${cx}__caption`,
  error: `.${cx}__error`,
  metaState: `.${cx}__metaState`,
  loadingSpinner: `.${cx}__loadingSpinner`,
}

describe('Bubble', () => {
  test('Contains Bubble component', () => {
    const wrapper = mount(<Chat />)
    const o = wrapper.find(`.${cxBubble}`).first()
    expect(o.length).toBeTruthy()
  })

  test('Bubble does not inherit component classNames', () => {
    const wrapper = mount(<Chat />)
    const o = wrapper.find(`.${cxBubble}`).first()

    expect(o.getDOMNode().classList.contains(cx)).not.toBeTruthy()
  })

  test('Renders content inside of Bubble', () => {
    const wrapper = mount(<Chat>Mugatu</Chat>)
    const o = wrapper.find(`.${cxBubble}`)
    expect(o.first().text()).toContain('Mugatu')
  })

  test('Renders body inside of Bubble', () => {
    const wrapper = mount(<Chat body="bodytest">Mugatu</Chat>)
    const o = wrapper.find(`.c-MessageBubble__body`)
    expect(o.first().text()).toContain('bodytest')
  })

  test('Passes correct props to Bubble', () => {
    const wrapper = mount(
      <Chat body="body" from isNote ltr rtl size="sm" title="title" to typing />
    )
    const props = wrapper.find(Bubble).getElement().props

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
    const { container } = render(<Chat caption="test" />)

    expect(container.querySelector('.c-MessageChat__meta')).toBeInTheDocument()
    expect(container.querySelector('.c-MessageChat__meta').textContent).toBe(
      'test'
    )
  })

  test('Renders meta before the bubble', () => {
    const { container } = render(<Chat caption="test" metaPosition="top" />)

    expect(
      container
        .querySelector('.c-MessageChatBlock')
        .children[0].classList.contains('c-MessageChat__meta')
    ).toBeTruthy()
  })

  test('Renders meta after bubble by default', () => {
    const { container } = render(<Chat caption="test" />)

    const children = container.querySelector('.c-MessageChatBlock').children

    expect(
      children[children.length - 1].classList.contains('c-MessageChat__meta')
    ).toBeTruthy()
  })

  test('Renders meta after bubble when passing random value', () => {
    const { container } = render(<Chat caption="test" metaPostion="noclue" />)

    const children = container.querySelector('.c-MessageChatBlock').children

    expect(
      children[children.length - 1].classList.contains('c-MessageChat__meta')
    ).toBeTruthy()
  })
})
