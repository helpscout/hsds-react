import React from 'react'
import { shallow } from 'enzyme'
import List from '../List'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-List'
}

baseComponentTest(List, baseComponentOptions)

describe('Defaults', () => {
  test('Renders an ul by default', () => {
    const wrapper = shallow(<List />)

    expect(wrapper.node.type).toBe('ul')
  })
})

describe('Accessibility', () => {
  test('Has an aria-role by default', () => {
    const wrapper = shallow(<List />)

    expect(wrapper.find('ul').props().role).toBe('list')
  })

  test('Role can be overridden', () => {
    const wrapper = shallow(<List role='listbox' />)

    expect(wrapper.find('ul').props().role).toBe('listbox')
  })
})

describe('Border', () => {
  test('Does not render a border style by default', () => {
    const wrapper = shallow(<List />)

    expect(wrapper.props().border).toBeFalsy()
    expect(wrapper.hasClass('c-List--bordered')).not.toBeTruthy()
    expect(wrapper.hasClass('c-List--dotted')).not.toBeTruthy()
  })

  test('Can render dot borders', () => {
    const wrapper = shallow(<List border='dot' />)

    expect(wrapper.hasClass('c-List--dotted')).toBeTruthy()
  })

  test('Can render line borders', () => {
    const wrapper = shallow(<List border='line' />)

    expect(wrapper.hasClass('c-List--bordered')).toBeTruthy()
  })
})

describe('Bullet', () => {
  test('Renders a ol if type is "bullet"', () => {
    const wrapper = shallow(<List type='bullet' />)

    expect(wrapper.node.type).toBe('ul')
    expect(wrapper.hasClass('c-List--bullet')).toBeTruthy()
  })
})

describe('Inline', () => {
  test('Renders a ul if type is "inline"', () => {
    const wrapper = shallow(<List type='inline' />)

    expect(wrapper.node.type).toBe('ul')
    expect(wrapper.hasClass('c-List--inline')).toBeTruthy()
  })
})

describe('Number', () => {
  test('Renders a ol if type is "number"', () => {
    const wrapper = shallow(<List type='number' />)

    expect(wrapper.node.type).toBe('ol')
    expect(wrapper.hasClass('c-List--number')).toBeTruthy()
  })
})

describe('Size', () => {
  test('Can render size styles, if specified', () => {
    const wrapper = shallow(<List size='md' />)

    expect(wrapper.hasClass('c-List--md')).toBeTruthy()
  })
})
