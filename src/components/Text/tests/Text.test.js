import React from 'react'
import { shallow } from 'enzyme'
import Text from '..'

describe('Styles', () => {
  test('Applies sizing styles if specified', () => {
    const wrapper13 = shallow(<Text size='13' />)
    const wrapper18 = shallow(<Text size='18' />)

    expect(wrapper13.prop('className')).toContain('is-13')
    expect(wrapper18.prop('className')).toContain('is-18')
  })

  test('Applies muted styles if specified', () => {
    const wrapper = shallow(<Text muted />)

    expect(wrapper.prop('className')).toContain('is-muted')
  })

  test('Applies subtle styles if specified', () => {
    const wrapper = shallow(<Text subtle />)

    expect(wrapper.prop('className')).toContain('is-subtle')
  })

  test('Applies faint styles if specified', () => {
    const wrapper = shallow(<Text faint />)

    expect(wrapper.prop('className')).toContain('is-faint')
  })
})
