import React from 'react'
import { mount, render } from 'enzyme'
import CopyButton from '../CopyButton'
import CopyInput from './CopyInput'

describe('ClassName', () => {
  test('Has default component className', () => {
    const wrapper = render(<CopyInput />)
    const el = wrapper.find('.c-CopyInput')

    expect(el.length).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const className = 'gator'
    const wrapper = render(<CopyInput className={className} />)
    const el = wrapper.find('.c-CopyInput')

    expect(el.hasClass(className)).toBe(true)
  })
})

describe('Button label', () => {
  test('Can display with a text copy button', () => {
    const buttonLabel = 'Copy Me'
    const wrapper = render(<CopyInput buttonLabel={buttonLabel} />)
    const el = wrapper.find('.c-CopyInput')

    expect(el.length).toBeTruthy()

    const buttonText = wrapper.find('.c-CopyButton').text()
    expect(buttonText).toContain(buttonLabel)
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

describe('ref', () => {
  test('Can retrieve ref DOM node', () => {
    const spy = jest.fn()
    const wrapper = mount(<CopyInput innerRef={spy} />)
    const o = wrapper.find('input').getDOMNode()

    expect(spy).toHaveBeenCalledWith(o)
  })
})
