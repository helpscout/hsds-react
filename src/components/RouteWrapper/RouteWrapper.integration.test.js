import React from 'react'
import { render } from '@testing-library/react'
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

    const { container } = render(<Link href="/hello" target="_blank" />)

    const el = container.querySelector('a')

    expect(el.getAttribute('href')).toBe('/hello')
    expect(el.getAttribute('target')).toBe('_blank')
  })

  test('Renders the routable to attribute with the router basename', () => {
    const Link = RouteWrapper(BaseLink)

    const { container } = render(
      <BrowserRouter basename="/some/nested/base/name">
        <Link to="/hello" />
      </BrowserRouter>
    )

    const el = container.querySelector('a')

    expect(el.getAttribute('href')).toBe('/some/nested/base/name/hello')
  })

  test('Renders the routable to attribute with hash, if within HashRouter', () => {
    const Link = RouteWrapper(BaseLink)

    const { container } = render(
      <HashRouter basename="/some/nested/base/name">
        <Link to="/hello" />
      </HashRouter>
    )

    const el = container.querySelector('a')

    expect(el.getAttribute('href')).toBe('#/some/nested/base/name/hello')
  })

  test('Renders routable to with nested paths', () => {
    const Link = RouteWrapper(BaseLink)

    const { container } = render(
      <BrowserRouter basename="/some/nested/base/name">
        <Link to="/hello/there/" />
      </BrowserRouter>
    )

    const el = container.querySelector('a')

    expect(el.getAttribute('href')).toBe('/some/nested/base/name/hello/there')
  })

  test('Renders pathname without param matchers', () => {
    const Link = RouteWrapper(BaseLink)

    const { container } = render(
      <BrowserRouter basename="/some/nested/base/name">
        <Link to="/hello/:post/:id/there" />
      </BrowserRouter>
    )

    const el = container.querySelector('a')

    expect(el.getAttribute('href')).toBe('/some/nested/base/name/hello/there')
  })
})
