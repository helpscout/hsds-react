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

describe('Color', () => {
  test('Adds a custom color style, if supplied', () => {
    const wrapper = shallow(<Illo name='tick' size='40' color='red' />)

    expect(wrapper.prop('className')).toContain('has-color')
    expect(wrapper.prop('style').color).toContain('red')
  })

  test('Adds a custom secondary color className, if supplied', () => {
    const wrapper = shallow(<Illo name='tick' size='40' color='red' colorSecondary='blue' />)

    expect(wrapper.prop('className')).toContain('has-colorSecondary')
    expect(wrapper.prop('style').color).toContain('red')
  })
})

describe('Sizes', () => {
  test('Add sizing styles if applied', () => {
    const wrapper = shallow(<Illo name='chatListBlankSlate' size='40' />)

    expect(wrapper.prop('className')).toContain('is-40')
  })
})
