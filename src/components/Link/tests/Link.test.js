import React from 'react'
import { shallow } from 'enzyme'
import Link from '..'

// Since we now wrap Link in a HOC, we have to use `.first.shallow()` to test.
// See https://github.com/airbnb/enzyme/issues/539#issuecomment-239497107
const wrap = (...args) => shallow(...args).first().shallow()

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = wrap(<Link />)

    expect(wrapper.prop('className')).toContain('c-Link')
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = wrap(<Link className={className} />)

    expect(wrapper.prop('className')).toContain(className)
  })
})

describe('Click', () => {
  test('Can trigger onClick callback', () => {
    let value = false
    const onClick = () => { value = true }
    const wrapper = wrap(<Link onClick={onClick} />)

    wrapper.simulate('click')

    expect(value).toBeTruthy()
  })
})

describe('Content', () => {
  test('Renders child content', () => {
    const wrapper = wrap(<Link>Gator</Link>)

    expect(wrapper.text()).toBe('Gator')
  })
})

describe('Href', () => {
  test('Has an href of # by default', () => {
    const wrapper = wrap(<Link>Gator</Link>)

    expect(wrapper.prop('href')).toBe('#')
  })

  test('Can set link href, if specified', () => {
    const url = 'https://www.helpscout.net'
    const wrapper = wrap(<Link href={url}>Gator</Link>)

    expect(wrapper.prop('href')).toBe(url)
  })
})

describe('External', () => {
  test('Adds external <a> attributes if external is specified', () => {
    const wrapper = wrap(<Link external>Link</Link>)

    expect(wrapper.prop('target')).toBe('_blank')
    expect(wrapper.prop('rel')).toContain('noopener noreferrer')
  })
})

describe('RouteWrapper', () => {
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

  test('Specifying a `to` sets up router navigation, overrides default click', done => {
    const route = '/some/route/'
    const wrapper = wrap(<Link href='/gator' to={route}>Gator</Link>, options)
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).toHaveBeenCalled()
    setTimeout(() => {
      expect(push).toHaveBeenCalledWith(route)
      done()
    })
  })

  test('`to` router navigation is skipped on ctrl+click', done => {
    const route = '/some/route/'
    const wrapper = wrap(<Link href='/gator' to={route}>Gator</Link>, options)
    clickEvent.ctrlKey = true
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).not.toHaveBeenCalled()
    setTimeout(() => {
      expect(push).not.toHaveBeenCalled()
      done()
    })
  })

  test('`to` router navigation is skipped on cmd+click', done => {
    const route = '/some/route/'
    const wrapper = wrap(<Link href='/gator' to={route}>Gator</Link>, options)
    clickEvent.metaKey = true
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).not.toHaveBeenCalled()
    setTimeout(() => {
      expect(push).not.toHaveBeenCalled()
      done()
    })
  })

  test('Can fetch data and trigger a route asynchronously', done => {
    const fetch = () => Promise.resolve()
    const to = 'some/route'
    const wrapper = wrap(<Link fetch={fetch} to={to} >Gator</Link>, options)
    expect(wrapper.node.type).toBe('a')
    wrapper.simulate('click', clickEvent)
    expect(preventDefault).toHaveBeenCalled()
    setTimeout(() => {
      expect(push).toHaveBeenCalledWith(to)
      done()
    })
  })
})

describe('Styles', () => {
  test('Sets block styles, if defined', () => {
    const wrapper = wrap(<Link block />)

    expect(wrapper.hasClass('is-block')).toBeTruthy()
  })
})
