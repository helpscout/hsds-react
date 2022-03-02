import React from 'react'
import { mount } from 'enzyme'
import Col, { variantClassNames } from '../Grid.Col'

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

describe('variantClassNames', () => {
  test('Returns empty string by default', () => {
    expect(variantClassNames()).toBe('')
  })

  test('Returns empty string if first argument is invalid', () => {
    expect(variantClassNames('', 'sm')).toBe('')
    expect(variantClassNames(154, 'sm')).toBe('')
    expect(variantClassNames(['className'], 'sm')).toBe('')
    expect(variantClassNames(true, 'sm')).toBe('')
  })

  test('Combines className with variant, separated by hyphen', () => {
    expect(variantClassNames('ron', 'b')).toBe('ron-b')
  })

  test('Combines className + hyphens with variant, separated by hyphen', () => {
    expect(variantClassNames('ron---', 'b')).toBe('ron----b')
  })

  test('Combines className + hyphens + underscore with variant, separated by hyphen', () => {
    expect(variantClassNames('rons_epic-jazz--', 'flute')).toBe(
      'rons_epic-jazz---flute'
    )
  })

  describe('Variations', () => {
    test('Returns className if variant argument is invalid', () => {
      expect(variantClassNames('a', 1)).toBe('a')
      expect(variantClassNames('a', true)).toBe('a')
      expect(variantClassNames('a', [1, 2, 3])).toBe('a')
      expect(variantClassNames('a', ['1', '2', '3'])).toBe('a')
    })

    test('Generates className for every variant, separated by a single space', () => {
      expect(variantClassNames('a', '1 2 3')).toBe('a-1 a-2 a-3')
    })

    test('Generates className for every variant, separated by comma', () => {
      expect(variantClassNames('a', '1, 2, 3')).toBe('a-1 a-2 a-3')
    })

    test('Generates className for every variant, separated by comma + space mixture', () => {
      expect(variantClassNames('a', '1,2        3')).toBe('a-1 a-2 a-3')
    })

    test('Generates className + hyphen for every variant, separated by comma + space mixture', () => {
      expect(variantClassNames('a-', '1,2        3')).toBe('a--1 a--2 a--3')
    })
  })
})
