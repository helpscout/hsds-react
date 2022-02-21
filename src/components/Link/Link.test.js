import React from 'react'
import { mount, shallow } from 'enzyme'
import { Router } from 'react-router'
import Link, { wordHasSpaces } from './Link'

// Since we now wrap Link in a HOC, we have to use `.first.shallow()` to test.
// See https://github.com/airbnb/enzyme/issues/539#issuecomment-239497107
const wrap = (...args) =>
  shallow(...args)
    .first()
    .shallow()

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
    const onClick = () => {
      value = true
    }
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

describe.skip('RouteWrapper', () => {
  let push
  let history
  let preventDefault
  let clickEvent

  beforeEach(() => {
    push = jest.fn()
    history = { push, listen: jest.fn(), location: {} }
    preventDefault = jest.fn()
    clickEvent = { preventDefault }
  })

  test('Specifying a `to` sets up router navigation, overrides default click', async () => {
    const route = '/some/route/'
    const wrapper = mount(
      <Router history={history}>
        <Link href="/gator" to={route}>
          Gator
        </Link>
      </Router>
    )
    wrapper.find('a').simulate('click', clickEvent)
    await Promise.resolve()
    expect(preventDefault).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith(route)
  })

  test('`to` router navigation is skipped on ctrl+click', async () => {
    const route = '/some/route/'
    const wrapper = mount(
      <Router history={history}>
        <Link href="/gator" to={route}>
          Gator
        </Link>
      </Router>
    )
    clickEvent.ctrlKey = true
    wrapper.find('a').simulate('click', clickEvent)
    await Promise.resolve()
    expect(preventDefault).not.toHaveBeenCalled()
    expect(push).not.toHaveBeenCalled()
  })

  test('`to` router navigation is skipped on cmd+click', async () => {
    const route = '/some/route/'
    const wrapper = mount(
      <Router history={history}>
        <Link href="/gator" to={route}>
          Gator
        </Link>
      </Router>
    )
    clickEvent.metaKey = true
    wrapper.find('a').simulate('click', clickEvent)
    await Promise.resolve()
    expect(preventDefault).not.toHaveBeenCalled()
    expect(push).not.toHaveBeenCalled()
  })

  test('Can fetch data and trigger a route asynchronously', async () => {
    const fetch = () => Promise.resolve()
    const to = 'some/route'
    const wrapper = mount(
      <Router history={history}>
        <Link fetch={fetch} to={to}>
          Gator
        </Link>
      </Router>
    )
    wrapper.find('a').simulate('click', clickEvent)
    await Promise.resolve()
    expect(preventDefault).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith(to)
  })
})

describe('Styles', () => {
  test('Sets block styles, if defined', () => {
    const wrapper = wrap(<Link block />)

    expect(wrapper.hasClass('is-block')).toBeTruthy()
  })
})

describe('voidOnClick', () => {
  test('Is not void by default', () => {
    const wrapper = wrap(<Link href="/gator">Gator</Link>)

    expect(wrapper.prop('href')).not.toBe('javascript:void(0);')
  })

  test('Disables the href if voidOnClick is set', () => {
    const wrapper = wrap(
      <Link href="/gator" voidOnClick>
        Gator
      </Link>
    )

    expect(wrapper.prop('href')).toBe('javascript:void(0);')
  })
})

describe('wordHasSpaces', () => {
  test('Returns false for non-words', () => {
    expect(wordHasSpaces()).toBeFalsy()
    expect(wordHasSpaces([])).toBeFalsy()
    expect(wordHasSpaces('')).toBeFalsy()
    expect(wordHasSpaces({})).toBeFalsy()
    expect(wordHasSpaces(true)).toBeFalsy()
    expect(wordHasSpaces(123)).toBeFalsy()
    expect(wordHasSpaces('word')).toBeFalsy()
    expect(wordHasSpaces('super-long-word_with_hyphen(underscore)')).toBeFalsy()
    expect(wordHasSpaces(' starts-with-space')).toBeFalsy()
  })

  test('Returns true for words with spaces', () => {
    expect(wordHasSpaces('super longworddddddddd')).toBeTruthy()
    expect(wordHasSpaces(' super longworddddddddd')).toBeTruthy()
  })
})
