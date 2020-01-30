import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import FluffyCard from './FluffyCard'
import Container from './FluffyCard.Container'
import Card from '../Card'
import Link from '../Link'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<FluffyCard />)

    expect(wrapper.getDOMNode().classList.contains('c-FluffyCard')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<FluffyCard className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <FluffyCard>
        <div className="child">Hello</div>
      </FluffyCard>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

describe('Card', () => {
  test('Internally renders Card component', () => {
    const wrapper = mount(<FluffyCard />)
    const o = wrapper.find(Card)

    expect(o.length).toBe(1)
  })

  test('Can render Card as Link with react-router support', () => {
    const wrapper = mount(
      <MemoryRouter>
        <FluffyCard to="/path" />
      </MemoryRouter>
    )
    const o = wrapper.find(Link)

    expect(o.length).toBe(1)
    expect(o.props().to).toBe('/path')
  })
})

describe('textAlign', () => {
  test('Renders styles for specified textAlign', () => {
    const wrapper = mount(<FluffyCard textAlign="right" />)

    expect(wrapper.getDOMNode().classList.contains('is-textAlign-right')).toBe(
      true
    )
  })
})

describe('FluffyCard.Container ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Container />)

    expect(
      wrapper.getDOMNode().classList.contains('c-FluffyCardContainer')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Container className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })
})

describe('FluffyCard.Container Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Container>
        <div className="child">Hello</div>
      </Container>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})
