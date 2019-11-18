import * as React from 'react'
import { mount } from 'enzyme'

import Actions from '../Form.Actions'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Actions />)
    expect(wrapper.getDOMNode().classList.contains('c-FormActions')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'skynet'
    const wrapper = mount(<Actions className={className} />)

    expect(wrapper.getDOMNode().classList.contains(className)).toBe(true)
  })
})

describe('Content', () => {
  test('Does not render child content', () => {
    const text = 'Battlestar'
    const wrapper = mount(<Actions>text</Actions>)

    expect(wrapper.text()).not.toBe(text)
  })
})
