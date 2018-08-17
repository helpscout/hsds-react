import React from 'react'
import { mount } from 'enzyme'
import Button from '../ButtonV2'
import Icon from '../../Icon'

describe('ClassNames', () => {
  test('Accepts custom className', () => {
    const wrapper = mount(<Button className="foo bar baz">Click Me</Button>)
    const classNames = wrapper.prop('className')

    expect(classNames).toContain('foo')
    expect(classNames).toContain('bar')
    expect(classNames).toContain('baz')
  })
})

describe('Kind', () => {
  test('Adds the respective classNames', () => {
    const primary = mount(<Button kind="primary">Primary</Button>)
    const link = mount(<Button kind="link">Plain</Button>)

    expect(primary.hasClass('is-primary')).toBe(true)
    expect(link.hasClass('is-link')).toBe(true)
  })

  test('Creates a button with type="submit"', () => {
    const wrapper = mount(<Button submit>Submit</Button>)

    expect(wrapper.find('button').prop('type')).toBe('submit')
  })

  test('Can create block buttons, if specified', () => {
    const o = mount(<Button isBlock>Button</Button>)

    expect(o.hasClass('is-block')).toBe(true)
  })

  test('Does not render Block style, if spefied', () => {
    const o = mount(<Button isBlock={false}>Button</Button>)

    expect(o.hasClass('is-block')).toBe(false)
  })
})

describe('Sizes', () => {
  test('Adds the respective classNames', () => {
    const lg = mount(<Button size="lg">Large</Button>)
    const md = mount(<Button size="md">Medium</Button>)
    const sm = mount(<Button size="sm">Small</Button>)

    expect(lg.hasClass('is-lg')).toBe(true)
    expect(md.hasClass('is-md')).toBe(true)
    expect(sm.hasClass('is-sm')).toBe(true)
  })
})

describe('States', () => {
  test('Adds the respective classNames', () => {
    const success = mount(<Button state="success">Success</Button>)
    const danger = mount(<Button state="danger">Danger</Button>)
    const warning = mount(<Button state="warning">Warning</Button>)

    expect(success.hasClass('is-success')).toBe(true)
    expect(danger.hasClass('is-danger')).toBe(true)
    expect(warning.hasClass('is-warning')).toBe(true)
  })

  test('Adds the active classNames', () => {
    const wrapper = mount(<Button isActive>Button</Button>)

    expect(wrapper.hasClass('is-active')).toBe(true)
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

describe('Styles', () => {
  test('Applies suffix styles', () => {
    const wrapper = mount(<Button isSuffix>Click Me</Button>)

    expect(wrapper.hasClass('is-suffix')).toBe(true)
  })
})

describe('Themes', () => {
  test('Does not have a theme className by default', () => {
    const o = mount(<Button />)

    expect(o.props().theme).not.toBeTruthy()
  })

  test('Can add theme className', () => {
    const o = mount(<Button theme="editing" />)

    expect(o.hasClass('is-editing')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Renders isFirst styles', () => {
    const wrapper = mount(<Button isFirst />)

    expect(wrapper.hasClass('is-first')).toBe(true)
  })

  test('Renders isNotOnly styles', () => {
    const wrapper = mount(<Button isNotOnly />)

    expect(wrapper.hasClass('is-notOnly')).toBe(true)
  })

  test('Renders isLast styles', () => {
    const wrapper = mount(<Button isLast />)

    expect(wrapper.hasClass('is-last')).toBe(true)
  })
})

describe('Events', () => {
  test('Fires onBlur callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Button onBlur={spy} />)

    wrapper.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onClick callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Button onClick={spy} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('Fires onFocus callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Button onFocus={spy} />)

    wrapper.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Focus', () => {
  test('Renders FocusUI on focus', () => {
    const wrapper = mount(<Button kind="primary" />)
    wrapper.simulate('focus')

    const o = wrapper.find('.c-ButtonV2Focus')

    expect(o.length).toBe(1)
    expect(wrapper.hasClass('is-focused')).toBe(true)
  })

  test('Does not render FocusUI on certain buttons', () => {
    const wrapper = mount(<Button kind="link" />)
    wrapper.simulate('focus')

    const o = wrapper.find('.c-ButtonV2Focus')

    expect(o.length).toBe(0)
  })

  test('Removes FocusUI on blur', () => {
    const wrapper = mount(<Button kind="primary" />)
    wrapper.simulate('focus')
    wrapper.simulate('blur')

    const o = wrapper.find('.c-ButtonV2Focus')

    expect(o.length).toBe(0)
  })

  test('Does not render FocusUI if disabled', () => {
    const wrapper = mount(<Button kind="primary" disabled />)
    wrapper.simulate('focus')

    const o = wrapper.find('.c-ButtonV2Focus')

    expect(o.length).toBe(0)
  })

  test('Can be rendered with prop', () => {
    const wrapper = mount(<Button kind="primary" isFocused />)

    const o = wrapper.find('.c-ButtonV2Focus')

    expect(o.length).toBe(1)
  })

  test('Passes isFirst, isNotOnly, and isLast props', () => {
    const wrapper = mount(
      <Button kind="primary" isFocused isFirst isNotOnly isLast />
    )

    const o = wrapper.find('.c-ButtonV2Focus')

    expect(o.length).toBe(1)
    expect(o.hasClass('is-first'))
    expect(o.hasClass('is-notOnly'))
    expect(o.hasClass('is-last'))
  })
})

describe('Ref', () => {
  test('Can retrieve button ref from innerRef prop', () => {
    let ref
    mount(<Button kind="primary" innerRef={node => (ref = node)} />)

    expect(ref).toBeTruthy()
    expect(ref.tagName).toBe('BUTTON')
  })

  test('Can retrieve button ref from buttonRef prop', () => {
    let ref
    mount(<Button kind="primary" buttonRef={node => (ref = node)} />)

    expect(ref).toBeTruthy()
    expect(ref.tagName).toBe('BUTTON')
  })
})

describe('Icon', () => {
  test('Can render an Icon', () => {
    const wrapper = mount(
      <Button>
        <Icon />
      </Button>
    )

    expect(wrapper.find('Icon').length).toBe(1)
  })

  test('Can render an Icon + Text', () => {
    const wrapper = mount(
      <Button>
        <Icon /> News
      </Button>
    )

    expect(wrapper.find('Icon').length).toBe(1)
    expect(wrapper.text()).toContain('News')
  })

  test('Provides Icon with offsetLeft prop', () => {
    const wrapper = mount(
      <Button>
        <Icon /> News
      </Button>
    )

    expect(wrapper.find('Icon').prop('offsetLeft')).toBe(true)
    expect(wrapper.find('Icon').prop('offsetRight')).toBe(false)
    expect(wrapper.text()).toContain('News')
  })

  test('Provides Icon with offsetRight prop', () => {
    const wrapper = mount(
      <Button>
        News <Icon />
      </Button>
    )

    expect(wrapper.find('Icon').prop('offsetLeft')).toBe(false)
    expect(wrapper.find('Icon').prop('offsetRight')).toBe(true)
    expect(wrapper.text()).toContain('News')
  })
})
