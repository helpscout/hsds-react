import * as React from 'react'
import { mount, render } from 'enzyme'
import { PromoCard } from '../PromoCard'
import Card from '../../Card'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(
      <PromoCard>
        <div className="child">Hello</div>
      </PromoCard>
    )

    expect(wrapper.getDOMNode().classList.contains('c-PromoCard')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'jeff-goldblum-greeting-card'
    const wrapper = mount(
      <PromoCard className={customClass}>
        <div className="child">Hello</div>
      </PromoCard>
    )

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <PromoCard>
        <div className="child">Hello</div>
      </PromoCard>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })

  test('Returns null if children are undefined', () => {
    const wrapper = mount(<PromoCard />)
    expect(wrapper.html()).toBeNull()
  })
})

describe('Card', () => {
  test('Internally renders Card component', () => {
    const wrapper = mount(
      <PromoCard>
        <div className="child">Hello</div>
      </PromoCard>
    )
    const o = wrapper.find(Card)

    expect(o.length).toBe(1)
  })
})
