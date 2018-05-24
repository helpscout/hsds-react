import React from 'react'
import { mount, shallow } from 'enzyme'
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
    const wrapper = shallow(<Resizer contents="<strong>News team!</strong>" />)
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
    const wrapper = shallow(<Resizer contents={`\nSan Diego\n`} />)
    const o = wrapper.find('.c-InputGhost').first()
    const html = o
      .html()
      .replace('<div class="c-InputGhost">', '')
      .replace('</div>', '')

    expect(html).not.toContain('\n')
    expect(html).toContain('<br>San Diego<br>')
  })

  test('Converts & characters to &amp;', () => {
    const wrapper = shallow(<Resizer contents="San & Diego" />)
    const o = wrapper.find('.c-InputGhost').first()
    const html = o
      .html()
      .replace('<div class="c-InputGhost">', '')
      .replace('</div>', '')
      .replace('<br>', '')

    expect(html).toBe('San &amp; Diego')
  })

  test('Does not convert if content does not contain special characters', () => {
    const wrapper = shallow(<Resizer contents="San Diego" />)
    const o = wrapper.find('.c-InputGhost').first()
    const html = o
      .html()
      .replace('<div class="c-InputGhost">', '')
      .replace('</div>', '')
      .replace('<br>', '')

    expect(html).toBe('San Diego')
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
    const o = wrapper.find('.c-InputGhost')

    expect(o.length).toBe(1)
  })
})
