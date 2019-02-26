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

describe('onClick prop', () => {
  const spy = jest.fn()
  const wrapper = mount(<ButtonWithOptions onClick={spy} />)
  const el = wrapper.find('button.c-ButtonWithOptions__button')

  el.simulate('click')

  expect(spy).toHaveBeenCalled()
})

describe('size prop', () => {
  const wrapper = mount(<ButtonWithOptions size="sm" />)

  test('applies prop to button', () => {
    const el = wrapper.find('button.c-ButtonWithOptions__button')
    expect(el.hasClass('is-sm')).toBe(true)
  })

  test('applies prop to dropdown trigger', () => {
    const el = wrapper.find('button.c-ButtonWithOptions__dropdownTrigger')
    expect(el.hasClass('is-sm')).toBe(true)
  })
})

describe('kind prop', () => {
  const wrapper = mount(<ButtonWithOptions kind="secondary" />)

  test('applies prop to button', () => {
    const el = wrapper.find('button.c-ButtonWithOptions__button')
    expect(el.hasClass('is-secondary')).toBe(true)
  })

  test('applies kind prop to dropdown trigger', () => {
    const el = wrapper.find('button.c-ButtonWithOptions__dropdownTrigger')
    expect(el.hasClass('is-secondary')).toBe(true)
  })
})

describe('disabled prop', () => {
  it('disables button', () => {
    const spy = jest.fn()
    const wrapper = mount(<ButtonWithOptions disabled onClick={spy} />)
    const el = wrapper.find('button.c-ButtonWithOptions__button')

    el.simulate('click')

    expect(el.prop('disabled')).toBe(true)
    expect(spy).not.toBeCalled()
  })

  it('disables dropdown trigger', () => {
    const spy = jest.fn()
    const dropdownProps = { onTriggerClick: spy }
    const wrapper = mount(
      <ButtonWithOptions disabled dropdownProps={dropdownProps} />
    )
    const el = wrapper.find('button.c-ButtonWithOptions__dropdownTrigger')

    el.simulate('click')

    expect(el.prop('disabled')).toBe(true)
    expect(spy).not.toBeCalled()
  })

  it('disables dropdown', () => {
    const wrapper = mount(<ButtonWithOptions disabled />)
    const el = wrapper.find('AutoDropdown')

    expect(el.prop('disabled')).toBe(true)
  })
})

describe('dropdownProps', () => {
  test('applies props to Dropdown trigger', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <ButtonWithOptions dropdownProps={{ onTriggerClick: spy }} />
    )
    const el = wrapper.find('button.c-ButtonWithOptions__dropdownTrigger')

    el.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Button', () => {
  test('Internally renders Button component', () => {
    const wrapper = mount(
      <ButtonWithOptions>
        <div className="child">Hello</div>
      </ButtonWithOptions>
    )
    const o = wrapper.find('Button')

    expect(o.length).toBeTruthy()
  })
})

describe('AutoDropDown', () => {
  test('Internally renders AutoDropdown component', () => {
    const wrapper = mount(
      <ButtonWithOptions>
        <div className="child">Hello</div>
      </ButtonWithOptions>
    )
    const o = wrapper.find('AutoDropdown')

    expect(o.length).toBeTruthy()
  })
})
