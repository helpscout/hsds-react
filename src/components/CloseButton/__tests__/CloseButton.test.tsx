import * as React from 'react'
import { mount } from 'enzyme'
import CloseButton from '..'
import { Icon } from '../../'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<CloseButton />)
    const el = wrapper.find('button')

    expect(el.hasClass('c-CloseButton')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'channel-4'
    const wrapper = mount(<CloseButton className={className} />)
    const el = wrapper.find('button')

    expect(el.hasClass(className)).toBe(true)
  })
})

describe('Children', () => {
  test('Does not render children', () => {
    const wrapper = mount(<CloseButton>Hallo</CloseButton>)

    expect(wrapper.html()).not.toContain('Hallo')
  })
})

describe('Accessibility', () => {
  test('Has proper aria-role', () => {
    const wrapper = mount(<CloseButton />)
    const el = wrapper.find('button')

    expect(el.prop('aria-label')).toBe('Close')
  })

  test('Has default title', () => {
    const wrapper = mount(<CloseButton />)
    const el = wrapper.find('button')

    expect(el.prop('title')).toBe('Close')
  })

  test('Can modify title', () => {
    const wrapper = mount(<CloseButton title="CLOSE DIS THING" />)
    const el = wrapper.find('button')

    expect(el.prop('title')).toBe('CLOSE DIS THING')
  })
})

describe('Events', () => {
  test('Can trigger onBlur callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<CloseButton onBlur={spy} />)

    wrapper.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('Can trigger onClick callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<CloseButton onClick={spy} />)

    wrapper.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('Can trigger onFocus callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<CloseButton onFocus={spy} />)

    wrapper.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Styles', () => {
  test('Applies "seamless" styles, if specified', () => {
    const wrapper = mount(<CloseButton seamless />)
    const el = wrapper.find('button')

    expect(el.hasClass('is-seamless')).toBeTruthy()
  })

  test('Applies size styles, if specified', () => {
    const wrapper = mount(<CloseButton size="sm" />)
    const el = wrapper.find('button')

    expect(el.hasClass('is-sm')).toBeTruthy()
  })
})

describe('Icon', () => {
  test('Renders an icon', () => {
    const wrapper = mount(<CloseButton />)
    const o = wrapper.find(Icon)

    expect(o.length).toBeTruthy()
  })

  test('Renders a large close icon by default', () => {
    const wrapper = mount(<CloseButton />)
    const o = wrapper.find(Icon)

    expect(o.prop('name')).toBe('cross-large')
  })

  test('Renders a small close icon, if size is tiny', () => {
    const wrapper = mount(<CloseButton size="tiny" />)
    const o = wrapper.find(Icon)

    expect(o.prop('name')).toBe('cross-small')
  })
})
