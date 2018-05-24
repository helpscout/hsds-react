import React from 'react'
import { shallow } from 'enzyme'
import rgbHex from 'rgb-hex'
import Input from '../../../components/Input'
import barista from '../helpers/barista'
import colors from '../helpers/colors'

const styles = barista(`
  @import "src/styles/components/Input/_index";
`)

describe('Base', () => {
  test('Simulates an input style', () => {
    const markup = shallow(<Input />).html()
    styles.html(markup)

    const o = styles.$('.c-InputBackdrop')

    expect(o.prop('background-color')).toBe('white')
    expect(o.prop('border')).toContain('1px solid')
    expect(o.prop('border-radius')).toBe('4px')
  })

  test('Absolulely positioned to parent', () => {
    const markup = shallow(<Input />).html()
    styles.html(markup)

    const o = styles.$('.c-InputBackdrop')

    expect(o.prop('position')).toBe('absolute')
    expect(o.prop('top')).toBe('0px')
    expect(o.prop('right')).toBe('0px')
    expect(o.prop('bottom')).toBe('0px')
    expect(o.prop('left')).toBe('0px')
  })
})

describe('Styles', () => {
  test('Removes borders if seamless', () => {
    const markup = shallow(<Input seamless />).html()
    styles.html(markup)

    const o = styles.$('.c-InputBackdrop')

    expect(o.prop('border-color')).toBe('transparent')
  })

  test('Absolutely positioned to parent', () => {
    const markup = shallow(<Input />).html()
    styles.html(markup)

    const o = styles.$('.c-InputBackdrop')

    expect(o.prop('position')).toBe('absolute')
    expect(o.prop('top')).toBe('0px')
    expect(o.prop('right')).toBe('0px')
    expect(o.prop('bottom')).toBe('0px')
    expect(o.prop('left')).toBe('0px')
  })
})

describe('States', () => {
  test('Applies error styles if defined', () => {
    const markup = shallow(<Input state="error" />).html()
    styles.html(markup)

    const o = styles.$('.c-InputBackdrop')

    expect(o.prop('border-color')).toBe(colors.red['500'])
  })

  test('Applies success styles if defined', () => {
    const markup = shallow(<Input state="success" />).html()
    styles.html(markup)

    const o = styles.$('.c-InputBackdrop')

    expect(o.prop('border-color')).toBe(colors.green['500'])
  })

  test('Applies warning styles if defined', () => {
    const markup = shallow(<Input state="warning" />).html()
    styles.html(markup)

    const o = styles.$('.c-InputBackdrop')

    expect(o.prop('border-color')).toBe(colors.yellow['500'])
  })

  test('Applies disabled styles if defined', () => {
    const markup = shallow(<Input disabled />).html()
    styles.html(markup)

    const o = styles.$('.c-InputBackdrop')
    const color = `#${rgbHex(o.prop('background-color'))}`

    expect(color).toContain(colors.grey['200'])
  })
})
