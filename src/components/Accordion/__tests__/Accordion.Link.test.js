import React from 'react'
import { mount } from 'enzyme'
import Link from '../Accordion.Link'
import Title from '../Accordion.Title'
import Section from '../Accordion.Section'
import { MemoryRouter as Router } from 'react-router-dom'

const wrap = fn => Component => fn(<Router>{Component}</Router>)
const mountWithRouter = wrap(mount)

describe('Section', () => {
  test('Renders the link variant of Section if to/href are defined', () => {
    const wrapper = mountWithRouter(<Link to="/" />)
    const el = wrapper.find(Section)

    expect(el.prop('isLink')).toBe(true)
  })

  test('Renders a standard Section if to/href are not defined', () => {
    const wrapper = mount(<Link />)
    const el = wrapper.find(Section)

    expect(el.prop('isLink')).toBe(false)
  })
})

describe('Title', () => {
  test('Passes to prop to Title', () => {
    const wrapper = mountWithRouter(<Link to="/page" />)
    const el = wrapper.find(Title)

    expect(el.prop('to')).toBe('/page')
  })

  test('Passes href prop to Title', () => {
    const wrapper = mountWithRouter(<Link href="/page" />)
    const el = wrapper.find(Title)

    expect(el.prop('href')).toBe('/page')
  })
})
