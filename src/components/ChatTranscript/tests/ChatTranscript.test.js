import React from 'react'
import { shallow } from 'enzyme'
import ChatTranscript from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<ChatTranscript />)

    expect(wrapper.hasClass('c-ChatTranscript')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<ChatTranscript className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<ChatTranscript><div className='child'>Hello</div></ChatTranscript>)
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})
