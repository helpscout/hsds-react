import React, { Component } from 'react'
import { shallow } from 'enzyme'
import RouteWrapper from '..'

// Since we now wrap Link in a HOC, we have to use `.first.shallow()` to test.
// See https://github.com/airbnb/enzyme/issues/539#issuecomment-239497107
const wrap = (...args) =>
  shallow(...args)
    .first()
    .shallow()

const wrapperContext = {
  context: {
    router: {},
  },
}

describe('Route fetching', () => {
  let options
  let push
  let history
  let preventDefault
  let clickEvent

  beforeEach(() => {
    push = jest.fn()
    history = { push }
    options = {
      context: {
        router: { history },
      },
    }
    preventDefault = jest.fn()
    clickEvent = { preventDefault }
  })

  class SomePig extends Component {
    render() {
      return <div {...this.props}>Some pig!</div>
    }
  }
  const RouteWrappedPig = RouteWrapper(SomePig)

  test('Can fetch data and trigger a route asynchronously', done => {
    const fetch = () => {
      return Promise.resolve()
    }
    const to = 'some/route'
    const wrapper = wrap(<RouteWrappedPig fetch={fetch} to={to} />, options)
    expect(wrapper.getElement().type).toBe('div')
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).toHaveBeenCalled()
    setTimeout(() => {
      expect(push).toHaveBeenCalledWith(to)
      done()
    })
  })

  test('Specifying a `to` but no `fetch()` routes correctly', done => {
    const to = 'some/other/route'
    const wrapper = wrap(<RouteWrappedPig to={to} />, options)
    expect(wrapper.getElement().type).toBe('div')
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).toHaveBeenCalled()
    setTimeout(() => {
      expect(push).toHaveBeenCalledWith(to)
      done()
    })
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

describe('data-bypass', () => {
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

  test('Adds data-bypass="true" if to is not defined', () => {
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = RouteWrapper(Composed)
    const wrapper = shallow(<WrappedComponent to="/" />, wrapperContext)

    expect(wrapper.prop('data-bypass')).toBe(true)
  })

  test('Can override data-bypass', () => {
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = RouteWrapper(Composed)
    const wrapper = shallow(
      <WrappedComponent to="/" data-bypass={false} />,
      wrapperContext
    )

    expect(wrapper.prop('data-bypass')).toBe(false)
  })
})

describe('to/href', () => {
  test('Should pass "href" to component', () => {
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = RouteWrapper(Composed)
    const wrapper = shallow(<WrappedComponent href="/abc" />)

    expect(wrapper.prop('href')).toBe('/abc')
  })

  test('Should pass "to" to component', () => {
    class Composed extends React.Component {
      render() {
        return <div />
      }
    }
    const WrappedComponent = RouteWrapper(Composed)
    const wrapper = shallow(<WrappedComponent to="/abc" />)

    expect(wrapper.prop('href')).toBe('/abc')
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
