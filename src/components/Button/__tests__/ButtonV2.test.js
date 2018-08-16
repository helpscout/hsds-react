import React from 'react'
import { mount, shallow } from 'enzyme'
import Button from '../ButtonV2'

// Since we now wrap Link in a HOC, we have to use `.first.shallow()` to test.
// See https://github.com/airbnb/enzyme/issues/539#issuecomment-239497107
const wrap = (...args) =>
  shallow(...args)
    .first()
    .shallow()

describe('ClassNames', () => {
  test('Accepts custom className', () => {
    const wrapper = wrap(<Button className="foo bar baz">Click Me</Button>)
    const classNames = wrapper.prop('className')

    expect(classNames).toContain('c-Button')
    expect(classNames).toContain('foo')
    expect(classNames).toContain('bar')
    expect(classNames).toContain('baz')
  })
})

describe('Types', () => {
  test('Adds the respective classNames', () => {
    const primary = wrap(<Button primary>Primary</Button>)
    const plain = wrap(<Button plain>Plain</Button>)

    expect(primary.prop('className')).toContain('is-primary')
    expect(plain.prop('className')).toContain('is-plain')
  })

  test('Creates a button with type="submit"', () => {
    const button = wrap(<Button submit>Submit</Button>)

    expect(button.prop('type')).toBe('submit')
  })

  test('Can create block buttons, if specified', () => {
    const o = wrap(<Button primary>Primary</Button>)

    expect(o.hasClass('is-block')).toBeFalsy()
  })

  test('Can create block buttons, if specified', () => {
    const o = wrap(
      <Button primary block>
        Primary
      </Button>
    )

    expect(o.hasClass('is-block')).toBeTruthy()
  })
})

describe('Sizes', () => {
  test('Adds the respective classNames', () => {
    const lg = wrap(<Button size="lg">Large</Button>)
    const md = wrap(<Button size="md">Medium</Button>)
    const sm = wrap(<Button size="sm">Small</Button>)

    expect(lg.prop('className')).toContain('is-lg')
    expect(md.prop('className')).toContain('is-md')
    expect(sm.prop('className')).toContain('is-sm')
  })
})

describe('States', () => {
  test('Adds the respective classNames', () => {
    const success = wrap(<Button state="success">Success</Button>)
    const error = wrap(<Button state="error">Error</Button>)
    const warning = wrap(<Button state="warning">Warning</Button>)

    expect(success.prop('className')).toContain('is-success')
    expect(error.prop('className')).toContain('is-error')
    expect(warning.prop('className')).toContain('is-warning')
  })

  test('Adds the active classNames', () => {
    const wrapper = wrap(<Button isActive>Button</Button>)

    expect(wrapper.prop('className')).toContain('is-selected')
  })

  test('Disables the button', () => {
    const callback = jest.fn()
    const disabledButton = mount(
      <Button disabled onClick={callback}>
        Disabled
      </Button>
    )
    disabledButton.simulate('click')

    expect(disabledButton.prop('disabled')).toBe(true)
    expect(callback).not.toBeCalled()
  })
})

describe('Outline', () => {
  test('Does not have outline by default', () => {
    const o = wrap(<Button />)

    expect(o.props().outline).not.toBeTruthy()
  })

  test('Can apply outline styles', () => {
    const o = wrap(<Button outline />)

    expect(o.hasClass('is-outline')).toBeTruthy()
  })
})

describe('Themes', () => {
  test('Does not have a theme className by default', () => {
    const o = wrap(<Button />)

    expect(o.props().theme).not.toBeTruthy()
  })

  test('Can add theme className', () => {
    const o = wrap(<Button theme="editing" />)

    expect(o.hasClass('is-editing')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Renders isFirst styles', () => {
    const wrapper = wrap(<Button isFirst />)

    expect(wrapper.hasClass('is-first')).toBe(true)
  })

  test('Renders isNotOnly styles', () => {
    const wrapper = wrap(<Button isNotOnly />)

    expect(wrapper.hasClass('is-notOnly')).toBe(true)
  })

  test('Renders isLast styles', () => {
    const wrapper = wrap(<Button isLast />)

    expect(wrapper.hasClass('is-last')).toBe(true)
  })

  test('Renders danger styles', () => {
    const wrapper = wrap(<Button danger />)

    expect(wrapper.hasClass('is-danger')).toBe(true)
  })
})
