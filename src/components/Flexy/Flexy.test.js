import React from 'react'
import { mount } from 'enzyme'
import Flexy from './Flexy'

describe('Flexy ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Flexy />)

    expect(wrapper.getDOMNode().classList.contains('c-Flexy')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Flexy className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass))
  })
})

describe('Flexy Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Flexy>
        <div className="child">Hello</div>
      </Flexy>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Flexy Styles', () => {
  test('Applies vertical alignment styles', () => {
    const wrapper = mount(
      <Flexy align="top">
        <Flexy.Item>Hello</Flexy.Item>
      </Flexy>
    )

    expect(wrapper.getDOMNode().classList.contains('is-align-top')).toBe(true)
  })

  test('Applies horizontal alignment styles', () => {
    const wrapper = mount(
      <Flexy just="right">
        <Flexy.Item>Hello</Flexy.Item>
      </Flexy>
    )

    expect(wrapper.getDOMNode().classList.contains('is-just-right')).toBe(true)
  })

  test('Applies spacing styles', () => {
    const wrapper = mount(
      <Flexy gap="lg">
        <Flexy.Item>Hello</Flexy.Item>
      </Flexy>
    )

    expect(wrapper.getDOMNode().classList.contains('is-gap-lg')).toBe(true)
  })
})

describe('Flexy Block ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Flexy.Block />)

    expect(
      wrapper.getDOMNode().classList.contains('c-Flexy__block')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Flexy.Block className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('Flexy Block Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Flexy.Block>
        <div className="child">Hello</div>
      </Flexy.Block>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Flexy Item ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Flexy.Item />)

    expect(
      wrapper.getDOMNode().classList.contains('c-Flexy__item')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Flexy.Item className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass))
  })
})

describe('Flexy Item Inline', () => {
  test('Applies inline className if specified', () => {
    const wrapper = mount(<Flexy.Item inline />)

    expect(
      wrapper.getDOMNode().classList.contains('is-inlineItem')
    ).toBeTruthy()
    expect(
      wrapper.getDOMNode().classList.contains('is-inlineDefault')
    ).not.toBeTruthy()
  })
})

describe('Flexy Item Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Flexy.Item>
        <div className="child">Hello</div>
      </Flexy.Item>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})
