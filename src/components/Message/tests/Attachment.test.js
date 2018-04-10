import React from 'react'
import { shallow } from 'enzyme'
import Attachment from '../Attachment'
import Chat from '../Chat'

const cx = 'c-MessageAttachment'

const ui = {
  link: `.${cx}__link`,
  linkText: `.${cx}__linkText`,
  text: `.${cx}__text`
}

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Attachment />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Attachment className='mugatu' />)
    const o = wrapper.find(`.${cx}`)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Context', () => {
  test('Adds className based on context.theme', () => {
    const wrapper = shallow(
      <Attachment />
    , {context: {theme: 'embed'}})

    expect(wrapper.hasClass('is-theme-embed')).toBe(true)
  })
})

describe('Content', () => {
  test('Renders content within Text, if url not defined', () => {
    const wrapper = shallow(<Attachment filename='file.png' />)
    const t = wrapper.find(ui.text)
    const l = wrapper.find(ui.link)

    expect(t.length).toBeTruthy()
    expect(t.html()).toContain('file.png')
    expect(l.length).not.toBeTruthy()
  })

  test('Renders content within Link, if url is defined', () => {
    const wrapper = shallow(<Attachment filename='file.png' url='url' />)
    const t = wrapper.find(ui.text)
    const l = wrapper.find(ui.link)

    expect(t.length).not.toBeTruthy()
    expect(l.length).toBeTruthy()
    expect(l.html()).toContain('file.png')
  })

  test('Renders truncated text within link', () => {
    const wrapper = shallow(<Attachment filename='file.png' url='url' />)
    const t = wrapper.find(ui.linkText)

    expect(t.html()).toContain('file.png')
    expect(t.prop('truncate')).toEqual(true)
  })

  test('Renders text with has-noUrl styles, if url is not defined', () => {
    const wrapper = shallow(<Attachment filename='file.png' />)
    const t = wrapper.find(ui.text)

    expect(wrapper.hasClass('has-noUrl')).toBeTruthy()
    expect(t.hasClass('has-noUrl')).toBeTruthy()
  })

  test('Renders truncated text within non-link', () => {
    const wrapper = shallow(<Attachment filename='file.png' />)
    const t = wrapper.find(ui.text)

    expect(t.prop('truncate')).toEqual(true)
  })
})

describe('Download', () => {
  test('Provides download functionality, by default', () => {
    const wrapper = shallow(<Attachment filename='file.png' url='url' />)
    const o = wrapper.find(ui.link)

    expect(o.prop('download')).toBeTruthy()
    expect(o.html()).toContain('download')
  })

  test('Download can be disabled', () => {
    const wrapper = shallow(
      <Attachment filename='file.png' url='url' download={false} />
    )
    const o = wrapper.find(ui.link)

    expect(o.prop('download')).not.toBeTruthy()
    expect(o.html()).not.toContain('download')
  })

  test('Provides download link with title', () => {
    const wrapper = shallow(<Attachment filename='file.png' url='url' />)
    const o = wrapper.find(ui.link)

    expect(o.prop('title')).toBeTruthy()
    expect(o.prop('title')).toContain('file.png')
  })

  test('Provides download link with title', () => {
    const wrapper = shallow(<Attachment filename='file.png' url='url' />)
    const o = wrapper.find(ui.link)

    expect(o.prop('title')).toBeTruthy()
    expect(o.prop('title')).toContain('file.png')
  })

  test('Links should open in new tab, by default', () => {
    const wrapper = shallow(<Attachment filename='file.png' url='url' />)
    const o = wrapper.find(ui.link)

    expect(o.prop('target')).toBe('_blank')
  })

  test('Links should not open in new tab, if specified', () => {
    const wrapper = shallow(
      <Attachment filename='file.png' url='url' openDownloadInNewTab={false} />
    )
    const o = wrapper.find(ui.link)

    expect(o.prop('target')).not.toBe('_blank')
  })
})

describe('Uploading', () => {
  test('Does not render uploading spinner by default', () => {
    const wrapper = shallow(
      <Attachment />
    )
    const o = wrapper.find(Chat)

    expect(o.prop('caption')).not.toBeTruthy()
    expect(o.prop('isLoading')).not.toBeTruthy()
  })

  test('Can render Uploading UI, via Chat component, if specified', () => {
    const wrapper = shallow(
      <Attachment isUploading />
    )
    const o = wrapper.find(Chat)

    expect(o.prop('caption')).toBeTruthy()
    expect(o.prop('isLoading')).toBeTruthy()
  })

  test('Has default Uploading caption', () => {
    const wrapper = shallow(
      <Attachment isUploading />
    )
    const o = wrapper.find(Chat)

    expect(o.prop('caption')).toContain('Uploading')
    expect(o.prop('isLoading')).toBeTruthy()
  })

  test('Uploading caption can be customized', () => {
    const wrapper = shallow(
      <Attachment isUploading uploadingMessage='Yoyoyo' />
    )
    const o = wrapper.find(Chat)

    expect(o.prop('caption')).toContain('Yoyoyo')
    expect(o.prop('isLoading')).toBeTruthy()
  })

  test('Setting uploading message does not render uploading UI', () => {
    const wrapper = shallow(
      <Attachment uploadingMessage='Yoyoyo' />
    )
    const o = wrapper.find(Chat)

    expect(o.prop('caption')).not.toBeTruthy()
    expect(o.prop('isLoading')).not.toBeTruthy()
  })
})
