import React from 'react'
import { shallow } from 'enzyme'
import Col from '../Col'

describe('ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = shallow(<Col />)

    expect(wrapper.hasClass('c-Col')).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = shallow(<Col className='mugatu' />)

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render child components', () => {
    const wrapper = shallow(
      <Col>
        <div className='mugatu' />
      </Col>
    )

    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })
})

describe('Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const wrapper = shallow(<Col style={style} />)

    expect(wrapper.html()).toContain('style')
    expect(wrapper.html()).toContain('background')
    expect(wrapper.html()).toContain('red')
  })
})

describe('Size', () => {
  test('Can render an additional size', () => {
    const wrapper = shallow(
      <Col size='8' />
    )

    expect(wrapper.hasClass('c-Col')).toBeTruthy()
    expect(wrapper.hasClass('c-Col-8')).toBeTruthy()
  })

  test('Can render additional sizes, separated by space', () => {
    const wrapper = shallow(
      <Col size='8 6@md 4@lg' />
    )

    expect(wrapper.hasClass('c-Col')).toBeTruthy()
    expect(wrapper.hasClass('c-Col-8')).toBeTruthy()
    expect(wrapper.hasClass('c-Col-6@md')).toBeTruthy()
    expect(wrapper.hasClass('c-Col-4@lg')).toBeTruthy()
  })

  test('Can render additional sizes, separated by comma', () => {
    const wrapper = shallow(
      <Col size='8,6@md, 4@lg' />
    )

    expect(wrapper.hasClass('c-Col')).toBeTruthy()
    expect(wrapper.hasClass('c-Col-8')).toBeTruthy()
    expect(wrapper.hasClass('c-Col-6@md')).toBeTruthy()
    expect(wrapper.hasClass('c-Col-4@lg')).toBeTruthy()
  })

  test('Can render additional sizes, separated by comma + space', () => {
    const wrapper = shallow(
      <Col size='8,6@md     4@lg' />
    )

    expect(wrapper.hasClass('c-Col')).toBeTruthy()
    expect(wrapper.hasClass('c-Col-8')).toBeTruthy()
    expect(wrapper.hasClass('c-Col-6@md')).toBeTruthy()
    expect(wrapper.hasClass('c-Col-4@lg')).toBeTruthy()
  })
})
