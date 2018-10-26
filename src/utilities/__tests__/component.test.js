import React from 'react'
import { mount } from 'enzyme'
import {
  COMPONENT_NAMESPACE_KEY,
  getComponentName,
  getRegisteredComponents,
  getComponentKey,
  namespaceComponent,
  __clearRegisteredComponents,
} from '../component'

describe('getComponentName', () => {
  test('Returns undefined, if no namespace is set', () => {
    const Compo = () => {}

    expect(getComponentName(Compo)).toBe(undefined)
  })

  test('Does not use the React.displayName as a namespace', () => {
    const Compo = () => {}
    Compo.displayName = 'DisplayName'

    expect(getComponentName(Compo)).toBe(undefined)
  })

  test('Can get a SFC component name', () => {
    const Compo = () => {}
    Compo[COMPONENT_NAMESPACE_KEY] = 'Hello'

    expect(getComponentName(Compo)).toBe('Hello')
  })

  test('Can get a React.Component class component name', () => {
    class Compo extends React.Component {
      render() {
        return null
      }
    }

    Compo[COMPONENT_NAMESPACE_KEY] = 'Hello'

    expect(getComponentName(Compo)).toBe('Hello')
  })

  test('Can get a component namespace using React.Children', () => {
    class Compo extends React.Component {
      render() {
        return null
      }
    }

    Compo[COMPONENT_NAMESPACE_KEY] = 'Hello'

    const Parent = props => {
      React.Children.map(props.children, child => {
        expect(getComponentName(child)).toBe('Hello')
      })

      return null
    }

    mount(
      <Parent>
        <Compo />
      </Parent>
    )
  })
})

describe('namespaceComponent', () => {
  test('Sets the namespace to the unique KEY', () => {
    const Compo = () => {}
    namespaceComponent('New')(Compo)

    expect(getComponentName(Compo)).toBe('New')
    expect(Compo[COMPONENT_NAMESPACE_KEY]).toBe('New')
  })
})

describe('getRegisteredComponents', () => {
  beforeEach(() => {
    __clearRegisteredComponents()
  })

  test('Retrieves a list of namespace registered components', () => {
    const CompoA = () => {}
    const CompoB = () => {}

    namespaceComponent('A')(CompoA)
    namespaceComponent('B')(CompoB)

    expect(getRegisteredComponents()).toContain('A')
    expect(getRegisteredComponents()).toContain('B')
    expect(getRegisteredComponents().length).toBe(2)
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
