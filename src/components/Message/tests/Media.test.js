import React from 'react'
import { mount, shallow } from 'enzyme'
import Chat from '../Chat'
import Media from '../Media'
import Message from '../Message'
import { Image, Modal, Text } from '../../'

const cx = 'c-MessageMedia'
const ui = {
  caption: `.${cx}__caption`,
  mediaContainer: `.${cx}__mediaContainer`
}

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
    const wrapper = mount(<Media />)
    const o = wrapper.find(ui.caption)

    expect(o.length).not.toBeTruthy()
  })

  test('Renders a caption, if defined', () => {
    const wrapper = mount(<Media caption='mugatu' />)
    const o = wrapper.find(ui.caption)

    expect(o.length).toBeTruthy()
    expect(o.find(Text).length).toBeTruthy()
  })

  test('Does not render caption, if theme is embed', () => {
    const wrapper = mount(
      <Message.Provider theme='embed'>
        <Media caption='mugatu' />
      </Message.Provider>
    )
    const o = wrapper.find(ui.caption)

    expect(o.length).not.toBeTruthy()
  })

  test('Passes caption to Chat component, if theme is embed', () => {
    const wrapper = mount(
      <Message.Provider theme='embed'>
        <Media caption='mugatu' />
      </Message.Provider>
    )
    const o = wrapper.find(Chat)

    expect(o.length).toBeTruthy()
    expect(o.prop('caption')).toBe('mugatu')
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

  test('onMediaClick callback is fired when image is clicked', () => {
    const spy = jest.fn()
    const url = './mugatu.png'
    const wrapper = shallow(<Media imageUrl={url} onMediaClick={spy} />)
    const o = wrapper.find(Image)

    o.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('onMediaLoad callback is fired when image is loaded', () => {
    const spy = jest.fn()
    const url = './mugatu.png'
    const wrapper = shallow(<Media imageUrl={url} onMediaLoad={spy} />)
    const o = wrapper.find(Image)

    o.simulate('load')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Modal', () => {
  test('Media renders into a modal by default', () => {
    const url = './mugatu.png'
    const wrapper = shallow(<Media imageUrl={url} />)
    const c = wrapper.find(ui.mediaContainer)
    const m = c.find(Modal)
    const o = m.find(Image)

    expect(m.length).toBeTruthy()
    expect(o.length).toBeTruthy()
  })

  test('Does not render if imageUrl is not defined', () => {
    const wrapper = shallow(<Media />)
    const c = wrapper.find(ui.mediaContainer)
    const m = wrapper.find(Modal)

    expect(c.length).not.toBeTruthy()
    expect(m.length).not.toBeTruthy()
  })

  test('Media does not render into a Modal, if specified', () => {
    const url = './mugatu.png'
    const wrapper = shallow(
      <Media imageUrl={url} openMediaInModal={false} />
    )
    const c = wrapper.find(ui.mediaContainer)
    const m = c.find(Modal)
    const o = c.find(Image)

    expect(c.length).toBeTruthy()
    expect(m.length).not.toBeTruthy()
    expect(o.length).toBeTruthy()
  })

  test('Modal does not render, if theme is embed, even if specified', () => {
    const url = './mugatu.png'
    const wrapper = mount(
      <Message.Provider theme='embed'>
        <Media imageUrl={url} openMediaInModal />
      </Message.Provider>
    )
    const c = wrapper.find(ui.mediaContainer)
    const m = c.find(Modal)
    const o = c.find(Image)

    expect(c.length).toBeTruthy()
    expect(m.length).not.toBeTruthy()
    expect(o.length).toBeTruthy()
  })
})

describe('Uploading', () => {
  test('Does not render uploading spinner by default', () => {
    const wrapper = shallow(
      <Media />
    )
    const o = wrapper.find(Chat)

    expect(o.prop('isLoading')).not.toBeTruthy()
  })

  test('Can render Uploading UI, via Chat component, if specified', () => {
    const wrapper = shallow(
      <Media isUploading />
    )
    const o = wrapper.find(Chat)

    expect(o.prop('isLoading')).toBeTruthy()
  })
})
