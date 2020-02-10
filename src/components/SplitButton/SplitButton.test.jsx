import React from 'react'
import PropTypes from 'prop-types'
import { mount, render } from 'enzyme'
import { SplitButton } from './SplitButton'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<SplitButton />)

    expect(wrapper.hasClass('c-SplitButton')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<SplitButton className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('onClick prop', () => {
  const spy = jest.fn()
  const wrapper = mount(<SplitButton onClick={spy} />)
  const el = wrapper.find('button.c-SplitButton__button')

  el.simulate('click')

  expect(spy).toHaveBeenCalled()
})

describe('size prop', () => {
  const wrapper = mount(<SplitButton size="sm" />)

  test('applies prop to button', () => {
    const el = wrapper.find('button.c-SplitButton__button')
    expect(el.hasClass('is-sm')).toBe(true)
  })

  test('applies prop to dropdown trigger', () => {
    const el = wrapper.find('button.c-SplitButton__dropdownTrigger')
    expect(el.hasClass('is-sm')).toBe(true)
  })
})

describe('kind prop', () => {
  const wrapper = mount(<SplitButton kind="secondary" />)

  test('applies prop to button', () => {
    const el = wrapper.find('button.c-SplitButton__button')
    expect(el.hasClass('is-secondary')).toBe(true)
  })

  test('applies kind prop to dropdown trigger', () => {
    const el = wrapper.find('button.c-SplitButton__dropdownTrigger')
    expect(el.hasClass('is-secondary')).toBe(true)
  })
})

describe('disabled prop', () => {
  it('disables button', () => {
    const spy = jest.fn()
    const wrapper = mount(<SplitButton disabled onClick={spy} />)
    const el = wrapper.find('button.c-SplitButton__button')

    el.simulate('click')

    expect(el.prop('disabled')).toBe(true)
    expect(spy).not.toBeCalled()
  })

  it('disables dropdown trigger', () => {
    const spy = jest.fn()
    const dropdownProps = { onTriggerClick: spy }
    const wrapper = mount(
      <SplitButton disabled dropdownProps={dropdownProps} />
    )
    const el = wrapper.find('button.c-SplitButton__dropdownTrigger')

    el.simulate('click')

    expect(el.prop('disabled')).toBe(true)
    expect(spy).not.toBeCalled()
  })

  it('disables dropdown', () => {
    const wrapper = mount(<SplitButton disabled />)
    const el = wrapper.find('SearchableDropdown')

    expect(el.prop('disabled')).toBe(true)
  })
})

describe('dropdownProps', () => {
  test('applies props to Dropdown trigger', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <SplitButton dropdownProps={{ onTriggerClick: spy }} />
    )
    const el = wrapper.find('button.c-SplitButton__dropdownTrigger')

    el.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Button', () => {
  test('Internally renders Button component', () => {
    const wrapper = mount(
      <SplitButton>
        <div className="child">Hello</div>
      </SplitButton>
    )
    const o = wrapper.find('Button')

    expect(o.length).toBeTruthy()
  })
})

describe('SearchableDropdown', () => {
  test('Internally renders SearchableDropdown component', () => {
    const wrapper = mount(
      <SplitButton>
        <div className="child">Hello</div>
      </SplitButton>
    )
    const o = wrapper.find('SearchableDropdown')

    expect(o.length).toBeTruthy()
  })
})
