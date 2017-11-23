import React from 'react'
import { shallow } from 'enzyme'
import Illo from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Illo name='chatListBlankSlate' />)

    expect(wrapper.prop('className')).toContain('c-Illo')
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = shallow(<Illo name='chatListBlankSlate' className={className} />)

    expect(wrapper.prop('className')).toContain(className)
  })
})

describe('Sizes', () => {
  test('Add sizing styles if applied', () => {
    const wrapper = shallow(<Illo name='chatListBlankSlate' size='40' />)

    expect(wrapper.prop('className')).toContain('is-40')
  })
})
