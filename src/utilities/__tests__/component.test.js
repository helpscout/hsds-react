import React from 'react'
import { mount } from 'enzyme'
import {
  COMPONENT_NAMESPACE_KEY,
  getComponentName,
  getRegisteredComponents,
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
