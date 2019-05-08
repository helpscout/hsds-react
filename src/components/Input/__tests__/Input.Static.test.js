import React from 'react'
import { mount } from 'enzyme'
import Static from '../Input.Static'

describe('ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = mount(<Static />)

    expect(
      wrapper.getDOMNode().classList.contains('c-InputStatic')
    ).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = mount(<Static className="mugatu" />)

    expect(wrapper.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render child components', () => {
    const wrapper = mount(
      <Static>
        <div className="mugatu" />
      </Static>
    )

    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })
})

describe('Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const wrapper = mount(<Static style={style} />)

    expect(wrapper.html()).toContain('style')
    expect(wrapper.html()).toContain('background')
    expect(wrapper.html()).toContain('red')
  })
})

describe('Size', () => {
  test('Can render an additional size', () => {
    const wrapper = mount(<Static size="md" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-InputStatic')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-md')).toBeTruthy()
  })
})

describe('Alignment', () => {
  test('Can be aligned left', () => {
    const wrapper = mount(<Static align="left" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-InputStatic')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-block')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-left')).toBeTruthy()
  })

  test('Can be aligned center', () => {
    const wrapper = mount(<Static align="center" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-InputStatic')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-block')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-center')).toBeTruthy()
  })

  test('Can be aligned right', () => {
    const wrapper = mount(<Static align="right" />)

    expect(
      wrapper.getDOMNode().classList.contains('c-InputStatic')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-block')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-right')).toBeTruthy()
  })
})
