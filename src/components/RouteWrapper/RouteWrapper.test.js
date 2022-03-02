import React, { Component } from 'react'
import { mount, shallow } from 'enzyme'
import RouteWrapper, { createLocation } from './RouteWrapper'
import { Router } from 'react-router'

let push
let replace
let history
let preventDefault
let clickEvent

beforeEach(() => {
  push = jest.fn()
  replace = jest.fn()
  history = { replace, push, listen: jest.fn(), location: {} }
  preventDefault = jest.fn()
  clickEvent = { preventDefault }
})

class SomePig extends Component {
  render() {
    const { staticContext, ...props } = this.props
    return <div {...props}>Some pig!</div>
  }
}
const RouteWrappedPig = RouteWrapper(SomePig)

describe('Route fetching', () => {
  test('Can fetch data and trigger a route asynchronously', async () => {
    const fetch = () => {
      return Promise.resolve()
    }
    const to = 'some/route'
    const wrapper = mount(
      <Router history={history}>
        <RouteWrappedPig fetch={fetch} to={to} />
      </Router>
    )
    const element = wrapper.find('div')
    element.simulate('click', clickEvent)
    expect(preventDefault).toHaveBeenCalled()
    await Promise.resolve() // Wait for fetch promise to resolve
    expect(push).toHaveBeenCalledWith(to)
  })

  test('Specifying a `to` but no `fetch()` routes correctly', async () => {
    const to = 'some/other/route'
    const wrapper = mount(
      <Router history={history}>
        <RouteWrappedPig to={to} />
      </Router>
    )
    const element = wrapper.find('div')
    element.simulate('click', clickEvent)
    expect(preventDefault).toHaveBeenCalled()
    await Promise.resolve() // Wait for fetch promise to resolve
    expect(push).toHaveBeenCalledWith(to)
  })

  test('Should default to history.push on click', async () => {
    const wrapper = mount(
      <Router history={history}>
        <RouteWrappedPig to="/url" />
      </Router>
    )

    wrapper.find('div').simulate('click', clickEvent)

    await Promise.resolve() // Wait for fetch promise to resolve
    expect(push).toHaveBeenCalled()
    expect(replace).not.toHaveBeenCalled()
  })

  test('Should call history.replace on click, if specified', async () => {
    const wrapper = mount(
      <Router history={history}>
        <RouteWrappedPig to="/url" replace={true} />
      </Router>
    )

    wrapper.find('div').simulate('click', clickEvent)

    await Promise.resolve() // Wait for fetch promise to resolve
    expect(push).not.toHaveBeenCalled()
    expect(replace).toHaveBeenCalled()
  })
})

describe('displayName', () => {
  test('Uses a ComposedComponent.name', () => {
    const Derek = () => <div />
    const WrappedComponent = RouteWrapper(Derek)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Uses a ComposedComponent.displayName', () => {
    const Composed = () => <div />
    Composed.displayName = 'Derek'
    const WrappedComponent = RouteWrapper(Composed)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Works with React.Component', () => {
    class Derek extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = RouteWrapper(Derek)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })

  test('Works with React.Component.displayName', () => {
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    Composed.displayName = 'Derek'
    const WrappedComponent = RouteWrapper(Composed)

    expect(WrappedComponent.displayName).toContain('with')
    expect(WrappedComponent.displayName).toContain('Derek')
  })
})

// TODO: Resolve data-bypass
describe.skip('data-bypass', () => {
  test('Adds data-bypass="false" if to is not defined', () => {
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = RouteWrapper(Composed)
    const wrapper = shallow(<WrappedComponent />)

    expect(wrapper.prop('data-bypass')).toBe(false)
  })

  test('Adds data-bypass="true" if to is defined', () => {
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = RouteWrapper(Composed)
    const wrapper = shallow(<WrappedComponent to="/" />)

    expect(wrapper.prop('data-bypass')).toBe(true)
  })

  test('Can override data-bypass', () => {
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = RouteWrapper(Composed)
    const wrapper = shallow(<WrappedComponent to="/" data-bypass={false} />)

    expect(wrapper.prop('data-bypass')).toBe(false)
  })
})

describe('to/href', () => {
  test('Should pass "href" to component', () => {
    const wrapper = mount(
      <Router history={history}>
        <RouteWrappedPig href="/abc" />
      </Router>
    )

    expect(wrapper.find('div').prop('href')).toBe('/abc')
  })

  test('Should pass "to" to component', () => {
    const wrapper = mount(
      <Router history={history}>
        <RouteWrappedPig to="/abc" />
      </Router>
    )

    expect(wrapper.find('div').prop('href')).toBe('/abc')
  })
})

describe('onClick', () => {
  test('onClick callback should still work', () => {
    const spy = jest.fn()
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = RouteWrapper(Composed)
    const wrapper = shallow(<WrappedComponent onClick={spy} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('Should not call fetch if metaKey is pressed onClick', () => {
    const fetchSpy = jest.fn()
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = RouteWrapper(Composed)
    const wrapper = shallow(<WrappedComponent fetch={fetchSpy} />)

    wrapper.simulate('click', {
      metaKey: true,
    })

    expect(fetchSpy).not.toHaveBeenCalled()
  })

  test('Should not call fetch if ctrlKey is pressed onClick', () => {
    const fetchSpy = jest.fn()
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = RouteWrapper(Composed)
    const wrapper = shallow(<WrappedComponent fetch={fetchSpy} />)

    wrapper.simulate('click', {
      ctrlKey: true,
    })

    expect(fetchSpy).not.toHaveBeenCalled()
  })
})

describe('createLocation', () => {
  test('Can create a history from a plain string path', () => {
    const location = createLocation('/hello')

    expect(location.pathname).toBe('/hello')
    expect(location.key).toBeTruthy()
  })

  test('Strips params from path', () => {
    const location = createLocation('/hello/:post/:id/there')

    expect(location.pathname).toBe('/hello/there')
    expect(location.key).toBeTruthy()
  })

  test('Can customize key for path argument', () => {
    const key = 'abc123'
    const location = createLocation('/hello', null, key)

    expect(location.pathname).toBe('/hello')
    expect(location.key).toBe(key)
  })

  test('Can create location from another location', () => {
    const prevLocation = createLocation('/hello')
    prevLocation.pathname = '/hello/there'
    const location = createLocation(null, null, null, prevLocation)

    expect(location.pathname).toBe('/hello/there')
  })

  test('Can customize key for location argument', () => {
    const prevLocation = createLocation('/hello')
    prevLocation.pathname = '/hello/there'

    const key = 'abc123'

    const location = createLocation(null, null, key, prevLocation)

    expect(location.pathname).toBe('/hello/there')
    expect(location.key).toBe(key)
  })
})
