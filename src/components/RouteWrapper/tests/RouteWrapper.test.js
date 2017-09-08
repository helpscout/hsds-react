import React, { Component } from 'react'
import { shallow } from 'enzyme'
import RouteWrapper from '..'

// Since we now wrap Link in a HOC, we have to use `.first.shallow()` to test.
// See https://github.com/airbnb/enzyme/issues/539#issuecomment-239497107
const wrap = (...args) => shallow(...args).first().shallow()

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
        router: { history }
      }
    }
    preventDefault = jest.fn()
    clickEvent = { preventDefault }
  })

  class SomePig extends Component {
    render () {
      return (<div {...this.props}>Some pig!</div>)
    }
  }
  const RouteWrappedPig = RouteWrapper(SomePig)

  test('Can fetch data and trigger a route asynchronously', done => {
    const fetch = () => {
      return Promise.resolve()
    }
    const to = 'some/route'
    const wrapper = wrap(<RouteWrappedPig fetch={fetch} to={to} />, options)
    expect(wrapper.node.type).toBe('div')
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
    expect(wrapper.node.type).toBe('div')
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).toHaveBeenCalled()
    setTimeout(() => {
      expect(push).toHaveBeenCalledWith(to)
      done()
    })
  })
})
