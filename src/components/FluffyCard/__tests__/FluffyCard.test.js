import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import FluffyCard from '../FluffyCard'
import Card from '../../Card'
import Link from '../../Link'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-FluffyCard',
}

baseComponentTest(FluffyCard, baseComponentOptions)

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

    expect(wrapper.hasClass('is-textAlign-right')).toBe(true)
  })
})
