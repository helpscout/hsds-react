import * as React from 'react'
import { mount } from 'enzyme'
import Chat from '../Message.Chat'
import { Media } from '../Message.Media'
import Message from '../Message'
import { Image, Modal } from '../../index'

const cx = 'c-MessageMedia'
const ui = {
  caption: `.${cx}__caption`,
  loadingSpinner: `.${cx}__loadingSpinner`,
  mediaContainer: `.${cx}__mediaContainer`,
  media: `.${cx}__media`,
  mediaImage: `.${cx}__mediaImage`,
  tryAgainAction: `.${cx}__tryAgainAction`,
}

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = mount(<Media />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = mount(<Media className="mugatu" />)
    const o = wrapper.find(`.${cx}`).first()

    expect(o.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('Chat', () => {
  test('Contains a Chat component', () => {
    const wrapper = mount(<Media />)
    const o = wrapper.find(Chat)

    expect(o.length).toBeTruthy()
  })

  test('Chat inherits component classNames', () => {
    const wrapper = mount(<Media />)
    const o = wrapper.find(Chat)

    expect(o.getDOMNode().classList.contains(cx)).toBeTruthy()
  })

  test('Passes correct props to Chat', () => {
    const wrapper = mount(
      <Media
        from
        ltr
        primary
        isNote
        read
        rtl
        title="title"
        timestamp="time"
        to
      />
    )
    const props = wrapper.find(Chat).instance().props

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
  test('Does not renders a caption, if not defined', () => {
    const wrapper = mount(<Media />)
    const o = wrapper.find(ui.caption)

    expect(o.length).toBe(0)
  })

  test('Renders a caption, if defined', () => {
    const wrapper = mount(<Media caption="mugatu" />)
    const o = wrapper.find(ui.caption)

    expect(o.html()).toContain('mugatu')
  })

  test('Renders caption, if theme is embed', () => {
    const wrapper = mount(
      <Message.Provider theme="embed">
        <Media caption="mugatu" />
      </Message.Provider>
    )
    const o = wrapper.find(ui.caption)

    expect(o.length).toBeTruthy()
  })
})

describe('Image', () => {
  test('Does not render an Image by default', () => {
    const wrapper = mount(<Media className="mugatu" />)
    const o = wrapper.find(Image)

    expect(o.length).not.toBeTruthy()
  })

  test('Can set a maxHeight/maxWidth for the media', () => {
    const url = './mugatu.png'
    const wrapper = mount(
      <Media imageUrl={url} maxWidth={123} maxHeight={456} />
    )
    const o = wrapper.find('Image')

    expect(o.props().maxHeight).toBe(456)
    expect(o.props().maxWidth).toBe(123)
  })

  test('Can pass width/height props to Image', () => {
    const url = './mugatu.png'
    const wrapper = mount(<Media imageUrl={url} width={123} height={456} />)
    const o = wrapper.find('Image')

    expect(o.prop('width')).toBe(123)
    expect(o.prop('height')).toBe(456)
  })

  test('Renders an image if imageUrl is defined', () => {
    const url = './mugatu.png'
    const wrapper = mount(<Media imageUrl={url} />)
    const o = wrapper.find(Image)

    expect(o.length).toBeTruthy()
    expect(o.props().block).toBeTruthy()
    expect(o.props().src).toBe(url)
  })

  test('Renders an Image within a Modal', () => {
    const url = './mugatu.png'
    const wrapper = mount(<Media imageUrl={url} />)
    const m = wrapper.find(Modal)
    const o = m.find(Image)

    expect(m.length).toBeTruthy()
    expect(o.length).toBeTruthy()
  })

  test('onMediaClick callback is fired when image is clicked', () => {
    const spy = jest.fn()
    const url = './mugatu.png'
    const wrapper = mount(<Media imageUrl={url} onMediaClick={spy} />)
    const o = wrapper.find(Image)

    o.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('onMediaLoad callback is fired when image is loaded', () => {
    const spy = jest.fn()
    const url = './mugatu.png'
    const wrapper = mount(<Media imageUrl={url} onMediaLoad={spy} />)
    const o = wrapper.find(Image)

    o.simulate('load')

    expect(spy).toHaveBeenCalled()
  })

  test('getMediaMarkup does not pass maxHeight/maxWidth, unless defined', () => {
    const wrapper = mount(<Media imageUrl="m.jpg" width={100} height={50} />)
    const markup = wrapper.instance().getMediaMarkup()
    const o = mount(markup).find('img')

    expect(o.prop('style').width).toBe(undefined)
    expect(o.prop('style').height).toBe(undefined)
  })

  test('Renders a thumbnailImageUrl, if defined', () => {
    const wrapper = mount(<Media imageUrl="m.jpg" thumbnailImageUrl="t.jpg" />)
    const o = wrapper.find(Image)

    expect(o.prop('src')).toBe('t.jpg')
  })
})

describe('Modal', () => {
  test('Media renders into a modal by default', () => {
    const url = './mugatu.png'
    const wrapper = mount(<Media imageUrl={url} />)
    const c = wrapper.find(ui.mediaContainer)
    const m = c.find(Modal)
    const o = m.find(Image)

    expect(m.length).toBeTruthy()
    expect(o.length).toBeTruthy()
  })

  test('Does not render if imageUrl is not defined', () => {
    const wrapper = mount(<Media />)
    const c = wrapper.find(ui.mediaContainer)
    const m = wrapper.find(Modal)

    expect(c.length).not.toBeTruthy()
    expect(m.length).not.toBeTruthy()
  })

  test('Media does not render into a Modal, if specified', () => {
    const url = './mugatu.png'
    const wrapper = mount(<Media imageUrl={url} openMediaInModal={false} />)
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
      <Message.Provider theme="embed">
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

  test('Accepts custom className for modal', () => {
    const url = './mugatu.png'
    const wrapper = mount(<Media imageUrl={url} modalClassName="custom" />)
    const c = wrapper.find(Modal)

    expect(c.props().className).toContain('custom')
  })

  test('Accepts custom cardClassName for modal', () => {
    const url = './mugatu.png'
    const wrapper = mount(<Media imageUrl={url} modalCardClassName="custom" />)
    const c = wrapper.find(Modal)

    expect(c.props().cardClassName).toContain('custom')
  })

  test('Accepts custom wrapperClassName for modal', () => {
    const url = './mugatu.png'
    const wrapper = mount(
      <Media imageUrl={url} modalWrapperClassName="custom" />
    )
    const c = wrapper.find(Modal)

    expect(c.props().wrapperClassName).toContain('custom')
  })

  test('Accepts animation Props', () => {
    const url = './mugatu.png'
    const wrapper = mount(
      <Media
        imageUrl={url}
        modalAnimationDuration={123}
        modalAnimationEasing="linear"
        modalAnimationSequence="down"
        overlayAnimationDuration={456}
      />
    )
    const c = wrapper.find(Modal)

    expect(c.props().modalAnimationDuration).toBe(123)
    expect(c.props().modalAnimationEasing).toBe('linear')
    expect(c.props().modalAnimationSequence).toBe('down')
    expect(c.props().overlayAnimationDuration).toBe(456)
  })
})

describe('Uploading', () => {
  test('Does not render uploading spinner by default', () => {
    const wrapper = mount(<Media />)
    const o = wrapper.find(Chat)

    expect(o.prop('isLoading')).not.toBeTruthy()
  })

  test('Can render Uploading UI, if specified', () => {
    const wrapper = mount(<Media isUploading />)
    const o = wrapper.find(ui.loadingSpinner)

    expect(o.length).toBeTruthy()
  })
})

describe('Error', () => {
  test('Adds error class, if error', () => {
    const wrapper = mount(<Media caption="mugatu" error />)

    expect(wrapper.getDOMNode().classList.contains('is-error')).toBeTruthy()
  })

  test('Returns error message, if error', () => {
    const wrapper = mount(<Media caption="mugatu" error />)
    const o = wrapper.find(ui.caption)

    expect(o.html()).not.toContain('mugatu')
  })

  test('Can customize error', () => {
    const wrapper = mount(<Media caption="mugatu" error="Oops!" />)
    const o = wrapper.find(ui.caption)

    expect(o.html()).not.toContain('mugatu')
    expect(o.html()).toContain('Oops!')
  })

  test('Can customize errorMessage', () => {
    const wrapper = mount(<Media caption="mugatu" error errorMessage="Oops!" />)
    const o = wrapper.find(ui.caption)

    expect(o.html()).not.toContain('mugatu')
    expect(o.html()).toContain('Oops!')
  })

  test('Renders a "Try Again" action, if specified', () => {
    const wrapper = mount(
      <Media
        caption="mugatu"
        error
        showErrorTryAgainLink
        tryAgainLabel="Try again"
      />
    )
    const o = wrapper.find(ui.tryAgainAction).first()

    expect(o.length).toBe(1)
    expect(o.html()).toContain('Try again')
  })

  test('Can still click Media image, if error', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Media
        caption="mugatu"
        error={false}
        imageUrl="mugatu.jpg"
        onMediaClick={spy}
        showErrorTryAgainLink
        tryAgainLabel="Try again"
      />
    )
    const o = wrapper.find(ui.mediaImage).first()
    o.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('Does not render a "Try Again" action, no error', () => {
    const wrapper = mount(
      <Media
        caption="mugatu"
        error={false}
        showErrorTryAgainLink
        tryAgainLabel="Try again"
      />
    )
    const o = wrapper.find(ui.tryAgainAction).first()

    expect(o.length).toBe(0)
  })

  test('Try Again action fires callback once clicked', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Media
        caption="mugatu"
        error={true}
        showErrorTryAgainLink
        tryAgainLabel="Try again"
        onErrorTryAgainClick={spy}
      />
    )
    const o = wrapper.find(ui.tryAgainAction).first()
    const eventSpy = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    }

    o.simulate('click', eventSpy)

    expect(eventSpy.preventDefault).toHaveBeenCalled()
    expect(eventSpy.stopPropagation).toHaveBeenCalled()
    expect(spy).toHaveBeenCalled()
  })
})
