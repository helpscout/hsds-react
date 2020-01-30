import * as React from 'react'
import { mount } from 'enzyme'
import mockItems from './MessageList.mockItems'
import MessageList from './MessageList'
import MessageRow from './MessageRow'
import { AccordionUI } from './MessageList.css'
import AccordionLink from '../Accordion/Accordion.Link'

const messageListDefaultProps = {
  items: mockItems,
  onSortEnd: jest.fn(() => {}),
  onSortStart: jest.fn(() => {}),
}

describe('message list', () => {
  test('should render 8 mock items', () => {
    const wrapper = mount(<MessageList {...messageListDefaultProps} />)
    const rows = wrapper.find(MessageRow)
    const container = wrapper.find(AccordionUI)
    expect(rows.length).toEqual(8)
    expect(container.length).toEqual(1)
  })
  test('should render children correctly', () => {
    const wrapper = mount(<MessageList {...messageListDefaultProps} />)
    const rows = wrapper.find(MessageRow)
    rows.forEach(row => {
      const {
        index,
        id,
        isDragging,
        isPaused,
        isNotStarted,
        isValid,
        message,
        name,
        status,
        subtitle,
        title,
        to,
      } = row.props()
      const expectedItem = mockItems[index]
      expect(id).toEqual(expectedItem.id)
      expect(isDragging).toEqual(false)
      expect(isPaused).toEqual(!!expectedItem.isPaused)
      expect(isNotStarted).toEqual(!!expectedItem.isNotStarted)
      expect(isValid).toEqual(!!expectedItem.isValid)
      expect(name).toEqual(expectedItem.name)
      expect(title).toEqual(expectedItem.title)
      expect(to).toEqual(expectedItem.to)
      expect(subtitle).toEqual(expectedItem.subtitle)
      expect(message).toEqual(expectedItem.message)
      expect(status).toEqual(expectedItem.status)
    })
  })
  test('if not items, should return null', () => {
    const wrapper = mount(
      <MessageList {...{ ...messageListDefaultProps, items: [] }} />
    )
    const rows = wrapper.find(MessageRow)
    expect(rows.length).toEqual(0)
  })
  test('should render AccordionUI', () => {
    const wrapper = mount(<MessageList {...messageListDefaultProps} />)
    const element = wrapper.find(AccordionUI)
    expect(element.length).toEqual(1)
  })
})

describe('message list sorting', () => {
  test('should set state and call back onSortStart', () => {
    const wrapper = mount(<MessageList {...messageListDefaultProps} />)
    wrapper.instance().onSortStart({
      node: {},
      isKeySorting: false,
      collection: {},
      index: 1,
    })
    wrapper.update()
    wrapper.find(MessageRow).forEach(node => {
      const { index, isDragging } = node.props()
      expect(isDragging).toEqual(index === 1)
    })
    expect(wrapper.state().isDragging).toEqual(true)
    expect(wrapper.state().indexOfDraggedItem).toEqual(1)
    expect(messageListDefaultProps.onSortStart).toHaveBeenCalledTimes(1)
    expect(messageListDefaultProps.onSortStart).toHaveBeenCalledWith({
      collection: {},
      index: 1,
      node: {},
      isDragging: true,
      isKeySorting: false,
    })
  })
  test('should set state and call back onSortEnd', () => {
    const wrapper = mount(<MessageList {...messageListDefaultProps} />)
    wrapper.instance().onSortEnd({
      collection: {},
      isKeySorting: false,
      oldIndex: 1,
      newIndex: 3,
    })
    wrapper.update()
    wrapper.find(MessageRow).forEach(node => {
      const { isDragging } = node.props()
      expect(isDragging).toEqual(false)
    })
    expect(wrapper.state().isDragging).toEqual(false)
    expect(wrapper.state().indexOfDraggedItem).toEqual(-1)
    expect(messageListDefaultProps.onSortEnd).toHaveBeenCalledTimes(1)
    expect(messageListDefaultProps.onSortEnd).toHaveBeenCalledWith({
      collection: {},
      isDragging: false,
      isKeySorting: false,
      oldIndex: 1,
      newIndex: 3,
    })
  })
})

const messageRowDefaultProps = {
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

describe('message row paused', () => {
  test('renders a paused UI, if isPaused', () => {
    const wrapper = mount(
      <MessageRow {...messageRowDefaultProps} isPaused={true} />
    )
    const badge = wrapper.find('Badge').first()
    const text = wrapper.find('Text').first()

    expect(text.prop('shade')).toBe('faint')
    expect(badge.length).toBeTruthy()
    expect(badge.text()).toBe('Paused')
  })
  test('does not render a paused UI, by default', () => {
    const wrapper = mount(<MessageRow {...messageRowDefaultProps} />)
    const icon = wrapper.find('Icon').first()
    const text = wrapper.find('Text').first()

    expect(text.prop('shade')).not.toBe('faint')
    expect(icon.prop('name')).not.toBe('pause')
  })
  test('renders a paused title into Tooltip, if paused', () => {
    const wrapper = mount(
      <MessageRow {...messageRowDefaultProps} isPaused={true} />
    )
    const tooltip = wrapper.find('Tooltip').first()
    expect(tooltip.prop('title')).toBe('Paused')
  })
  test('can customized Tooltip pausedMessage', () => {
    const wrapper = mount(
      <MessageRow
        {...messageRowDefaultProps}
        isPaused={true}
        pausedMessage="NO GO"
      />
    )
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toBe('NO GO')
  })
})

describe('message row name', () => {
  test('renders a name, instead of children', () => {
    const wrapper = mount(
      <MessageRow {...messageRowDefaultProps} name="Mugatu">
        Derek
      </MessageRow>
    )
    const text = wrapper.find('Text').first()

    expect(text.text()).toBe('Mugatu')
  })
})

describe('message row error', () => {
  test('renders a error UI, if isError', () => {
    const wrapper = mount(
      <MessageRow {...messageRowDefaultProps} isValid={false} />
    )
    const badge = wrapper.find('Badge').first()
    const text = wrapper.find('Text').first()

    expect(badge.length).toBeTruthy()
    expect(badge.text()).toEqual('Needs Attention')
  })

  test('does not render a error UI, by default', () => {
    const wrapper = mount(<MessageRow {...messageRowDefaultProps} />)
    const el = wrapper.find(`div.${MessageRow.className}`)
    const icon = wrapper.find('Icon').first()
    const text = wrapper.find('Text').first()

    expect(el.hasClass('is-error')).not.toBeTruthy()
    expect(text.prop('shade')).not.toBe('faint')
    expect(icon.prop('name')).not.toBe('alert')
  })

  test('renders a error title into Tooltip, if error', () => {
    const wrapper = mount(
      <MessageRow {...messageRowDefaultProps} isValid={false} />
    )
    const tooltip = wrapper.find('Tooltip').first()

    expect(tooltip.prop('title')).toContain('There was an error')
  })

  test('can customized Tooltip errorMessage', () => {
    const wrapper = mount(
      <MessageRow
        {...messageRowDefaultProps}
        isPaused={true}
        pausedMessage="BAD!"
      />
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
