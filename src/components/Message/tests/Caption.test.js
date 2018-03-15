import React from 'react'
import { shallow } from 'enzyme'
import Caption from '../Caption'

const cx = 'c-MessageCaption'

const ui = {
  text: `.${cx}__text`
}

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Caption />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Caption className='mugatu' />)
    const o = wrapper.find(`.${cx}`)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Context', () => {
  test('Adds className based on context.theme', () => {
    const wrapper = shallow(
      <Caption />
    , {context: {theme: 'embed'}})

    expect(wrapper.hasClass('is-theme-embed')).toBe(true)
  })
})

describe('Text', () => {
  test('Does not have reduced text size by default', () => {
    const wrapper = shallow(<Caption>hello</Caption>)
    const o = wrapper.find(ui.text)

    expect(o.prop('size')).toBe('13')
  })

  test('Reduces text size for embed themed Captions', () => {
    const wrapper = shallow(
      <Caption>hello</Caption>
    , {context: {theme: 'embed'}})
    const o = wrapper.find(ui.text)

    expect(o.prop('size')).toBe('11')
  })

  test('Applies wordWrap by default', () => {
    const wrapper = shallow(
      <Caption>hello</Caption>
    , {context: {theme: 'embed'}})
    const o = wrapper.find(ui.text)

    expect(o.prop('wordWrap')).toBe(true)
  })

  test('wordWrap can be disabled', () => {
    const wrapper = shallow(
      <Caption wordWrap={false}>hello</Caption>
    , {context: {theme: 'embed'}})
    const o = wrapper.find(ui.text)

    expect(o.prop('wordWrap')).toBe(false)
  })
})
