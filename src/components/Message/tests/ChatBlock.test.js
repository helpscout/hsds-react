import React from 'react'
import { mount, shallow } from 'enzyme'
import Action from '../Action'
import ChatBlock from '../ChatBlock'
import Bubble from '../Bubble'
import { Animate, Flexy, Timestamp } from '../../'

const cx = 'c-MessageChatBlock'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<ChatBlock />)

    expect(wrapper.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<ChatBlock className='mugatu' />)

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Timestamp', () => {
  test('Renders timestamp on mouseenter', () => {
    const wrapper = mount(<ChatBlock timestamp='time' to />)
    const o = wrapper.find(Animate)

    wrapper.simulate('mouseenter')

    expect(wrapper.find(Timestamp).length).toBeTruthy()
    expect(o.props().in).toBeTruthy()
  })

  test('Hides timestamp on mouseleave', () => {
    const wrapper = mount(<ChatBlock timestamp='time' to />)
    const o = wrapper.find(Animate)

    wrapper.simulate('mouseenter')

    expect(wrapper.find(Timestamp).length).toBeTruthy()

    wrapper.simulate('mouseleave')

    expect(o.props().in).toBeFalsy()
  })

  test('Renders as first child, if to props is set', () => {
    const wrapper = mount(<ChatBlock timestamp='time' to />)
    const f = wrapper.find(Flexy)

    expect(f.children().nodes[0].props.className).toContain(`${cx}__timestamp`)
  })

  test('Renders as last child, if to props is set', () => {
    const wrapper = mount(<ChatBlock timestamp='time' from />)
    const f = wrapper.find(Flexy)

    expect(f.children().nodes[1].props.className).toContain(`${cx}__timestamp`)
  })
})

describe('Content', () => {
  test('Can render children content', () => {
    const wrapper = mount(<ChatBlock>Mugatu</ChatBlock>)
    const o = wrapper.find(`.${cx}__block`)

    expect(o.length).toBeTruthy()
    expect(o.node.innerHTML).toContain('Mugatu')
  })

  test('Enhances Action child component', () => {
    const wrapper = mount(
      <ChatBlock
        to
        from
        ltr
        rtl
        timestamp='time'
      >
        <Action />
      </ChatBlock>
    )
    const b = wrapper.find(`.${cx}__block`)
    const o = b.find(Action)
    const p = o.props()

    expect(o.length).toBeTruthy()
    expect(p.to).toBeTruthy()
    expect(p.from).toBeTruthy()
    expect(p.ltr).toBeTruthy()
    expect(p.rtl).toBeTruthy()
    expect(p.timestamp).toBeTruthy()
  })

  test('Enhances Bubble child component', () => {
    const wrapper = mount(
      <ChatBlock
        to
        from
        ltr
        rtl
        timestamp='time'
      >
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

    expect(o.hasClass('is-from')).toBeTruthy()
  })

  test('Applies "to" styles, if defined', () => {
    const wrapper = mount(<ChatBlock to />)
    const o = wrapper.find(`.${cx}`)

    expect(o.hasClass('is-to')).toBeTruthy()
  })

  test('Aligns to left if from', () => {
    const wrapper = mount(<ChatBlock from />)
    const o = wrapper.find(Flexy)

    expect(o.props().just).toBe('left')
  })

  test('Aligns to right if to', () => {
    const wrapper = mount(<ChatBlock to />)
    const o = wrapper.find(Flexy)

    expect(o.props().just).toBe('right')
  })
})
