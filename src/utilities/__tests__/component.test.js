import React from 'react'
import { getComponentName, getComponentKey } from '../component'

describe('getComponentName', () => {
  test('return component name', () => {
    const Compo = () => {}

    expect(getComponentName(Compo)).toBe('Compo')
  })

  test('Can get a SFC component name', () => {
    const Compo = () => {}
    Compo.displayName = 'Hello'

    expect(getComponentName(Compo)).toBe('Hello')
  })

  test('Can get a React.Component class component name', () => {
    class Compo extends React.Component {
      static displayName = 'Hello'
      render() {
        return null
      }
    }

    expect(getComponentName(Compo)).toBe('Hello')
  })
})

describe('getComponentKey', () => {
  test('Returns undefined if not a valid component', () => {
    expect(getComponentKey(true)).toBe(undefined)
    expect(getComponentKey('div')).toBe(undefined)
  })

  test('Returns undefined if no key is available', () => {
    const CompoA = () => {}

    expect(getComponentKey(CompoA)).toBe(undefined)
  })

  test('Returns key, if available', () => {
    const child = {
      $$typeof: 'component',
      type: 'div',
      key: '.key123',
    }

    expect(getComponentKey(child)).toBe(child.key)
  })

  test('Returns undefined, if no key is available', () => {
    const child = {
      $$typeof: 'component',
      type: 'div',
    }

    expect(getComponentKey(child)).toBe(undefined)
  })

  test('Returns component.props.id, if available', () => {
    const child = {
      $$typeof: 'component',
      type: 'div',
      props: {
        id: 'abc',
      },
    }

    expect(getComponentKey(child)).toBe('abc')
  })

  test('Returns component.props.id over component.key, if available', () => {
    const child = {
      $$typeof: 'component',
      type: 'div',
      key: '.key',
      props: {
        id: 'abc',
      },
    }

    expect(getComponentKey(child)).toBe('abc')
  })

  test('Returns unsafe index, if provided', () => {
    const child = {
      $$typeof: 'component',
      type: 'div',
    }

    expect(getComponentKey(child, 13)).toContain('unsafe')
    expect(getComponentKey(child, 13)).toContain('13')
  })

  test('Returns fallback, if provided, over unsafe index', () => {
    const child = {
      $$typeof: 'component',
      type: 'div',
    }

    expect(getComponentKey(child, 13, 'fallback')).toContain('fallback')
    expect(getComponentKey(child, 13, 'fallback')).not.toContain('unsafe')
  })
})
