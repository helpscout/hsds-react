import * as React from 'react'
import { mount, render } from 'enzyme'
import { Inline } from './Inline'
import Item from './Inline.Item'

describe('Inline className', () => {
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

describe('Inline HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<Inline data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

describe('Inline Children', () => {
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

describe('Inline Size', () => {
  test('Can define custom size styles', () => {
    const wrapper = render(<Inline size="lg" />)

    expect(wrapper.hasClass('is-lg')).toBe(true)
  })
})

describe('Inline Sub-components', () => {
  test('Has correct sub components', () => {
    expect(Inline.Item).toBe(Item)
  })
})

describe('Inline.Item className', () => {
  test('Has default className', () => {
    const wrapper = render(<Item />)

    expect(wrapper.hasClass('c-InlineItem')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<Item className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('Inline.Item HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<Item data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

describe('Inline.Item Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Item>
        <div className="child">Hello</div>
      </Item>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})
