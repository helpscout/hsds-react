import * as React from 'react'
import { mount, render } from 'enzyme'
import { RateAction } from '../RateAction'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<RateAction />)

    expect(wrapper.hasClass('c-RateAction')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<RateAction className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<RateAction data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

describe('Events', () => {
  test('onBlur callback still works', () => {
    const spy = jest.fn()
    const wrapper = mount(<RateAction onBlur={spy} />)

    wrapper.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('onFocus callback still works', () => {
    const spy = jest.fn()
    const wrapper = mount(<RateAction onFocus={spy} />)

    wrapper.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })
})

describe('isActive', () => {
  test('onBlur sets isActive to false', () => {
    const wrapper = mount(<RateAction isActive={true} />)

    wrapper.simulate('blur')

    // @ts-ignore
    expect(wrapper.state().isActive).toBe(false)
  })

  test('onFocus sets isActive to false', () => {
    const wrapper = mount(<RateAction isActive={false} />)

    wrapper.simulate('focus')

    // @ts-ignore
    expect(wrapper.state().isActive).toBe(true)
  })

  test('Can control isActive state with isActive prop', () => {
    const wrapper = mount(<RateAction />)
    wrapper.setState({ isActive: true })
    wrapper.setProps({ isActive: false })

    // @ts-ignore
    expect(wrapper.state().isActive).toBe(false)
  })

  test('Does not change isActive state with isActive prop is the same', () => {
    const wrapper = mount(<RateAction />)
    wrapper.setState({ isActive: true })
    wrapper.setProps({ isActive: true })

    // @ts-ignore
    expect(wrapper.state().isActive).toBe(true)
  })
})

describe('Emoticon', () => {
  test('Renders the correct Emoticon, based on name', () => {
    const wrapper = mount(<RateAction name="meh" />)
    const comp = wrapper.find('Emoticon')

    expect(comp.prop('name')).toBe('meh')
  })

  test('Passes isActive state to Emoticon', () => {
    const wrapper = mount(<RateAction isActive={true} />)
    const comp = wrapper.find('Emoticon')

    expect(comp.prop('isActive')).toBe(true)
  })

  test('Passes disabled state to Emoticon', () => {
    const wrapper = mount(<RateAction disabled />)
    const comp = wrapper.find('Emoticon')

    expect(comp.prop('isDisabled')).toBe(true)
  })

  test('Can disable Emoticon animation', () => {
    const wrapper = mount(<RateAction withAnimation={false} />)
    const comp = wrapper.find('Emoticon')

    expect(comp.prop('withAnimation')).toBe(false)
  })
})
