import React from 'react'
import { cy } from '@helpscout/cyan'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import RouteWrapper from './RouteWrapper'

describe('RouteWrapper', () => {
  let stub
  beforeEach(() => {
    stub = jest.spyOn(console, 'warn').mockImplementation(() => jest.fn())
  })
  afterEach(() => {
    stub.mockRestore()
  })

  const BaseLink = props => <a {...props}>Link</a>

  test('Can create a component that can render', () => {
    const Link = RouteWrapper(BaseLink)

    cy.render(<Link href="/hello" target="_blank" />)

    const el = cy.get('a')

    expect(el.attr('href')).toBe('/hello')
    expect(el.attr('target')).toBe('_blank')
  })

  test('Renders the routable to attribute with the router basename', () => {
    const Link = RouteWrapper(BaseLink)

    cy.render(
      <BrowserRouter basename="/some/nested/base/name">
        <Link to="/hello" />
      </BrowserRouter>
    )

    const el = cy.get('a')

    expect(el.attr('href')).toBe('/some/nested/base/name/hello')
  })

  test('Renders the routable to attribute with hash, if within HashRouter', () => {
    const Link = RouteWrapper(BaseLink)

    cy.render(
      <HashRouter basename="/some/nested/base/name">
        <Link to="/hello" />
      </HashRouter>
    )

    const el = cy.get('a')

    expect(el.attr('href')).toBe('#/some/nested/base/name/hello')
  })

  test('Renders routable to with nested paths', () => {
    const Link = RouteWrapper(BaseLink)

    cy.render(
      <BrowserRouter basename="/some/nested/base/name">
        <Link to="/hello/there/" />
      </BrowserRouter>
    )

    const el = cy.get('a')

    expect(el.attr('href')).toBe('/some/nested/base/name/hello/there')
  })

  test('Renders pathname without param matchers', () => {
    const Link = RouteWrapper(BaseLink)

    cy.render(
      <BrowserRouter basename="/some/nested/base/name">
        <Link to="/hello/:post/:id/there" />
      </BrowserRouter>
    )

    const el = cy.get('a')

    expect(el.attr('href')).toBe('/some/nested/base/name/hello/there')
  })
})
