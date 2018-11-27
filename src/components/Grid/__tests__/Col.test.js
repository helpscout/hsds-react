import React from 'react'
import { mount } from 'enzyme'
import Col from '../Col'

describe('ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = mount(<Col />)

    expect(wrapper.getDOMNode().classList.contains('c-Col')).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = mount(<Col className="mugatu" />)

    expect(wrapper.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render child components', () => {
    const wrapper = mount(
      <Col>
        <div className="mugatu" />
      </Col>
    )

    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })
})

describe('Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const wrapper = mount(<Col style={style} />)

    expect(wrapper.html()).toContain('style')
    expect(wrapper.html()).toContain('background')
    expect(wrapper.html()).toContain('red')
  })
})

describe('Size', () => {
  test('Can render an additional size', () => {
    const wrapper = mount(<Col size="8" />)

    expect(wrapper.getDOMNode().classList.contains('c-Col')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-8')).toBeTruthy()
  })

  test('Can render additional sizes, separated by space', () => {
    const wrapper = mount(<Col size="8 6@md 4@lg" />)

    expect(wrapper.getDOMNode().classList.contains('c-Col')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-8')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-6@md')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-4@lg')).toBeTruthy()
  })

  test('Can render additional sizes, separated by comma', () => {
    const wrapper = mount(<Col size="8,6@md, 4@lg" />)

    expect(wrapper.getDOMNode().classList.contains('c-Col')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-8')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-6@md')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-4@lg')).toBeTruthy()
  })

  test('Can render additional sizes, separated by comma + space', () => {
    const wrapper = mount(<Col size="8,6@md     4@lg" />)

    expect(wrapper.getDOMNode().classList.contains('c-Col')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-8')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-6@md')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-4@lg')).toBeTruthy()
  })
})
