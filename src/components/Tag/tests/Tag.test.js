import React from 'react'
import { shallow } from 'enzyme'
import Tag from '..'
import { Text } from '../../index'

const cx = 'c-Tag'

describe('ClassNames', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Tag />)
    const o = wrapper.find(`.${cx}`)

    expect(o.length).toBeTruthy()
  })

  test('Accepts custom classNames', () => {
    const wrapper = shallow(<Tag className='mugatu' />)
    const o = wrapper.find(`.${cx}`)

    expect(o.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Content', () => {
  test('Wraps children components in <Text> ', () => {
    const wrapper = shallow(
      <Tag>Mugatu</Tag>
    )
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Mugatu')
    expect(o.props().size).toBe('13')
  })
})

describe('Styles', () => {
  test('Has allCaps styles', () => {
    const wrapper = shallow(<Tag allCaps />)
    const o = wrapper.find(Text)

    expect(o.props().allCaps).toBeTruthy()
    expect(o.props().size).not.toBe('13')
  })

  test('Has color styles', () => {
    const wrapper = shallow(<Tag color='red' />)

    expect(wrapper.hasClass('is-red')).toBeTruthy()
  })

  test('Has filled styles', () => {
    const wrapper = shallow(<Tag filled />)

    expect(wrapper.hasClass('is-filled')).toBeTruthy()
  })

  test('Has pulsing styles', () => {
    const wrapper = shallow(<Tag pulsing />)

    expect(wrapper.hasClass('is-pulsing')).toBeTruthy()
  })
})
