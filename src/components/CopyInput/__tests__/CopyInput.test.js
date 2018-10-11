import React from 'react'
import { mount } from 'enzyme'
import CopyButton from '../../CopyButton'
import CopyInput from '../CopyInput'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = mount(<CopyInput />)
    const input = wrapper.find('.c-Input')

    expect(input.hasClass('c-CopyInput')).toBe(true)
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = mount(<CopyInput className={className} />)
    const input = wrapper.find('.c-Input')

    expect(input.hasClass(className)).toBe(true)
  })
})

describe('Copy button', () => {
  test('Clicking copy will call the onCopy handler', () => {
    const onCopySpy = jest.fn()
    const value = 'Testing'
    const wrapper = mount(<CopyInput onCopy={onCopySpy} value={value} />)

    wrapper.find(CopyButton).simulate('click')

    expect(onCopySpy).toHaveBeenCalledWith(value)
  })

  test('Clicking copy will call the onCopy handler for read only input', () => {
    const onCopySpy = jest.fn()
    const value = 'Testing'
    const wrapper = mount(
      <CopyInput onCopy={onCopySpy} readOnly value={value} />
    )

    wrapper.find(CopyButton).simulate('click')

    expect(onCopySpy).toHaveBeenCalledWith(value)
  })
})
