import React from 'react'
import { mount } from 'enzyme'
import Button from './Button'
import Icon from '../Icon'

describe('ClassNames', () => {
  test('Accepts custom className', () => {
    const wrapper = mount(<Button className="foo bar baz">Click Me</Button>)
    const classNames = wrapper.find('button.c-Button').prop('className')

    expect(classNames).toContain('foo')
    expect(classNames).toContain('bar')
    expect(classNames).toContain('baz')
  })
})

describe('Kind', () => {
  test('Adds the respective classNames', () => {
    const primary = mount(<Button kind="primary">Primary</Button>)
    const link = mount(<Button kind="link">Plain</Button>)

    expect(primary.find('button.c-Button').hasClass('is-primary')).toBe(true)
    expect(link.find('button.c-Button').hasClass('is-link')).toBe(true)
  })

  test('Creates a button with type="submit"', () => {
    const wrapper = mount(<Button submit>Submit</Button>)

    expect(wrapper.find('button').prop('type')).toBe('submit')
  })

  test('Can create block buttons, if specified', () => {
    const wrapper = mount(<Button isBlock>Button</Button>)

    expect(wrapper.find('button.c-Button').hasClass('is-block')).toBe(true)
  })

  test('Does not render Block style, if spefied', () => {
    const wrapper = mount(<Button isBlock={false}>Button</Button>)

    expect(wrapper.find('button.c-Button').hasClass('is-block')).toBe(false)
  })
})

describe('Sizes', () => {
  test('Adds the respective classNames', () => {
    const lg = mount(<Button size="lg">Large</Button>)
    const md = mount(<Button size="md">Medium</Button>)
    const sm = mount(<Button size="sm">Small</Button>)
    const xl = mount(<Button size="lgxl">ExtraLarge</Button>)

    expect(lg.find('button.c-Button').hasClass('is-lg')).toBe(true)
    expect(md.find('button.c-Button').hasClass('is-md')).toBe(true)
    expect(sm.find('button.c-Button').hasClass('is-sm')).toBe(true)
    expect(xl.find('button.c-Button').hasClass('is-xl')).toBe(true)
  })
})

describe('States', () => {
  test('Adds the respective classNames', () => {
    const success = mount(<Button state="success">Success</Button>)
    const danger = mount(<Button state="danger">Danger</Button>)
    const warning = mount(<Button state="warning">Warning</Button>)

    expect(success.find('button.c-Button').hasClass('is-success')).toBe(true)
    expect(danger.find('button.c-Button').hasClass('is-danger')).toBe(true)
    expect(warning.find('button.c-Button').hasClass('is-warning')).toBe(true)
  })

  test('Adds the active classNames', () => {
    const wrapper = mount(<Button isActive>Button</Button>)

    expect(wrapper.find('button.c-Button').hasClass('is-active')).toBe(true)
  })

  test('Adds the focus classNames', () => {
    const wrapper = mount(<Button isFocused>Button</Button>)

    expect(wrapper.find('button.c-Button').hasClass('is-focused')).toBe(true)
  })

  test('Adds the hover classNames', () => {
    const wrapper = mount(<Button isHovered>Button</Button>)

    expect(wrapper.find('button.c-Button').hasClass('is-hovered')).toBe(true)
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

    expect(wrapper.find('button.c-Button').hasClass('is-suffix')).toBe(true)
  })
})

describe('Themes', () => {
  test('Does not have a theme className by default', () => {
    const wrapper = mount(<Button />)

    expect(wrapper.props().theme).not.toBeTruthy()
  })

  test('Can add theme className', () => {
    const wrapper = mount(<Button theme="editing" />)

    expect(wrapper.find('button.c-Button').hasClass('is-editing')).toBeTruthy()
  })
})

describe('Styles', () => {
  test('Renders isFirst styles', () => {
    const wrapper = mount(<Button isFirst />)

    expect(wrapper.find('button.c-Button').hasClass('is-first')).toBe(true)
  })

  test('Renders isNotOnly styles', () => {
    const wrapper = mount(<Button isNotOnly />)

    expect(wrapper.find('button.c-Button').hasClass('is-notOnly')).toBe(true)
  })

  test('Renders isLast styles', () => {
    const wrapper = mount(<Button isLast />)

    expect(wrapper.find('button.c-Button').hasClass('is-last')).toBe(true)
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

    const o = wrapper.find('span.c-ButtonFocus')

    expect(o.length).toBe(1)
  })

  test('Does not render FocusUI on certain buttons', () => {
    const wrapper = mount(<Button kind="link" />)
    wrapper.simulate('focus')

    const o = wrapper.find('span.c-ButtonFocus')

    expect(o.length).toBe(0)
  })

  test('Does not render FocusUI if disabled', () => {
    const wrapper = mount(<Button kind="primary" disabled />)
    wrapper.simulate('focus')

    const o = wrapper.find('span.c-ButtonFocus')

    expect(o.length).toBe(0)
  })

  test('Can be rendered with prop', () => {
    const wrapper = mount(<Button kind="primary" isFocused />)

    const o = wrapper.find('span.c-ButtonFocus')

    expect(o.length).toBe(1)
  })

  test('Passes isFirst, isNotOnly, and isLast props', () => {
    const wrapper = mount(
      <Button kind="primary" isFocused isFirst isNotOnly isLast />
    )

    const o = wrapper.find('span.c-ButtonFocus')

    expect(o.length).toBe(1)
    expect(o.hasClass('is-first'))
    expect(o.hasClass('is-notOnly'))
    expect(o.hasClass('is-last'))
  })
})

describe('Ref', () => {
  test('Can retrieve button ref from ref prop', () => {
    let ref
    mount(<Button kind="primary" innerRef={node => (ref = node)} />)

    expect(ref).toBeTruthy()
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

describe('Content event propagation', () => {
  test('Allows content event propagation by default', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Button onClick={spy}>
        <Icon />
      </Button>
    )
    const el = wrapper.find('Icon').last()

    el.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Link', () => {
  test('Can render a link, if href is defined', () => {
    const wrapper = mount(<Button href="/" />)

    expect(wrapper.find('a').length).toBeTruthy()
    expect(wrapper.find('button').length).toBeFalsy()
  })

  test('Can render a link, if to is defined', () => {
    const wrapper = mount(<Button to="/" />)

    expect(wrapper.find('a').length).toBeTruthy()
    expect(wrapper.find('button').length).toBeFalsy()
  })

  test('Can render a link based props', () => {
    const wrapper = mount(<Button href="/" target="_blank" />)
    const el = wrapper.find('a').first()

    expect(el.length).toBeTruthy()
    expect(el.prop('target')).toBe('_blank')
  })

  test('Changes back to <button>, if href is removed', () => {
    const wrapper = mount(<Button href="/" />)

    expect(wrapper.find('a').length).toBeTruthy()

    wrapper.setProps({ href: null })

    expect(wrapper.find('a').length).toBeFalsy()
    expect(wrapper.find('button').length).toBeTruthy()
  })
})

describe('Loading', () => {
  test('Add loading className, if isLoading', () => {
    const wrapper = mount(<Button isLoading />)
    const el = wrapper.find('button')

    expect(el.hasClass('is-loading')).toBeTruthy()
  })

  test('Renders a spinner if isLoading', () => {
    const wrapper = mount(<Button isLoading />)
    const el = wrapper.find('div.c-Spinner')

    expect(el.length).toBeTruthy()
  })

  test('Does not renders a spinner if not isLoading', () => {
    const wrapper = mount(<Button isLoading={false} />)
    const el = wrapper.find('div.c-Spinner')

    expect(el.length).toBeFalsy()
  })

  test('Becomes disabled if isLoading, by default', () => {
    const wrapper = mount(<Button isLoading />)
    const el = wrapper.find('button')

    expect(el.prop('disabled')).toBe(true)
  })

  test('Does not become disabled, if specified', () => {
    const wrapper = mount(<Button isLoading disableOnLoading={false} />)
    const el = wrapper.find('button')

    expect(el.prop('disabled')).toBe(false)
  })

  test('Add special spinButtonOnLoading, if isLoading and enabled', () => {
    const wrapper = mount(<Button isLoading spinButtonOnLoading />)
    const el = wrapper.find('button')

    expect(el.hasClass('is-spinButtonOnLoading')).toBeTruthy()
  })
})
