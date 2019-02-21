import * as React from 'react'
import { mount, render } from 'enzyme'
import { Inline } from '../Inline'
import Item from '../Inline.Item'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<Inline />)

    expect(wrapper.hasClass('c-Inline')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<Inline className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<Inline data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
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
    const wrapper = render(<Inline size="lg" />)

    expect(wrapper.hasClass('is-lg')).toBe(true)
  })
})

describe('Sub-components', () => {
  test('Has correct sub components', () => {
    expect(Inline.Item).toBe(Item)
  })
})
