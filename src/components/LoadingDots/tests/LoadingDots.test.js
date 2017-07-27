import React from 'react'
import { shallow } from 'enzyme'
import LoadingDots from '..'

describe('ClassName', () => {
  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<LoadingDots className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

test('Renders 3 dots', () => {
  const wrapper = shallow(<LoadingDots />)

  expect(wrapper.children().length).toBe(3)
})
