import React from 'react'
import { shallow } from 'enzyme'
import Emoticon from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Emoticon name="happy" />).dive()

    expect(wrapper.prop('className')).toContain('c-Emoticon')
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = shallow(
      <Emoticon name="happy" className={className} />
    ).dive()

    expect(wrapper.prop('className')).toContain(className)
  })
})

describe('Interactions', () => {
  test('Add ignoreClick styles if applied', () => {
    const wrapper = shallow(<Emoticon name="emoji" clickable={false} />).dive()

    expect(wrapper.prop('className')).toContain('is-noInteract')
  })
})

describe('Sizes', () => {
  test('Add sizing styles if applied', () => {
    const wrapper = shallow(<Emoticon name="happy" size="sm" />).dive()

    expect(wrapper.prop('className')).toContain('is-sm')
  })

  test('Has size md', () => {
    const wrapper = shallow(<Emoticon name="happy" size="md" />).dive()

    expect(wrapper.prop('className')).toContain('is-md')
  })
})

describe('Styles', () => {
  test('Add center styles if applied', () => {
    const wrapper = shallow(<Emoticon name="happy" center />).dive()

    expect(wrapper.prop('className')).toContain('is-center')
  })

  test('Add inline styles if applied', () => {
    const wrapper = shallow(<Emoticon name="happy" inline />).dive()

    expect(wrapper.prop('className')).toContain('is-inline')
  })

  test('Add active styles if applied', () => {
    const wrapper = shallow(<Emoticon name="happy" isActive />).dive()

    expect(wrapper.prop('className')).toContain('is-active')
  })

  test('Removes active styles if applied', () => {
    const wrapper = shallow(<Emoticon name="happy" isActive={false} />).dive()

    expect(wrapper.prop('className')).not.toContain('is-active')
  })
})
