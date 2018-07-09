import React from 'react'
import { mount, shallow } from 'enzyme'
import { AttachmentList } from '../index'
import { Attachment, Icon } from '../../index'

const ui = {
  content: '.c-AttachmentList__content',
  list: {
    item: '.c-AttachmentList__inlineListItem',
    download: '.c-AttachmentList__inlineListItemDownloadAll',
  },
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<AttachmentList />)

    expect(wrapper.hasClass('c-AttachmentList')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<AttachmentList className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Custom attributes', () => {
  test('Can render custom HTML attributes', () => {
    const wrapper = shallow(<AttachmentList data-tie="piano-key" />)
    const html = wrapper.html()

    expect(html).toContain('data-tie')
    expect(html).toContain('piano-key')
  })
})

describe('Children', () => {
  test('Does not render non-Attachment child content', () => {
    const wrapper = shallow(
      <AttachmentList>
        <div className="child">Hello</div>
      </AttachmentList>
    )
    const o = wrapper.find('div.child')

    expect(o.length).toBeFalsy()
  })

  test('Renders Attachment children', () => {
    const wrapper = shallow(
      <AttachmentList>
        <Attachment />
        <Attachment />
        <Attachment />
      </AttachmentList>
    )
    const o = wrapper.find(ui.list.item)

    expect(o.length).toBe(3)
  })
})

describe('Download All', () => {
  test('Does not render if there is only 1 attachment', () => {
    const wrapper = shallow(
      <AttachmentList>
        <Attachment />
      </AttachmentList>
    )
    const o = wrapper.find(ui.list.item)
    const d = wrapper.find(ui.list.download)

    expect(o.length).toBe(1)
    expect(d.length).toBe(0)
  })

  test('Renders by default for more than 1 attachment', () => {
    const wrapper = shallow(
      <AttachmentList>
        <Attachment />
        <Attachment />
      </AttachmentList>
    )
    const o = wrapper.find(ui.list.item)
    const d = wrapper.find(ui.list.download)

    expect(o.length).toBe(2)
    expect(d.length).toBe(1)
  })

  test('Can be disabled', () => {
    const wrapper = shallow(
      <AttachmentList showDownloadAll={false}>
        <Attachment />
        <Attachment />
      </AttachmentList>
    )
    const o = wrapper.find(ui.list.item)
    const d = wrapper.find(ui.list.download)

    expect(o.length).toBe(2)
    expect(d.length).toBe(0)
  })

  test('Fires callback on click', () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <AttachmentList onDownloadAllClick={spy}>
        <Attachment />
        <Attachment />
      </AttachmentList>
    )
    const d = wrapper.find(ui.list.download).find(Attachment)

    d.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Icon', () => {
  test('Has Attachment Icon', () => {
    const wrapper = shallow(<AttachmentList />)
    const o = wrapper.find(Icon)

    expect(o.prop('name')).toBe('attachment')
    expect(o.length).toBe(1)
  })
})

describe('Theme', () => {
  test('Renders default theme styles, if wrapped in Provider', () => {
    const wrapper = mount(
      <Attachment.Provider>
        <AttachmentList />
      </Attachment.Provider>
    )
    const o = wrapper.find(AttachmentList)

    expect(o.length).toBe(1)
    expect(o.hasClass('is-theme-default')).toBeTruthy()
  })

  test('Renders theme styles, if provided', () => {
    const wrapper = mount(
      <Attachment.Provider theme="preview">
        <AttachmentList />
      </Attachment.Provider>
    )
    const o = wrapper.find(AttachmentList)

    expect(o.length).toBe(1)
    expect(o.hasClass('is-theme-preview')).toBeTruthy()
  })
})
