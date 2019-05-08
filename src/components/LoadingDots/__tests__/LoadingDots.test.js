import React from 'react'
import { shallow } from 'enzyme'
import LoadingDots from '../LoadingDots'

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

describe('Align', () => {
  test('Does not apply an alignment class by default', () => {
    const wrapper = shallow(<LoadingDots />)

    expect(wrapper.hasClass('is-left')).not.toBeTruthy()
    expect(wrapper.hasClass('is-center')).not.toBeTruthy()
    expect(wrapper.hasClass('is-right')).not.toBeTruthy()
  })

  test('Can apply alignment class', () => {
    const wrapper = shallow(<LoadingDots align="center" />)

    expect(wrapper.hasClass('is-left')).not.toBeTruthy()
    expect(wrapper.hasClass('is-center')).toBeTruthy()
    expect(wrapper.hasClass('is-right')).not.toBeTruthy()
  })
})
