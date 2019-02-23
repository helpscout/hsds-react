import * as React from 'react'
import { mount, render } from 'enzyme'
import { ButtonWithOptions } from '../ButtonWithOptions'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<ButtonWithOptions />)

    expect(wrapper.hasClass('c-ButtonWithOptions')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<ButtonWithOptions className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<ButtonWithOptions data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

describe('disabled prop', () => {
  it('disables button', () => {
    const callback = jest.fn()
    const wrapper = mount(<ButtonWithOptions disabled onClick={callback} />)
    const el = wrapper.find('button.c-ButtonWithOptions__button')

    el.simulate('click')

    expect(el.prop('disabled')).toBe(true)
    expect(callback).not.toBeCalled()
  })

  it('disables dropdown trigger', () => {
    const callback = jest.fn()
    const dropdownProps = { onTriggerClick: callback }
    const wrapper = mount(
      <ButtonWithOptions disabled dropdownProps={dropdownProps} />
    )
    const el = wrapper.find('button.c-ButtonWithOptions__dropdownTrigger')

    el.simulate('click')

    expect(el.prop('disabled')).toBe(true)
    expect(callback).not.toBeCalled()
  })
})
