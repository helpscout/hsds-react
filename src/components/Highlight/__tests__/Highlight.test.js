import * as React from 'react'
import { mount } from 'enzyme'
import Highlight from '../Highlight'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<Highlight />)

    expect(wrapper.getDOMNode().classList.contains('c-Highlight')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<Highlight className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })

  test('Applies language className to the code element', () => {
    const language = 'php'
    const wrapper = mount(<Highlight language={language} />)

    expect(
      wrapper
        .find('code')
        .getDOMNode()
        .classList.contains(language)
    ).toBe(true)
  })
})
