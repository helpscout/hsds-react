import React from 'react'
import { mount } from 'enzyme'
import DragHandle from '../DragHandle'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<DragHandle />)

    expect(
      wrapper.getDOMNode().classList.contains('c-SortableDragHandle')
    ).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<DragHandle className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBe(true)
  })
})
