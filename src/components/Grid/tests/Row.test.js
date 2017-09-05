import React from 'react'
import { shallow } from 'enzyme'
import Row from '../Row'

describe('ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = shallow(<Row />)

    expect(wrapper.hasClass('o-row')).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = shallow(<Row className='mugatu' />)

    expect(wrapper.hasClass('mugatu')).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render child components', () => {
    const wrapper = shallow(
      <Row>
        <div className='mugatu' />
      </Row>
    )

    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })
})

describe('Flex', () => {
  test('Can render flex version of Row', () => {
    const wrapper = shallow(
      <Row flex />
    )

    expect(wrapper.hasClass('o-row-flex')).toBeTruthy()
    expect(wrapper.hasClass('o-row')).not.toBeTruthy()
  })
})

describe('Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const wrapper = shallow(<Row style={style} />)

    expect(wrapper.html()).toContain('style')
    expect(wrapper.html()).toContain('background')
    expect(wrapper.html()).toContain('red')
  })
})

describe('Size', () => {
  test('Can render an additional size', () => {
    const wrapper = shallow(
      <Row size='md' />
    )

    expect(wrapper.hasClass('o-row')).toBeTruthy()
    expect(wrapper.hasClass('o-row--md')).toBeTruthy()
  })

  test('Can render additional responsive sizes', () => {
    const wrapper = shallow(
      <Row size='md, sm@lg' />
    )

    expect(wrapper.hasClass('o-row')).toBeTruthy()
    expect(wrapper.hasClass('o-row--md')).toBeTruthy()
    expect(wrapper.hasClass('o-row--sm@lg')).toBeTruthy()
  })

  test('Can render sizes with flex variant', () => {
    const wrapper = shallow(
      <Row flex size='md' />
    )

    expect(wrapper.hasClass('o-row-flex')).toBeTruthy()
    expect(wrapper.hasClass('o-row-flex--md')).toBeTruthy()
    expect(wrapper.hasClass('o-row')).not.toBeTruthy()
  })
})
