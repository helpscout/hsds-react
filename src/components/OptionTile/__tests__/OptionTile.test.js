import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import OptionTile from '../OptionTile'
import FluffyCard from '../../FluffyCard'
import OptionIcon from '../../OptionIcon'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-OptionTile',
  skipChildrenTest: true,
}

baseComponentTest(OptionTile, baseComponentOptions)

describe('FluffyCard', () => {
  test('Renders a FluffyCard', () => {
    const wrapper = mount(<OptionTile />)
    const o = wrapper.find(FluffyCard)

    expect(o.length).toBe(1)
  })

  test('Passes textAlign center to FluffyCard, by default', () => {
    const wrapper = mount(<OptionTile />)
    const o = wrapper.find(FluffyCard)

    expect(o.prop('textAlign')).toBe('center')
  })

  test('Can customize textAlign', () => {
    const wrapper = mount(<OptionTile textAlign="left" />)
    const o = wrapper.find(FluffyCard)

    expect(o.prop('textAlign')).toBe('left')
  })

  test('Passes href to FluffyCard', () => {
    const wrapper = mount(<OptionTile href="https://www.helpscout.net" />)
    const o = wrapper.find(FluffyCard)

    expect(o.prop('href')).toBe('https://www.helpscout.net')
  })

  test('Passes to to FluffyCard', () => {
    const wrapper = mount(
      <MemoryRouter>
        <OptionTile to="/route" />
      </MemoryRouter>
    )
    const o = wrapper.find(FluffyCard)

    expect(o.prop('to')).toBe('/route')
  })
})

describe('OptionIcon', () => {
  test('Renders an OptionIcon', () => {
    const wrapper = mount(<OptionTile />)
    const o = wrapper.find(OptionIcon)

    expect(o.length).toBe(1)
  })

  test('Passes icon and iconTitle to OptionIcon', () => {
    const wrapper = mount(<OptionTile icon="search" iconTitle="gogo" />)
    const o = wrapper.find(OptionIcon)

    expect(o.prop('icon')).toBe('search')
    expect(o.prop('iconTitle')).toBe('gogo')
  })
})

describe('Title/Subtitle', () => {
  test('Renders a title', () => {
    const wrapper = mount(<OptionTile title="Blue!!!" />)
    const o = wrapper.find('.c-OptionTile__title')

    expect(o.html()).toContain('Blue!!!')
  })

  test('Renders a subtitle', () => {
    const wrapper = mount(
      <OptionTile title="Blue!!!" subtitle="You're my boy!" />
    )
    const o = wrapper.find('.c-OptionTile__subtitle')

    expect(o.html()).toContain("You're my boy!")
  })
})
