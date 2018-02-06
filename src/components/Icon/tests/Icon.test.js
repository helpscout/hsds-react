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

  test('Applies icon name className', () => {
    const className = 'channel-4'
    const wrapper = shallow(<Icon name='emoji' className={className} />)

    expect(wrapper.hasClass(className)).toBeTruthy()
    expect(wrapper.hasClass('is-iconName-emoji')).toBeTruthy()
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

  test('Has size 13', () => {
    const wrapper = shallow(<Icon name='emoji' size='13' />)

    expect(wrapper.prop('className')).toContain('is-13')
  })
})

describe('Shade', () => {
  test('Add shade styles if applied', () => {
    const wrapper = shallow(<Icon name='emoji' shade='muted' />)

    expect(wrapper.prop('className')).toContain('is-muted')
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

describe('withCaret', () => {
  const caretClassName = '.c-Icon__icon.is-caret'

  test('Does not render caret by default', () => {
    const wrapper = shallow(<Icon name='emoji' />)
    const o = wrapper.find(caretClassName)

    expect(o.length).toBe(0)
  })

  test('Can render caret, if specified', () => {
    const wrapper = shallow(<Icon name='emoji' withCaret />)
    const o = wrapper.find(caretClassName)

    expect(wrapper.hasClass('is-withCaret')).toBe(true)
    expect(o.length).toBe(1)
  })
})
