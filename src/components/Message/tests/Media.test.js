import React from 'react'
import { shallow } from 'enzyme'
import Chat from '../Chat'
import Media from '../Media'
import { Image, Modal, Text } from '../../'

const cx = 'c-MessageMedia'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Media />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Media className='mugatu' />)
    const o = wrapper.find(`.${cx}`)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Chat', () => {
  test('Contains a Chat component', () => {
    const wrapper = shallow(<Media />)
    const o = wrapper.find(Chat)

    expect(o.length).toBeTruthy()
  })

  test('Chat inherits component classNames', () => {
    const wrapper = shallow(<Media />)
    const o = wrapper.find(Chat)

    expect(o.hasClass(cx)).toBeTruthy()
  })

  test('Passes correct props to Chat', () => {
    const wrapper = shallow(
      <Media
        from
        ltr
        primary
        isNote
        read
        rtl
        title='title'
        timestamp='time'
        to
      />
    )
    const props = wrapper.find(Chat).node.props

    expect(props.from).toBeTruthy()
    expect(props.isNote).toBeTruthy()
    expect(props.ltr).toBeTruthy()
    expect(props.primary).toBeTruthy()
    expect(props.read).toBeTruthy()
    expect(props.rtl).toBeTruthy()
    expect(props.title).toBeTruthy()
    expect(props.timestamp).toBeTruthy()
    expect(props.to).toBeTruthy()
  })
})

describe('Caption', () => {
  test('Does not render a caption by default', () => {
    const wrapper = shallow(<Media />)
    const o = wrapper.find(`.${cx}__caption`)

    expect(o.length).not.toBeTruthy()
  })

  test('Renders a caption, if defined', () => {
    const wrapper = shallow(<Media caption='mugatu' />)
    const o = wrapper.find(`.${cx}__caption`)

    expect(o.length).toBeTruthy()
    expect(o.find(Text).length).toBeTruthy()
  })
})

describe('Image', () => {
  test('Does not render an Image by default', () => {
    const wrapper = shallow(<Media className='mugatu' />)
    const o = wrapper.find(Image)

    expect(o.length).not.toBeTruthy()
  })

  test('Renders an image if imageUrl is defined', () => {
    const url = './mugatu.png'
    const wrapper = shallow(<Media imageUrl={url} />)
    const o = wrapper.find(Image)

    expect(o.length).toBeTruthy()
    expect(o.props().block).toBeTruthy()
    expect(o.props().src).toBe(url)
  })

  test('Renders an Image within a Modal', () => {
    const url = './mugatu.png'
    const wrapper = shallow(<Media imageUrl={url} />)
    const m = wrapper.find(Modal)
    const o = m.find(Image)

    expect(m.length).toBeTruthy()
    expect(o.length).toBeTruthy()
  })
})
