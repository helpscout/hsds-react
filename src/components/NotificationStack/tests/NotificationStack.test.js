import React from 'react'
import { mount, shallow } from 'enzyme'
import NotificationStack from '../index'
import Notification from '../../Notification'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<NotificationStack />)

    expect(wrapper.hasClass('c-NotificationStack')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<NotificationStack className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })

  test('Applies theme-based className', () => {
    const wrapper = shallow(<NotificationStack theme="chat" />)

    expect(wrapper.hasClass('is-theme-chat')).toBe(true)
  })
})

describe('Children', () => {
  test('Only renders Notification children components', () => {
    const wrapper = shallow(
      <NotificationStack>
        <Notification />
        <Notification />
        <Notification />
        <div className="other" />
      </NotificationStack>
    )
    const n = wrapper.find(Notification)
    const o = wrapper.find('.other')

    expect(n.length).toBe(3)
    expect(o.length).toBe(0)
  })
})

describe('Notification', () => {
  test('Sets Notification isActive based on limit, in first->last order', () => {
    const wrapper = shallow(
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
})

describe('Dismissable', () => {
  test('Is initially set by props', () => {
    const wrapper = shallow(<NotificationStack autoDismiss />)

    expect(wrapper.state('isDismissable')).toBe(true)
  })

  test('Pauses dismissability on mouseenter/mouseleave', () => {
    const wrapper = shallow(<NotificationStack autoDismiss />)
    wrapper.simulate('mouseenter')

    expect(wrapper.state('isDismissable')).toBe(false)

    wrapper.simulate('mouseleave')

    expect(wrapper.state('isDismissable')).toBe(true)

    wrapper.simulate('mouseenter')

    expect(wrapper.state('isDismissable')).toBe(false)
  })

  test('Does not change dismissability on mouse interactions, if not enabled', () => {
    const wrapper = shallow(<NotificationStack autoDismiss={false} />)
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
    const wrapper = shallow(<NotificationStack onMouseEnter={spy} />)

    wrapper.simulate('mouseenter')

    expect(spy).toHaveBeenCalled()
  })

  test('Mouseleave callback still works', () => {
    const spy = jest.fn()
    const wrapper = shallow(<NotificationStack onMouseLeave={spy} />)

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
    n
      .last()
      .props()
      .onBubbleClick()

    expect(wrapper.instance().firstNotificationId).toBeFalsy()
  })
})

describe('From', () => {
  test('Only sets from prop on the first notification', () => {
    const wrapper = shallow(
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
