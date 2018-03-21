import React from 'react'
import { shallow } from 'enzyme'
import Bubble from '../Bubble'
import ChatBlock from '../ChatBlock'
import Chat from '../Chat'
import Caption from '../Caption'

const cx = 'c-MessageChat'
const ui = {
  caption: `.${cx}__caption`,
  error: `.${cx}__error`,
  metaState: `.${cx}__metaState`,
  loadingSpinner: `.${cx}__loadingSpinner`
}

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Chat />)

    expect(wrapper.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Chat className='mugatu' />)

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Bubble', () => {
  test('Contains Bubble component', () => {
    const wrapper = shallow(<Chat />)
    const o = wrapper.find(Bubble)

    expect(o.length).toBeTruthy()
  })

  test('Bubble does not inherit component classNames', () => {
    const wrapper = shallow(<Chat />)
    const o = wrapper.find(Bubble)

    expect(o.hasClass(cx)).not.toBeTruthy()
  })

  test('Renders content inside of Bubble', () => {
    const wrapper = shallow(<Chat>Mugatu</Chat>)
    const o = wrapper.find(Bubble)

    expect(o.node.props.children).toBe('Mugatu')
  })

  test('Passes correct props to Bubble', () => {
    const wrapper = shallow(
      <Chat
        body='body'
        from
        isNote
        ltr
        primary
        rtl
        size='sm'
        title='title'
        to
        typing
      />
    )
    const props = wrapper.find(Bubble).node.props

    expect(props.body).toBeTruthy()
    expect(props.from).toBeTruthy()
    expect(props.isNote).toBeTruthy()
    expect(props.ltr).toBeTruthy()
    expect(props.primary).toBeTruthy()
    expect(props.rtl).toBeTruthy()
    expect(props.size).toBeTruthy()
    expect(props.title).toBeTruthy()
    expect(props.to).toBeTruthy()
    expect(props.typing).toBeTruthy()
  })
})

describe('ChatBlock', () => {
  test('Contains a ChatBlock component', () => {
    const wrapper = shallow(<Chat />)
    const o = wrapper.find(ChatBlock)

    expect(o.length).toBeTruthy()
  })

  test('ChatBlock inherits component classNames', () => {
    const wrapper = shallow(<Chat />)
    const o = wrapper.find(ChatBlock)

    expect(o.hasClass(cx)).toBeTruthy()
  })

  test('Passes correct props to ChatBlock', () => {
    const wrapper = shallow(
      <Chat
        from
        to
        read
        ltr
        rtl
        timestamp='time'
      />
    )
    const props = wrapper.find(ChatBlock).node.props

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
    const wrapper = shallow(<Chat />)
    const o = wrapper.find(Caption)

    expect(o.length).not.toBeTruthy()
  })

  test('Renders a caption, if one is provided', () => {
    const wrapper = shallow(<Chat caption='Derek' />)
    const o = wrapper.find(Caption)

    expect(o.length).toBeTruthy()
    expect(o.prop('children')).toBe('Derek')
  })
})

describe('Error', () => {
  test('Does not render error by default', () => {
    const wrapper = shallow(<Chat />)
    const o = wrapper.find(ui.error)

    expect(o.length).toBe(0)
  })

  test('Renders error, if specified (bool)', () => {
    const wrapper = shallow(<Chat error />)
    const o = wrapper.find(ui.error)

    expect(o.length).toBe(1)
  })

  test('Renders error, if specified (string)', () => {
    const wrapper = shallow(<Chat error='nope' />)
    const o = wrapper.find(ui.error)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('nope')
  })

  test('Can customize the default error message', () => {
    const wrapper = shallow(<Chat error errorMessage='nope' />)
    const o = wrapper.find(ui.error)

    expect(o.length).toBe(1)
    expect(o.html()).toContain('nope')
  })
})

describe('Loading', () => {
  test('Does not render by default', () => {
    const wrapper = shallow(<Chat />)
    const o = wrapper.find(ui.metaState)
    const s = wrapper.find(ui.loadingSpinner)

    expect(o.length).toBe(0)
    expect(s.length).toBe(0)
  })

  test('Renders, if specified', () => {
    const wrapper = shallow(<Chat isLoading />)
    const o = wrapper.find(ui.metaState)
    const s = wrapper.find(ui.loadingSpinner)

    expect(o.length).toBe(1)
    expect(s.length).toBe(1)
    expect(o.find(ui.loadingSpinner).length).toBe(1)
  })

  test('Does not interfere with rendering of meta content', () => {
    const wrapper = shallow(<Chat isLoading caption='derek.jpg' error />)
    const o = wrapper.find(ui.metaState)
    const l = wrapper.find(ui.loadingSpinner)
    const c = wrapper.find(ui.caption)
    const e = wrapper.find(ui.error)

    expect(o.length).toBe(1)
    expect(l.length).toBe(1)
    expect(c.length).toBe(1)
    expect(e.length).toBe(1)
  })
})
