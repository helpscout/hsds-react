import React from 'react'
import { mount } from 'enzyme'
import EmojiPicker from '..'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-EmojiPicker',
  skipChildrenTest: true
}

baseComponentTest(EmojiPicker, baseComponentOptions)

describe('Preview', () => {
  test('Does not show preview by default', () => {
    const wrapper = mount(<EmojiPicker />)

    expect(wrapper.props().showPreview).not.toBeTruthy()
    expect(wrapper.hasClass('is-hide-preview')).toBeTruthy()
    expect(wrapper.hasClass('is-show-preview')).not.toBeTruthy()
    wrapper.unmount()
  })

  test('Preview can be enabled', () => {
    const wrapper = mount(<EmojiPicker showPreview />)

    expect(wrapper.props().showPreview).toBeTruthy()
    expect(wrapper.hasClass('is-hide-preview')).not.toBeTruthy()
    expect(wrapper.hasClass('is-show-preview')).toBeTruthy()
    wrapper.unmount()
  })
})
