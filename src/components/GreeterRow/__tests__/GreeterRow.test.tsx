import * as React from 'react'
import { mount, render } from 'enzyme'
import { GreeterRow } from '../GreeterRow'

describe('className', () => {
  test('Has default className', () => {
    const wrapper = render(<GreeterRow />)

    expect(wrapper.hasClass('c-GreeterRow')).toBeTruthy()
  })

  test('Can render custom className', () => {
    const customClassName = 'blue'
    const wrapper = render(<GreeterRow className={customClassName} />)

    expect(wrapper.hasClass(customClassName)).toBeTruthy()
  })
})

describe('HTML props', () => {
  test('Can render default HTML props', () => {
    const wrapper = render(<GreeterRow data-cy="blue" />)

    expect(wrapper.attr('data-cy')).toBe('blue')
  })
})

describe('Paused', () => {
  test('Renders a paused UI, if isPaused', () => {
    const wrapper = mount(<GreeterRow isPaused={true} />)
    const el = wrapper.find(`div.${GreeterRow.className}`)
    const icon = wrapper.find('Icon').first()
    const text = wrapper.find('Text').first()

    expect(el.hasClass('is-paused')).toBeTruthy()
    expect(text.prop('shade')).toBe('faint')
    expect(icon.length).toBeTruthy()
    expect(icon.prop('name')).toBe('pause')
  })

  test('Does not render a paused UI, by default', () => {
    const wrapper = mount(<GreeterRow />)
    const el = wrapper.find(`div.${GreeterRow.className}`)
    const icon = wrapper.find('Icon').first()
    const text = wrapper.find('Text').first()

    expect(el.hasClass('is-paused')).not.toBeTruthy()
    expect(text.prop('shade')).not.toBe('faint')
    expect(icon.prop('name')).not.toBe('pause')
  })

  test('Renders a paused title into Tooltip, if paused', () => {
    const wrapper = mount(<GreeterRow isPaused={true} />)
    const el = wrapper.find(`div.${GreeterRow.className}`)
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toBe('Paused')
  })

  test('Can customized Tooltip pausedMessage', () => {
    const wrapper = mount(<GreeterRow isPaused={true} pausedMessage="NO GO" />)
    const el = wrapper.find(`div.${GreeterRow.className}`)
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toBe('NO GO')
  })
})

describe('Name', () => {
  test('Renders a name, instead of children', () => {
    const wrapper = mount(<GreeterRow name="Mugatu">Derek</GreeterRow>)
    const text = wrapper.find('Text').first()

    expect(text.text()).toBe('Mugatu')
  })
})

describe('Error', () => {
  test('Renders a error UI, if isError', () => {
    const wrapper = mount(<GreeterRow isError={true} />)
    const el = wrapper.find(`div.${GreeterRow.className}`)
    const icon = wrapper.find('Icon').first()
    const text = wrapper.find('Text').first()

    expect(el.hasClass('is-error')).toBeTruthy()
    expect(el.hasClass('is-paused')).toBeTruthy()
    expect(text.prop('shade')).toBe('faint')
    expect(icon.length).toBeTruthy()
    expect(icon.prop('name')).toBe('alert')
  })

  test('Does not render a error UI, by default', () => {
    const wrapper = mount(<GreeterRow />)
    const el = wrapper.find(`div.${GreeterRow.className}`)
    const icon = wrapper.find('Icon').first()
    const text = wrapper.find('Text').first()

    expect(el.hasClass('is-paused')).not.toBeTruthy()
    expect(el.hasClass('is-error')).not.toBeTruthy()
    expect(text.prop('shade')).not.toBe('faint')
    expect(icon.prop('name')).not.toBe('alert')
  })

  test('Renders a error title into Tooltip, if error', () => {
    const wrapper = mount(<GreeterRow isError={true} />)
    const el = wrapper.find(`div.${GreeterRow.className}`)
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toContain('paused')
    expect(tooltip.prop('title')).toContain('issue')
  })

  test('Can customized Tooltip errorMessage', () => {
    const wrapper = mount(<GreeterRow isPaused={true} pausedMessage="BAD!" />)
    const el = wrapper.find(`div.${GreeterRow.className}`)
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toBe('BAD!')
  })
})
