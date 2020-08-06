import React from 'react'
import { mount } from 'enzyme'
import CheckMarkCard from '../CheckMarkCard'
import Checkbox from '../Checkbox'
import VisuallyHidden from '../VisuallyHidden'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = mount(<CheckMarkCard />)

    expect(wrapper.find('.c-CheckMarkCard').length).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = mount(<CheckMarkCard className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('dimensions', () => {
  test('should apply maxWidth to card if passed', () => {
    const maxWidth = '124px'
    const wrapper = mount(<CheckMarkCard maxWidth={maxWidth} />)

    expect(wrapper.find('.c-CheckMarkCard').first().props().maxWidth).toBe(
      maxWidth
    )
  })

  test('should apply height to card if passed', () => {
    const height = '124px'
    const wrapper = mount(<CheckMarkCard height={height} />)

    expect(wrapper.find('.c-CheckMarkCard').first().props().height).toBe(height)
  })
})

describe('Checkbox', () => {
  test('should use a Checkbox under the hood', () => {
    const wrapper = mount(<CheckMarkCard />)

    expect(wrapper.find(Checkbox).length).toBeTruthy()
  })

  test('should use VisuallyHidden to hide the checkbox', () => {
    const wrapper = mount(<CheckMarkCard />)

    expect(wrapper.find(VisuallyHidden).length).toBeTruthy()
  })

  test('Passes unique ID to Checkbox', () => {
    const wrapper = mount(<CheckMarkCard />)
    const o = wrapper.find(Checkbox)

    expect(o.prop('id')).toBe(wrapper.state().id)
  })

  test('Passes id prop to Checkbox', () => {
    const wrapper = mount(<CheckMarkCard id="ron" />)
    const o = wrapper.find(Checkbox)

    expect(o.prop('id')).toBe('ron')
  })
})

describe('Checked', () => {
  test('Applies checked styles, if provided', () => {
    const wrapper = mount(<CheckMarkCard checked />)

    expect(wrapper.getDOMNode().classList.contains('is-checked')).toBe(true)

    wrapper.setProps({ checked: false })

    expect(wrapper.getDOMNode().classList.contains('is-checked')).toBe(false)
  })
})

describe('Disabled', () => {
  test('Applies disabled styles, if provided', () => {
    const wrapper = mount(<CheckMarkCard disabled />)

    expect(wrapper.getDOMNode().classList.contains('is-disabled')).toBe(true)

    wrapper.setProps({ disabled: false })

    expect(wrapper.getDOMNode().classList.contains('is-disabled')).toBe(false)
  })
})

describe('Events', () => {
  test('Can fire onChange callback prop', () => {
    const spy = jest.fn()
    const wrapper = mount(<CheckMarkCard onChange={spy} />)
    const input = wrapper.find('input')

    input.simulate('change', { target: { checked: true } })

    expect(spy).toHaveBeenCalled()
  })

  test('Can fire onBlur callback prop', () => {
    const spy = jest.fn()
    const wrapper = mount(<CheckMarkCard onBlur={spy} />)
    const input = wrapper.find('input')

    input.simulate('blur')

    expect(spy).toHaveBeenCalled()
  })

  test('Can fire onFocus callback prop', () => {
    const spy = jest.fn()
    const wrapper = mount(<CheckMarkCard onFocus={spy} />)
    const input = wrapper.find('input')

    input.simulate('focus')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Ref', () => {
  test('Can retrieve the input node from inputRef', () => {
    const spy = jest.fn()
    const wrapper = mount(<CheckMarkCard inputRef={spy} />)
    const o = wrapper.find('input').getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })

  test('Can retrieve the input node from inputRef', () => {
    const spy = jest.fn()
    const wrapper = mount(<CheckMarkCard inputRef={spy} />)
    const o = wrapper.find('input').getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})

describe('Focus', () => {
  test('Does not render focus, by default', () => {
    const wrapper = mount(<CheckMarkCard />)
    const o = wrapper.find('.is-focused').first()

    expect(o.length).toBe(0)
  })

  test('Can preset focus using props', () => {
    const wrapper = mount(<CheckMarkCard isFocused />)

    expect(wrapper.getDOMNode().classList.contains('is-focused')).toBeTruthy()
  })

  test('Adds and removes focus className, if focused or blurred', () => {
    const wrapper = mount(<CheckMarkCard />)

    wrapper.find('input').first().simulate('focus')
    expect(wrapper.getDOMNode().classList.contains('is-focused')).toBeTruthy()

    wrapper.find('input').first().simulate('blur')
    expect(wrapper.getDOMNode().classList.contains('is-focused')).toBeFalsy()
  })
})
