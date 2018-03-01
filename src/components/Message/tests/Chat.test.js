import React from 'react'
import { shallow } from 'enzyme'
import Bubble from '../Bubble'
import ChatBlock from '../ChatBlock'
import Chat from '../Chat'

const cx = 'c-MessageChat'

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
