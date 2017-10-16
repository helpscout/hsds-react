import React from 'react'
import { shallow } from 'enzyme'
import Icon from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Icon name='emoji' />)

    expect(wrapper.prop('className')).toContain('c-Icon')
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = shallow(<Icon name='emoji' className={className} />)

    expect(wrapper.prop('className')).toContain(className)
  })
})

describe('Interactions', () => {
  test('Add clickable styles if applied', () => {
    const wrapper = shallow(<Icon name='emoji' clickable />)

    expect(wrapper.prop('className')).toContain('is-clickable')
    expect(wrapper.prop('className')).not.toContain('is-noInteract')
  })

  test('Add ignoreClick styles if applied', () => {
    const wrapper = shallow(<Icon name='emoji' ignoreClick />)

    expect(wrapper.prop('className')).not.toContain('is-clickable')
    expect(wrapper.prop('className')).toContain('is-noInteract')
  })
})

describe('Sizes', () => {
  test('Add sizing styles if applied', () => {
    const wrapper = shallow(<Icon name='emoji' size='24' />)

    expect(wrapper.prop('className')).toContain('is-24')
  })
})

describe('Styles', () => {
  test('Add center styles if applied', () => {
    const wrapper = shallow(<Icon name='emoji' center />)

    expect(wrapper.prop('className')).toContain('is-center')
  })

  test('Add faint styles if applied', () => {
    const wrapper = shallow(<Icon name='emoji' faint />)

    expect(wrapper.prop('className')).toContain('is-faint')
  })

  test('Add muted styles if applied', () => {
    const wrapper = shallow(<Icon name='emoji' muted />)

    expect(wrapper.prop('className')).toContain('is-muted')
  })

  test('Add subtle styles if applied', () => {
    const wrapper = shallow(<Icon name='emoji' subtle />)

    expect(wrapper.prop('className')).toContain('is-subtle')
  })
})
