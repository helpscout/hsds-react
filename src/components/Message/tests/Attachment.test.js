import React from 'react'
import { shallow } from 'enzyme'
import Attachment from '../Attachment'

const cx = 'c-MessageAttachment'

const ui = {
  link: `.${cx}__link`,
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
})
