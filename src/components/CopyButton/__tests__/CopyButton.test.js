import React from 'react'
import { mount } from 'enzyme'
import CopyButton from '../CopyButton'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<CopyButton />)

    expect(wrapper.hasClass('c-CopyButton')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<CopyButton className={className} />)

    expect(wrapper.hasClass(className)).toBe(true)
  })
})
