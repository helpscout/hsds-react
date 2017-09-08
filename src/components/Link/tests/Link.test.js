import React from 'react'
import { shallow } from 'enzyme'
import Link from '..'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = shallow(<Link />)

    expect(wrapper.prop('className')).toContain('c-link')
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = shallow(<Link className={className} />)

    expect(wrapper.prop('className')).toContain(className)
  })
})

describe('Click', () => {
  test('Can trigger onClick callback', () => {
    let value = false
    const onClick = () => { value = true }
    const wrapper = shallow(<Link onClick={onClick} />)

    wrapper.simulate('click')

    expect(value).toBeTruthy()
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<Link>Gator</Link>)

    expect(wrapper.text()).toBe('Gator')
  })
})

describe('Href', () => {
  test('Has an href of # by default', () => {
    const wrapper = shallow(<Link>Gator</Link>)

    expect(wrapper.prop('href')).toBe('#')
  })

  test('Can set link href, if specified', () => {
    const url = 'https://www.helpscout.net'
    const wrapper = shallow(<Link href={url}>Gator</Link>)

    expect(wrapper.prop('href')).toBe(url)
  })
})

describe('External', () => {
  test('Adds external <a> attributes if external is specified', () => {
    const wrapper = shallow(<Link external>Link</Link>)

    expect(wrapper.prop('target')).toBe('_blank')
    expect(wrapper.prop('rel')).toContain('noopener noreferrer')
  })
})

describe('Route', () => {
  test('Is a standard <a> tag by default', () => {
    const wrapper = shallow(<Link href='/gator'>Gator</Link>)

    expect(wrapper.node.type).toBe('a')
  })

  test('Becomes a react-router-dom Link if to is defined', () => {
    const wrapper = shallow(<Link to='/gator'>Gator</Link>)

    expect(wrapper.node.type).not.toBe('a')
    expect(typeof wrapper.node.type).toBe('function')
  })
})
