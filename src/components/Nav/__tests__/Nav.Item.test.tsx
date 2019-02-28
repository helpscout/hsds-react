import * as React from 'react'
import { mount, render } from 'enzyme'
import { Item } from '../Nav.Item'
import { MemoryRouter as Router } from 'react-router-dom'

const wrap = fn => Component => fn(<Router>{Component}</Router>)
const renderWithRouter = wrap(render)
const mountWithRouter = wrap(mount)

describe('className', () => {
  test('Has default className', () => {
    const wrapper = renderWithRouter(<Item />)

    expect(wrapper.hasClass('c-NavItem')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = renderWithRouter(<Item className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = renderWithRouter(<Item data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

describe('Route/Link', () => {
  test('Renders a Link', () => {
    const wrapper = mountWithRouter(<Item />)
    const el = wrapper.find('Link')

    expect(el.length).toBeTruthy()
  })

  test('Passes appropriate props to Route', () => {
    const wrapper = mountWithRouter(
      <Item exact={true} to="/go" strict={true} />
    )
    const el = wrapper.find('Route')

    expect(el.prop('exact')).toBe(true)
    expect(el.prop('path')).toBe('\\/go')
    expect(el.prop('strict')).toBe(true)
  })

  test('Renders active styles', () => {
    const isActive = () => true
    const wrapper = mountWithRouter(<Item isActive={isActive} />)
    const el = wrapper.find(`div.${Item.contentClassName}`)

    expect(el.hasClass('is-active')).toBeTruthy()
  })
})

describe('Disabled', () => {
  test('Passes disabled prop to Link', () => {
    const wrapper = mountWithRouter(<Item disabled={true} />)
    const el = wrapper.find('Link')

    expect(el.prop('disabled')).toBe(true)
  })

  test('Renders disabled styles', () => {
    const wrapper = mountWithRouter(<Item disabled={true} />)
    const el = wrapper.find(`li.${Item.className}`)

    expect(el.hasClass('is-disabled')).toBeTruthy()
  })
})

describe('Error', () => {
  test('Can render an error UI (Icon)', () => {
    const wrapper = mountWithRouter(<Item error="Error!" />)
    const el = wrapper.find('.c-NavItemErrorIcon')

    expect(el.length).toBeTruthy()
  })

  test('Renders a Tooltip with error', () => {
    const wrapper = mountWithRouter(<Item error="Error!" />)
    const el = wrapper.find('Tooltip')

    expect(el.length).toBeTruthy()
  })
})
