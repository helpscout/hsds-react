import * as React from 'react'
import { mount, render } from 'enzyme'
import { MessageRow } from '../MessageRow'

const defaultProps = {
  index: -1,
  isDragging: false,
  isDraggingOnList: false,
  valid: false
}

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<MessageRow {...defaultProps} />)

    expect(wrapper.hasClass('c-MessageRow')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<MessageRow  {...defaultProps} className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<MessageRow  {...defaultProps} data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

describe('Paused', () => {
  test('Renders a paused UI, if isPaused', () => {
    const wrapper = mount(<MessageRow  {...defaultProps}  isPaused={true} />)
    const el = wrapper.find(`div.${MessageRow.className}`)
    const icon = wrapper.find('Icon').first()
    const text = wrapper.find('Text').first()

    expect(el.hasClass('is-paused')).toBeTruthy()
    expect(text.prop('shade')).toBe('faint')
    expect(icon.length).toBeTruthy()
    expect(icon.prop('name')).toBe('pause')
  })

  test('Does not render a paused UI, by default', () => {
    const wrapper = mount(<MessageRow  {...defaultProps}  />)
    const el = wrapper.find(`div.${MessageRow.className}`)
    const icon = wrapper.find('Icon').first()
    const text = wrapper.find('Text').first()

    expect(el.hasClass('is-paused')).not.toBeTruthy()
    expect(text.prop('shade')).not.toBe('faint')
    expect(icon.prop('name')).not.toBe('pause')
  })

  test('Renders a paused title into Tooltip, if paused', () => {
    const wrapper = mount(<MessageRow  {...defaultProps}  isPaused={true} />)
    const el = wrapper.find(`div.${MessageRow.className}`)
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toBe('Paused')
  })

  test('Can customized Tooltip pausedMessage', () => {
    const wrapper = mount(<MessageRow  {...defaultProps} isPaused={true} pausedMessage="NO GO" />)
    const el = wrapper.find(`div.${MessageRow.className}`)
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toBe('NO GO')
  })
})

describe('Name', () => {
  test('Renders a name, instead of children', () => {
    const wrapper = mount(<MessageRow  {...defaultProps} name="Mugatu">Derek</MessageRow>)
    const text = wrapper.find('Text').first()

    expect(text.text()).toBe('Mugatu')
  })
})

describe('Error', () => {
  test('Renders a error UI, if isError', () => {
    const wrapper = mount(<MessageRow {...defaultProps} isError={true} />)
    const el = wrapper.find(`div.${MessageRow.className}`)
    const icon = wrapper.find('Icon').first()
    const text = wrapper.find('Text').first()

    expect(el.hasClass('is-error')).toBeTruthy()
    expect(el.hasClass('is-paused')).toBeTruthy()
    expect(text.prop('shade')).toBe('faint')
    expect(icon.length).toBeTruthy()
    expect(icon.prop('name')).toBe('alert')
  })

  test('Does not render a error UI, by default', () => {
    const wrapper = mount(<MessageRow {...defaultProps} />)
    const el = wrapper.find(`div.${MessageRow.className}`)
    const icon = wrapper.find('Icon').first()
    const text = wrapper.find('Text').first()

    expect(el.hasClass('is-paused')).not.toBeTruthy()
    expect(el.hasClass('is-error')).not.toBeTruthy()
    expect(text.prop('shade')).not.toBe('faint')
    expect(icon.prop('name')).not.toBe('alert')
  })

  test('Renders a error title into Tooltip, if error', () => {
    const wrapper = mount(<MessageRow {...defaultProps} isError={true} />)
    const el = wrapper.find(`div.${MessageRow.className}`)
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toContain('paused')
    expect(tooltip.prop('title')).toContain('issue')
  })

  test('Can customized Tooltip errorMessage', () => {
    const wrapper = mount(<MessageRow {...defaultProps} isPaused={true} pausedMessage="BAD!" />)
    const el = wrapper.find(`div.${MessageRow.className}`)
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toBe('BAD!')
  })
})
