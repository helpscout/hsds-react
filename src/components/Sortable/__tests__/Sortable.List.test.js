import * as React from 'react'
import { mount } from 'enzyme'
import List from '../Sortable.List'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<List />)

    expect(wrapper.getDOMNode().classList.contains('c-SortableList')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<List className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBe(true)
  })
})
