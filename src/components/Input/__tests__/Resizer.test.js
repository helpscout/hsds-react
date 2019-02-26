import React from 'react'
import { mount } from 'enzyme'
import Resizer from '../Resizer'

describe('onResize', () => {
  test('Is called when mounted', () => {
    const spy = jest.fn()
    mount(<Resizer onResize={spy} />)

    expect(spy).toHaveBeenCalled()
  })
})

describe('ReplaceEntity', () => {
  test('Converts greater/less than characters', () => {
    const wrapper = mount(<Resizer contents="<strong>News team!</strong>" />)
    const o = wrapper.find('.c-InputGhost').first()
    const html = o
      .html()
      .replace('<div class="c-InputGhost">', '')
      .replace('</div>', '')

    expect(html).not.toContain('<strong>')
    expect(html).toContain('&lt;')
    expect(html).toContain('&gt;')
    expect(html).toContain('&lt;strong&gt;')
  })

  test('Converts \\n characters to <br>', () => {
    const wrapper = mount(<Resizer contents={`\nSan Diego\n`} />)
    const o = wrapper.find('.c-InputGhost').first()
    const html = o
      .html()
      .replace('<div class="c-InputGhost">', '')
      .replace('</div>', '')

    expect(html).not.toContain('\n')
    expect(html).toContain('<br>San Diego<br>')
  })

  test('Converts & characters to &amp;', () => {
    const wrapper = mount(<Resizer contents="San & Diego" />)
    const o = wrapper.find('.c-InputGhost').first()
    const html = o
      .html()
      .replace('<div class="c-InputGhost">', '')
      .replace('</div>', '')
      .replace('<br>', '')

    expect(html).toContain('San &amp; Diego')
  })

  test('Does not convert if content does not contain special characters', () => {
    const wrapper = mount(<Resizer contents="San Diego" />)
    const o = wrapper.find('.c-InputGhost').first()
    const html = o
      .html()
      .replace('<div class="c-InputGhost">', '')
      .replace('</div>', '')
      .replace('<br>', '')

    expect(html).toContain('San Diego')
  })
})

describe('InputGhost', () => {
  test('Renders an InputGhost', () => {
    const wrapper = mount(<Resizer />)
    const o = wrapper.find('.c-InputGhost')

    expect(o.exists()).toBeTruthy()
    expect(o.last().html()).toContain('<br>')
  })

  test('Adds a <br> for every line', () => {
    const wrapper = mount(<Resizer minimumLines={5} />)
    const o = wrapper.find('.c-InputGhost')

    expect(o.last().html()).toContain('<br><br><br><br><br>')
  })

  test('Does not render content InputGhost if minimumLines is falsey', () => {
    const wrapper = mount(<Resizer minimumLines={0} />)
    const o = wrapper.find('div.c-InputGhost')

    expect(o.length).toBe(1)
  })
})

describe('Styles', () => {
  test('Applies seamless styles to child components, if specified', () => {
    const wrapper = mount(<Resizer seamless />)
    const o = wrapper.find('.c-InputGhost').first()
    const p = wrapper.find('.c-InputGhost').last()

    expect(o.hasClass('is-seamless')).toBeTruthy()
    expect(p.hasClass('is-seamless')).toBeTruthy()
  })

  test('Does not apply seamless styles to child components, if not specified', () => {
    const wrapper = mount(<Resizer seamless={false} />)
    const o = wrapper.find('.c-InputGhost').first()
    const p = wrapper.find('.c-InputGhost').last()

    expect(o.hasClass('is-seamless')).not.toBeTruthy()
    expect(p.hasClass('is-seamless')).not.toBeTruthy()
  })
})

describe('offsetAmount', () => {
  test('Adds offsetChars, if specified', () => {
    const wrapper = mount(<Resizer offsetAmount={5} />)
    const chars = wrapper.instance().getFinalContents('words')

    expect(chars).toContain('RRRRR')
  })

  test('Does not add offsetChars, if specified', () => {
    const wrapper = mount(<Resizer offsetAmount={0} />)
    const chars = wrapper.instance().getFinalContents('words')

    expect(chars).not.toContain('R')
  })
})

describe('isMounted/didMount', () => {
  test('Unsets _isMounted on unmount', () => {
    const wrapper = mount(<Resizer offsetAmount={5} />)
    const inst = wrapper.instance()

    expect(inst._isMounted).toBe(true)

    wrapper.unmount()
    expect(inst._isMounted).toBe(false)
  })
})
