import * as React from 'react'
import { mount } from 'enzyme'
import { AutoDropdown } from '../AutoDropdown'

jest.mock('../../ComboBox', () => {
  const ComboBox = () => <div />
  return { default: ComboBox }
})

describe('limit', () => {
  test('Renders a searchable input, if item count exceeds limit', () => {
    const items = [0, 1, 2, 3]
    const wrapper = mount(<AutoDropdown items={items} limit={2} />)
    const el = wrapper.find('ComboBox')

    expect(el.prop('showInput')).toBe(true)
  })

  test('Does not show a searchable input, if item count is below limit', () => {
    const items = [0, 1, 2, 3]
    const wrapper = mount(<AutoDropdown items={items} limit={20} />)
    const el = wrapper.find('ComboBox')

    expect(el.prop('showInput')).toBe(false)
  })
})
