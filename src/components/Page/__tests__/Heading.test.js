import React from 'react'
import { mount } from 'enzyme'
import Heading from '../Heading'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Heading>Heisenberg shop</Heading>)

    expect(wrapper.hasClass('c-PageHeader__titleHeading')).toBe(true)
  })

  test('Has Secondary className', () => {
    const wrapper = mount(<Heading secondary>Beakers</Heading>)

    expect(wrapper.hasClass('c-PageHeader__titleHeading--secondary')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'baby-blue'
    const wrapper = mount(
      <Heading className={className}>Heisenberg shop</Heading>
    )

    expect(wrapper.hasClass(className)).toBe(true)
  })
})

describe('Primary: h1', () => {
  test('Default is primary heading (h1)', () => {
    const wrapper = mount(<Heading>Heisenberg Shop</Heading>)

    expect(wrapper.find('h1').length).toBe(1)
  })
})

describe('Secondary: h2', () => {
  test('Secondary renders an h2', () => {
    const wrapper = mount(<Heading secondary>Beakers</Heading>)

    expect(wrapper.find('h2').length).toBe(1)
  })
})
