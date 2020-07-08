import React from 'react'
import { render, mount } from 'enzyme'
import { Alert, cx } from './Alert'
import { Badge, Button, CloseButton, Collapsible, Icon } from '../index'

jest.useFakeTimers()

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = render(<Alert />)

    expect(wrapper.hasClass(cx.main)).toBeTruthy()
  })

  test('Can accept custom className', () => {
    const wrapper = render(<Alert className="buddy" />)

    expect(wrapper.hasClass('buddy')).toBeTruthy()
  })
})

describe('Accessibility', () => {
  test('Has correct aria-role', () => {
    const wrapper = render(<Alert />)

    expect(wrapper.attr('role')).toBe('alert')
  })
})

describe('Dismissing', () => {
  test('Is not dismissed by default', () => {
    const wrapper = mount(<Alert />)

    expect(wrapper.state().dismissed).toBe(false)
    expect(wrapper.html()).toBeTruthy()
  })

  test('Renders close button if dismissible', () => {
    const wrapper = mount(<Alert dismissible />)
    const d = wrapper.find(`.${cx.closeButton}`)
    const o = wrapper.find(CloseButton)

    expect(d.length).toBeTruthy()
    expect(o.length).toBeTruthy()
  })

  test('Dismisses alert if CloseButton is clicked', () => {
    const wrapper = mount(<Alert dismissible />)
    const o = wrapper.find(CloseButton)

    o.simulate('click')

    expect(wrapper.state().dismissed).toBe(true)
  })

  test('onDismiss callback can be fired on CloseButton click', () => {
    const spy = jest.fn()
    const wrapper = mount(<Alert dismissible onDismiss={spy} />)
    const o = wrapper.find(CloseButton)

    o.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('Does not contain Collasible by default', () => {
    const wrapper = mount(<Alert />)
    const o = wrapper.find(Collapsible)

    expect(o.length).not.toBeTruthy()
  })

  test('Renders Collapsible by default', () => {
    const wrapper = mount(<Alert dismissible />)
    const c = wrapper.find(Collapsible)
    const o = c.find('div.c-Alert')

    expect(c.length).toBeTruthy()
    expect(o.length).toBeTruthy()
  })

  test('Collapses alert on CloseButton click', () => {
    const wrapper = mount(<Alert dismissible />)
    const b = wrapper.find(CloseButton)

    b.simulate('click')

    jest.runAllTimers()

    const o = wrapper.find(Collapsible)

    expect(o.props().isOpen).toBe(false)
  })
})

describe('Action right', () => {
  test('Does not render a right action by default', () => {
    const wrapper = mount(<Alert />)
    const d = wrapper.find(`.${cx.actionRight}`)

    expect(d.length).not.toBeTruthy()
  })

  test('Renders a right action if specified', () => {
    const wrapper = mount(<Alert actionRight={<Button />} />)
    const d = wrapper.find(`.${cx.actionRight}`).first()
    const o = d.find(Button)

    expect(d.length).toBeTruthy()
    expect(o.length).toBeTruthy()
    expect(
      wrapper.getDOMNode().classList.contains('has-actionRight')
    ).toBeTruthy()
  })

  test('onClick from actionRight Button can still fire', () => {
    const spy = jest.fn()
    const wrapper = mount(<Alert actionRight={<Button onClick={spy} />} />)
    const o = wrapper.find(Button)

    o.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Content', () => {
  test('Can render child content', () => {
    const wrapper = mount(
      <Alert>
        <div className="buddy">Buddy</div>
      </Alert>
    )
    const d = wrapper.find('div.buddy')

    expect(d.length).toBeTruthy()
    expect(d.text()).toContain('Buddy')
  })
})

describe('Badge', () => {
  test('Does not render an Badge by default', () => {
    const wrapper = mount(<Alert />)
    const o = wrapper.find(Badge)

    expect(o.length).not.toBeTruthy()
  })

  test('Renders an alert Badge, if specified', () => {
    const wrapper = mount(<Alert badge="Badge" />)
    const d = wrapper.find(`.${cx.badge}`)
    const o = wrapper.find(Badge)

    expect(d.length).toBeTruthy()
    expect(o.length).toBeTruthy()
    expect(o.text()).toContain('Badge')
    expect(wrapper.getDOMNode().classList.contains('has-badge')).toBeTruthy()
  })
})

describe('Icon', () => {
  test('Does not render an Icon by default', () => {
    const wrapper = mount(<Alert />)
    const o = wrapper.find(Icon)

    expect(o.length).not.toBeTruthy()
  })

  test('Renders an alert icon, if specified', () => {
    const wrapper = mount(<Alert icon />)
    const d = wrapper.find(`.${cx.icon}`)
    const o = wrapper.find(Icon)

    expect(d.length).toBeTruthy()
    expect(o.length).toBeTruthy()
    expect(o.props().name).toBe('alert-small')
    expect(wrapper.getDOMNode().classList.contains('has-icon')).toBeTruthy()
  })
})

describe('Status', () => {
  const status = ['error', 'info', 'success', 'warning']

  status.forEach(status => {
    test(`Renders ${status} styles`, () => {
      const wrapper = render(<Alert status={status} />)

      expect(wrapper.hasClass(`is-${status}`)).toBeTruthy()
    })
  })
})

describe('Styles', () => {
  test('Applies "noMargin" styles, if specified', () => {
    const wrapper = render(<Alert noMargin />)

    expect(wrapper.hasClass('is-noMargin')).toBeTruthy()
  })
})
