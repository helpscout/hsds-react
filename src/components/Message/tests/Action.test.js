import React from 'react'
import { shallow } from 'enzyme'
import ChatBlock from '../ChatBlock'
import Action from '../Action'
import { Text } from '../../'

const cx = 'c-MessageAction'
const ui = {
  action: `.${cx}`,
  text: `.${cx}__text`
}

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Action />)
    const o = wrapper.find(ui.action)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Action className='mugatu' />)
    const o = wrapper.find(ui.action)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('ChatBlock', () => {
  test('Contains a ChatBlock component', () => {
    const wrapper = shallow(<Action />)
    const o = wrapper.find(ChatBlock)

    expect(o.length).toBeTruthy()
  })

  test('ChatBlock does not inherit component classNames', () => {
    const wrapper = shallow(<Action />)
    const o = wrapper.find(ChatBlock)

    expect(o.hasClass(cx)).not.toBeTruthy()
  })

  test('Passes correct props to ChatBlock', () => {
    const wrapper = shallow(
      <Action
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

describe('Content', () => {
  test('Wraps children in a Text component', () => {
    const wrapper = shallow(
      <Action>
        Relax
      </Action>
    )
    const o = wrapper.find(Text)

    expect(o.length).toBeTruthy()
    expect(o.node.props.children).toBe('Relax')
  })
})

describe('Context', () => {
  test('Adds className based on context.theme', () => {
    const wrapper = shallow(
      <Action />
    , {context: {theme: 'embed'}})
    const o = wrapper.find(ui.action)

    expect(o.hasClass('is-theme-embed')).toBe(true)
  })

  test('Change text props based on context.theme', () => {
    const wrapper = shallow(
      <Action />
    , {context: {theme: 'embed'}})
    let o = wrapper.find(ui.text)

    expect(o.props().size).toBe('11')
    expect(o.props().shade).toBe('faint')

    wrapper.setContext({theme: 'admin'})
    o = wrapper.find(ui.text)

    expect(o.props().size).toBe('13')
    expect(o.props().shade).toBe('muted')
  })
})
