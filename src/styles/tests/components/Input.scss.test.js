import React from 'react'
import { shallow } from 'enzyme'
import Input from '../../../components/Input'
import barista from '../helpers/barista'

const styles = barista(`
  @import "src/styles/components/Input/_index";
`)

describe('Input', () => {
  test('Should be display flex', () => {
    const markup = shallow(<Input />).html()
    styles.html(markup)

    const o = styles.$('.c-Input')

    expect(o.prop('align-items')).toBe('center')
    expect(o.prop('display')).toBe('flex')
  })
})

describe('Prefix/Suffix', () => {
  test('Should be dimmed by default', () => {
    const markup = shallow(<Input prefix="Prefix" />).html()
    styles.html(markup)

    const o = styles.$('.c-Input__prefix')

    expect(o.prop('opacity')).not.toBe('1')
  })

  test('Should be full opacity if input has value', () => {
    const markup = shallow(<Input prefix="Prefix" value="Value" />).html()
    styles.html(markup)

    const o = styles.$('.c-Input__prefix')

    expect(o.prop('opacity')).toBe('1')
  })

  test('Should prevent text-wrapping', () => {
    const markup = shallow(<Input prefix="Prefix" />).html()
    styles.html(markup)

    const o = styles.$('.c-Input__prefix')

    expect(o.prop('white-space')).toBe('nowrap')
  })
})

describe('Multiline', () => {
  test('Should not be resizable by default', () => {
    const markup = shallow(<Input multiline />).html()
    styles.html(markup)

    const o = styles.$('.c-InputField')

    expect(o.prop('resize')).toBe('none')
    expect(o.prop('overflow')).toBe('hidden')
  })

  test('Applies resizable styles if set', () => {
    const markup = shallow(<Input multiline resizable />).html()
    styles.html(markup)

    const o = styles.$('.c-InputField')

    expect(o.prop('resize')).toBe('vertical')
  })
})
