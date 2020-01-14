import React from 'react'
import { mount } from 'enzyme'
import { NotificationStack } from '../NotificationStack'
import Notification from '../../Notification'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<NotificationStack />)

    expect(
      wrapper.getDOMNode().classList.contains('c-NotificationStack')
    ).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<NotificationStack className={customClass} />)

    expect(wrapper.getDOMNode().classList.contains(customClass)).toBeTruthy()
  })

  test('Applies theme-based className', () => {
    const wrapper = mount(<NotificationStack theme="chat" />)

    expect(
      wrapper.getDOMNode().classList.contains('is-theme-chat')
    ).toBeTruthy()
  })
})

describe('Notification', () => {
  test('Sets Notification isActive based on limit, in first->last order', () => {
    const wrapper = mount(
      <NotificationStack limit={2}>
        <Notification />
        <Notification />
        <Notification />
      </NotificationStack>
    )

    let n = wrapper.find(Notification)

    expect(n.first().prop('isActive')).toBe(false)
    expect(n.last().prop('isActive')).toBe(true)

    wrapper.setProps({ limit: 10 })

    n = wrapper.find(Notification)

    expect(n.first().prop('isActive')).toBe(true)
    expect(n.last().prop('isActive')).toBe(true)
  })

  test('Passes Notification click event props to onClick callback', () => {
    const mockEvent = {}
    const mockExtraProps = {}

    const spy = jest.fn()

    const wrapper = mount(
      <NotificationStack onClick={spy}>
        <Notification />
      </NotificationStack>
    )

    const el = wrapper.find('Notification').first()
    el.props().onClick(mockEvent, mockExtraProps)

    expect(spy).toHaveBeenCalledWith(mockEvent, mockExtraProps)
  })
})

describe('Dismissable', () => {
  test('Is initially set by props', () => {
    const wrapper = mount(<NotificationStack autoDismiss />)

    expect(wrapper.state('isDismissable')).toBe(true)
  })

  test('Pauses dismissability on mouseenter/mouseleave', () => {
    const wrapper = mount(<NotificationStack autoDismiss />)
    wrapper.simulate('mouseenter')

    expect(wrapper.state('isDismissable')).toBe(false)

    wrapper.simulate('mouseleave')

    expect(wrapper.state('isDismissable')).toBe(true)

    wrapper.simulate('mouseenter')

    expect(wrapper.state('isDismissable')).toBe(false)
  })

  test('Does not change dismissability on mouse interactions, if not enabled', () => {
    const wrapper = mount(<NotificationStack autoDismiss={false} />)
    wrapper.simulate('mouseenter')

    expect(wrapper.state('isDismissable')).toBe(false)

    wrapper.simulate('mouseleave')

    expect(wrapper.state('isDismissable')).toBe(false)

    wrapper.simulate('mouseenter')

    expect(wrapper.state('isDismissable')).toBe(false)
  })
})

describe('Mouse events', () => {
  test('Mouseenter callback still works', () => {
    const spy = jest.fn()
    const wrapper = mount(<NotificationStack onMouseEnter={spy} />)

    wrapper.simulate('mouseenter')

    expect(spy).toHaveBeenCalled()
  })

  test('Mouseleave callback still works', () => {
    const spy = jest.fn()
    const wrapper = mount(<NotificationStack onMouseLeave={spy} />)

    wrapper.simulate('mouseleave')

    expect(spy).toHaveBeenCalled()
  })
})

describe('NotificationID', () => {
  test('Tracks first Notification ID', () => {
    const wrapper = mount(
      <NotificationStack limit={2}>
        <Notification id={23} />
        <Notification id={24} />
        <Notification id={25} />
      </NotificationStack>
    )

    expect(wrapper.instance().firstNotificationId).toBe(23)
  })

  test('Keeps Notification ID, even if children are removed', () => {
    const wrapper = mount(
      <NotificationStack limit={2}>
        <Notification id={23} />
        <Notification id={24} />
        <Notification id={25} />
      </NotificationStack>
    )

    wrapper.setProps({
      children: [<Notification id={41} />, <Notification id={42} />],
    })

    expect(wrapper.instance().firstNotificationId).toBe(23)
  })

  test('Clears Notification ID onNotificationClick', () => {
    const wrapper = mount(
      <NotificationStack limit={2}>
        <Notification id={23} />
        <Notification id={24} />
        <Notification id={25} />
      </NotificationStack>
    )

    const n = wrapper.find(Notification)
    n.last()
      .props()
      .onClick()

    expect(wrapper.instance().firstNotificationId).toBeFalsy()
  })
})

describe('From', () => {
  test('Only sets from prop on the first notification', () => {
    const wrapper = mount(
      <NotificationStack limit={2}>
        <Notification from="a" id={1} />
        <Notification from="b" id={2} />
        <Notification from="c" id={3} />
      </NotificationStack>
    )

    let n = wrapper.find(Notification)

    expect(n.first().prop('from')).toBe('a')
    expect(n.last().prop('from')).toBeFalsy()
  })
})
