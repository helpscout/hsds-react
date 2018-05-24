import React from 'react'
import { shallow } from 'enzyme'
import Inline from '..'
import Item from '../Item'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Inline />)

    expect(wrapper.hasClass('c-Inline')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<Inline className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = shallow(
      <Inline>
        <div className="child">Hello</div>
      </Inline>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Size', () => {
  test('Can define custom size styles', () => {
    const wrapper = shallow(<Inline size="lg" />)

    expect(wrapper.hasClass('is-lg')).toBe(true)
  })
})

describe('Sub-components', () => {
  test('Has correct sub components', () => {
    expect(Inline.Item).toBe(Item)
  })
})
