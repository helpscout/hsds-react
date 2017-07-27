import React from 'react'
import { shallow } from 'enzyme'
import Heading from '..'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = shallow(<Heading />)

    expect(wrapper.prop('className')).toContain('c-Heading')
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = shallow(<Heading className={className} />)

    expect(wrapper.prop('className')).toContain(className)
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<Heading>Gator</Heading>)

    expect(wrapper.text()).toBe('Gator')
  })
})

describe('Selector', () => {
  test('Renders a div selector by default', () => {
    const wrapper = shallow(<Heading />)

    expect(wrapper.node.type).toBe('div')
  })

  test('Renders a custom selector, if specified', () => {
    const wrapper = shallow(<Heading selector='span' />)

    expect(wrapper.node.type).toBe('span')
  })
})

describe('Styles', () => {
  test('Applies sizing styles if specified', () => {
    const wrapper1 = shallow(<Heading size='h1' />)
    const wrapperSm = shallow(<Heading size='small' />)

    expect(wrapper1.prop('className')).toContain('is-h1')
    expect(wrapperSm.prop('className')).toContain('is-small')
  })

  test('Applies disableSelect styles if specified', () => {
    const wrapper = shallow(<Heading disableSelect />)

    expect(wrapper.prop('className')).toContain('is-disableSelect')
  })

  test('Applies light styles if specified', () => {
    const wrapper = shallow(<Heading light />)

    expect(wrapper.prop('className')).toContain('is-light')
  })
})
