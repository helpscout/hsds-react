import React from 'react'
import { mount, render } from 'enzyme'
import { Nav } from './Nav'
import Item from './Nav.Item'
import { Link } from 'react-router-dom'
import { MemoryRouter as Router } from 'react-router-dom'
import { NavItem } from './Nav.Item'

const wrap = fn => Component => fn(<Router>{Component}</Router>)
const renderWithRouter = wrap(render)
const mountWithRouter = wrap(mount)

describe('Nav className', () => {
  test('Has default className', () => {
    const wrapper = render(<Nav />)

    expect(wrapper.hasClass('c-Nav')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<Nav className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('Nav HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<Nav data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

describe('Nav Sub-components', () => {
  test('Has Item sub-component', () => {
    expect(Nav.Item).toBe(Item)
  })
})

describe('Nav.Item className', () => {
  test('Has default className', () => {
    const wrapper = renderWithRouter(<Item to="/" />)

    expect(wrapper.hasClass('c-NavItem')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = renderWithRouter(
      <Item to="/" className={customClassName} />
    )

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('Nav.Item HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = renderWithRouter(<Item to="/" data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

describe('Nav.Item Route/Link', () => {
  test('Renders active styles', () => {
    const isActive = () => {
      return true
    }
    const wrapper = mountWithRouter(<Item to="/" isActive={isActive} />)

    const el = wrapper.find(Link).find('a.c-NavItemLink')

    expect(el.hasClass('is-active')).toBeTruthy()
  })
})

describe('Nav.Item Disabled', () => {
  test('Passes disabled prop to Link', () => {
    const wrapper = mountWithRouter(<Item to="/" disabled={true} />)
    const el = wrapper.find(Link).find('a.c-NavItemLink')

    expect(el.prop('disabled')).toBe(true)
  })

  test('Renders disabled styles', () => {
    const wrapper = mountWithRouter(<Item to="/" disabled={true} />)
    const el = wrapper.find(`li.${Item.className}`)

    expect(el.hasClass('is-disabled')).toBeTruthy()
  })
})

describe('Nav.Item Error', () => {
  test('Can render an error UI (Icon)', () => {
    const wrapper = mountWithRouter(<Item to="/" error="Error!" />)
    const el = wrapper.find('.c-NavItemErrorIcon')

    expect(el.length).toBeTruthy()
  })

  test('Renders a Tooltip with error', () => {
    const wrapper = mountWithRouter(<Item to="/" error="Error!" />)
    const el = wrapper.find('Tooltip')

    expect(el.length).toBeTruthy()
  })
})

describe('Nav.Item data-bypass', () => {
  test('Pushes data-bypass attribute to the link element', () => {
    const wrapper = mountWithRouter(<Item to="/" data-bypass={true} />)
    const link = wrapper.find('a')

    expect(link.prop('data-bypass')).toBeTruthy()
  })
})
