import * as React from 'react'
import { mount, shallow, render } from 'enzyme'
import { MessageRow } from '../MessageRow'
import AccordionLink from '../../Accordion/Accordion.Link'

const defaultProps = {
  errorMessage: 'There was an error',
  index: 1,
  isDragging: false,
  isDraggingOnList: false,
  isError: false,
  isNotStarted: false,
  isPaused: false,
  isValid: true,
  notStartedMessage: 'not started',
}

describe('paused', () => {
  test('renders a paused UI, if isPaused', () => {
    const wrapper = mount(<MessageRow {...defaultProps} isPaused={true} />)
    const badge = wrapper.find('Badge').first()
    const text = wrapper.find('Text').first()

    expect(text.prop('shade')).toBe('faint')
    expect(badge.length).toBeTruthy()
    expect(badge.text()).toBe('Paused')
  })
  test('does not render a paused UI, by default', () => {
    const wrapper = mount(<MessageRow {...defaultProps} />)
    const icon = wrapper.find('Icon').first()
    const text = wrapper.find('Text').first()

    expect(text.prop('shade')).not.toBe('faint')
    expect(icon.prop('name')).not.toBe('pause')
  })
  test('renders a paused title into Tooltip, if paused', () => {
    const wrapper = mount(<MessageRow {...defaultProps} isPaused={true} />)
    const tooltip = wrapper.find('Tooltip').first()
    expect(tooltip.prop('title')).toBe('Paused')
  })
  test('can customized Tooltip pausedMessage', () => {
    const wrapper = mount(
      <MessageRow {...defaultProps} isPaused={true} pausedMessage="NO GO" />
    )
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toBe('NO GO')
  })
})

describe('name', () => {
  test('renders a name, instead of children', () => {
    const wrapper = mount(
      <MessageRow {...defaultProps} name="Mugatu">
        Derek
      </MessageRow>
    )
    const text = wrapper.find('Text').first()

    expect(text.text()).toBe('Mugatu')
  })
})

describe('error', () => {
  test('renders a error UI, if isError', () => {
    const wrapper = mount(<MessageRow {...defaultProps} isValid={false} />)
    const badge = wrapper.find('Badge').first()
    const text = wrapper.find('Text').first()

    expect(badge.length).toBeTruthy()
    expect(badge.text()).toEqual('Needs Attention')
  })

  test('does not render a error UI, by default', () => {
    const wrapper = mount(<MessageRow {...defaultProps} />)
    const el = wrapper.find(`div.${MessageRow.className}`)
    const icon = wrapper.find('Icon').first()
    const text = wrapper.find('Text').first()

    expect(el.hasClass('is-error')).not.toBeTruthy()
    expect(text.prop('shade')).not.toBe('faint')
    expect(icon.prop('name')).not.toBe('alert')
  })

  test('renders a error title into Tooltip, if error', () => {
    const wrapper = mount(<MessageRow {...defaultProps} isValid={false} />)
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toContain('There was an error')
  })

  test('can customized Tooltip errorMessage', () => {
    const wrapper = mount(
      <MessageRow {...defaultProps} isPaused={true} pausedMessage="BAD!" />
    )
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toBe('BAD!')
  })

  test('should set hover to true', () => {
    const wrapper = mount(<MessageRow />)
    const el = wrapper.find(AccordionLink)
    el.simulate('mouseover')
    expect(wrapper.state('isHovering')).toEqual(true)
    el.simulate('mouseleave')
    expect(wrapper.state('isHovering')).toEqual(false)
  })

  test('should call event prevent default', () => {
    const wrapper = mount(<MessageRow />)
    const el = wrapper.find(AccordionLink)
    const eventPreventDefaultSpy = jest.fn()
    el.simulate('dragstart', { preventDefault: eventPreventDefaultSpy })
    expect(eventPreventDefaultSpy).toHaveBeenCalled()
  })
})
