import React from 'react'
import { mount } from 'enzyme'
import {
  COMPONENT_NAMESPACE_KEY,
  getComponentName,
  getRegisteredComponents,
  getComponentKey,
  namespaceComponent,
  renderRenderPropComponent,
  renderChildrenSafely,
  renderAsSingleChild,
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

describe('renderRenderPropComponent', () => {
  test('Can render an instantiated React component', () => {
    const CryLaughingComponent = () => <div />
    const result = renderRenderPropComponent(<CryLaughingComponent />)

    expect(React.isValidElement(result)).toBe(true)
  })

  test('Can pass props to instantiated component', () => {
    const CryLaughingComponent = () => <div />
    const props = {
      disabled: true,
    }
    const result = renderRenderPropComponent(
      // @ts-ignore
      <CryLaughingComponent title="custom" />,
      props
    )

    expect(result.props.title).toBe('custom')
    expect(result.props.disabled).toBe(true)
  })

  test('Can render a function', () => {
    const CryLaughingComponent = () => <div />
    const result = renderRenderPropComponent(() => <CryLaughingComponent />)

    expect(React.isValidElement(result)).toBe(true)
  })

  test('Can pass props to a functional component', () => {
    const CryLaughingComponent = () => <div />
    const props = {
      disabled: true,
    }
    const result = renderRenderPropComponent(
      ({ disabled }) => (
        // @ts-ignore
        <CryLaughingComponent title="custom" disabled={disabled} />
      ),
      props
    )

    expect(result.props.title).toBe('custom')
    expect(result.props.disabled).toBe(true)
  })

  test('Returns null for invalid arg', () => {
    expect(renderRenderPropComponent(0)).toBe(null)
    expect(renderRenderPropComponent(null)).toBe(null)
    expect(renderRenderPropComponent(undefined)).toBe(null)
    expect(renderRenderPropComponent('div')).toBe(null)
  })
})

describe('renderChildrenSafely', () => {
  test('Can render strings with escaped quotes', () => {
    const wrapper = mount(renderChildrenSafely('"Hello"'))

    expect(wrapper.text()).toBe('"Hello"')
  })

  test('Renders a component with safe HTML', () => {
    const wrapper = mount(
      renderChildrenSafely(<div className="CustomComponent">"Hello"</div>)
    )
    const el = wrapper.find('.CustomComponent')

    expect(el.text()).toContain('Hello')
  })

  test('Can render a non-span HTML element', () => {
    const wrapper = mount(renderChildrenSafely('"Hello"', 'p'))
    const el = wrapper.filter('p')

    expect(wrapper.text()).toBe('"Hello"')
  })

  test('Can extend an tag', () => {
    const wrapper = mount(
      renderChildrenSafely('"Hello"', 'em', { 'data-cy': 'Hello' })
    )
    const el = wrapper.find('em')

    expect(el.text()).toContain('Hello')
    expect(el.prop('data-cy')).toBe('Hello')
  })

  test('Can extend an existing Component', () => {
    const Compo = props => <div {...props} />
    const wrapper = mount(
      renderChildrenSafely('"Hello"', Compo, { 'data-cy': 'Hello' })
    )
    const el = wrapper.find('div')

    expect(el.text()).toContain('Hello')
    expect(el.prop('data-cy')).toBe('Hello')
  })
})

describe('renderAsSingleChild', () => {
  const Comp = ({ children }) => renderAsSingleChild(children)

  test('Can handle undefined children', () => {
    const wrapper = mount(<Comp>{undefined}</Comp>)

    expect(wrapper.html()).toBeFalsy()
  })

  test('Can handle null children', () => {
    const wrapper = mount(<Comp>{null}</Comp>)

    expect(wrapper.html()).toBeFalsy()
  })

  test('Can handle false children', () => {
    const wrapper = mount(<Comp>{false}</Comp>)

    expect(wrapper.html()).toBeFalsy()
  })

  test('Can handle 0 children', () => {
    const wrapper = mount(<Comp>{0}</Comp>)

    expect(wrapper.html()).toBeFalsy()
  })

  test('Can handle true children', () => {
    const wrapper = mount(<Comp>{true}</Comp>)

    expect(wrapper.html()).toBeFalsy()
  })

  test('Can handle empty array of children', () => {
    const wrapper = mount(<Comp>{[]}</Comp>)

    expect(wrapper.html()).toBeFalsy()
  })

  test('Can handle empty Object of children', () => {
    const wrapper = mount(<Comp>{{}}</Comp>)

    expect(wrapper.html()).toBeFalsy()
  })

  test('Can handle single child component', () => {
    const wrapper = mount(
      <Comp>
        <p />
      </Comp>
    )

    expect(wrapper.html()).toBeTruthy()
    expect(wrapper.find('p').length).toBe(1)
  })

  test('Can handle multiple child components', () => {
    const wrapper = mount(
      <Comp>
        <p />
        <p />
        <p />
      </Comp>
    )

    expect(wrapper.html()).toBeTruthy()
    expect(wrapper.find('p').length).toBe(3)
  })

  test('Can handle multiple child components', () => {
    const wrapper = mount(
      <Comp>
        <p />
        <p />
        <p />
      </Comp>
    )

    expect(wrapper.html()).toBeTruthy()
    expect(wrapper.find('p').length).toBe(3)
  })

  test('Creates a wrapper for multiple child components', () => {
    const wrapper = mount(
      <Comp>
        <p />
        <p />
        <p />
      </Comp>
    )

    expect(wrapper.html()).toBeTruthy()
    expect(wrapper.find('div').length).toBe(1)
    expect(wrapper.find('p').length).toBe(3)
  })

  test('Can customize the wrapper baseTag', () => {
    const Comp = ({ children }) => renderAsSingleChild(children, 'section')
    const wrapper = mount(
      <Comp>
        <p />
        <p />
        <p />
      </Comp>
    )

    expect(wrapper.html()).toBeTruthy()
    expect(wrapper.find('section').length).toBe(1)
    expect(wrapper.find('p').length).toBe(3)
  })

  test('Can customize the wrapper props', () => {
    const Comp = ({ children }) =>
      renderAsSingleChild(children, 'section', { className: 'Hello' })
    const wrapper = mount(
      <Comp>
        <p />
        <p />
        <p />
      </Comp>
    )

    expect(wrapper.html()).toBeTruthy()
    expect(wrapper.find('section.Hello').length).toBe(1)
    expect(wrapper.find('p').length).toBe(3)
  })

  test('Can render a mapped Array of a single child', () => {
    const InnerComponent = props => <p />
    const data = [
      {
        id: 1,
        key: 1,
      },
    ]
    const Comp = ({ children }) =>
      renderAsSingleChild(children, 'section', { className: 'Hello' })

    const wrapper = mount(
      <Comp>{data.map(d => <InnerComponent {...d} />)}</Comp>
    )

    expect(wrapper.find('p').length).toBe(1)
  })

  test('Can render a mapped Array of a multiple children', () => {
    const InnerComponent = props => <p />
    const data = [
      {
        id: 1,
        key: 1,
      },
      {
        id: 2,
        key: 2,
      },
      {
        id: 3,
        key: 3,
      },
    ]
    const Comp = ({ children }) =>
      renderAsSingleChild(children, 'section', { className: 'Hello' })

    const wrapper = mount(
      <Comp>{data.map(d => <InnerComponent {...d} />)}</Comp>
    )

    expect(wrapper.find('p').length).toBe(3)
  })
})
