import React from 'react'
import { shallow } from 'enzyme'
import Badge from '..'

const statusTestHelper = (status) => {
  test(`Applies ${status} styles if applied`, () => {
    const wrapper = shallow(<Badge status={status}>Zoolander</Badge>)

    expect(wrapper.prop('className')).toContain(`is-${status}`)
  })
}

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Badge />)

    expect(wrapper.prop('className')).toBe('c-Badge')
  })

  test('Accepts custom className', () => {
    const wrapper = shallow(<Badge className='zoolander' />)

    expect(wrapper.prop('className')).toContain('zoolander')
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = shallow(<Badge>Zoolander</Badge>)

    expect(wrapper.text()).toBe('Zoolander')
  })
})

describe('Styles', () => {
  test(`Applies style className if applied`, () => {
    const wrapper = shallow(<Badge white>Zoolander</Badge>)

    expect(wrapper.prop('className')).toContain(`is-white`)
  })
})

describe('Sizes', () => {
  test(`Applies size styles if applied`, () => {
    const wrapper = shallow(<Badge size='sm'>Zoolander</Badge>)

    expect(wrapper.prop('className')).toContain(`is-sm`)
  })
})

describe('Status', () => {
  const status = ['error', 'info', 'success', 'warning']

  status.forEach(s => statusTestHelper(s))
})
