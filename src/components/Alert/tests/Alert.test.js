import React from 'react'
import { shallow } from 'enzyme'
import { default as Alert, cx } from '..'
import { Button, CloseButton, Icon } from '../../'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<Alert />)

    expect(wrapper.hasClass(cx.main)).toBeTruthy()
  })

  test('Can accept custom className', () => {
    const wrapper = shallow(<Alert className='buddy' />)

    expect(wrapper.hasClass('buddy')).toBeTruthy()
  })
})

describe('Accessibility', () => {
  test('Has correct aria-role', () => {
    const wrapper = shallow(<Alert />)

    expect(wrapper.props().role).toBe('alert')
  })
})

describe('Dismissing', () => {
  test('Is not dismissed by default', () => {
    const wrapper = shallow(<Alert />)

    expect(wrapper.state().dismissed).toBe(false)
    expect(wrapper.html()).toBeTruthy()
  })

  test('Renders close button if dismissible', () => {
    const wrapper = shallow(<Alert dismissible />)
    const d = wrapper.find(`.${cx.closeButton}`)
    const o = wrapper.find(CloseButton)

    expect(d.length).toBeTruthy()
    expect(o.length).toBeTruthy()
  })

  test('Dismisses alert if CloseButton is clicked', () => {
    const wrapper = shallow(<Alert dismissible />)
    const o = wrapper.find(CloseButton)

    o.simulate('click')

    expect(wrapper.state().dismissed).toBe(true)
    expect(wrapper.html()).toBeFalsy()
  })

  test('onDismiss callback can be fired on CloseButton click', () => {
    const spy = jest.fn()
    const wrapper = shallow(<Alert dismissible onDismiss={spy} />)
    const o = wrapper.find(CloseButton)

    o.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Action right', () => {
  test('Does not render a right action by default', () => {
    const wrapper = shallow(<Alert />)
    const d = wrapper.find(`.${cx.actionRight}`)

    expect(d.length).not.toBeTruthy()
  })

  test('Renders a right action if specified', () => {
    const wrapper = shallow(<Alert actionRight={<Button />} />)
    const d = wrapper.find(`.${cx.actionRight}`)
    const o = d.find(Button)

    expect(d.length).toBeTruthy()
    expect(o.length).toBeTruthy()
    expect(wrapper.hasClass('has-actionRight')).toBeTruthy()
  })
})

describe('Content', () => {
  test('Can render child content', () => {
    const wrapper = shallow(<Alert><div className='buddy'>Buddy</div></Alert>)
    const o = wrapper.find(`.${cx.block}`)
    const d = o.find('.buddy')

    expect(o.length).toBeTruthy()
    expect(d.length).toBeTruthy()
    expect(d.node.props.children).toBe('Buddy')
  })
})

describe('Icon', () => {
  test('Does not render an Icon by default', () => {
    const wrapper = shallow(<Alert />)
    const o = wrapper.find(Icon)

    expect(o.length).not.toBeTruthy()
  })

  test('Renders an alert icon, if specified', () => {
    const wrapper = shallow(<Alert icon />)
    const d = wrapper.find(`.${cx.icon}`)
    const o = wrapper.find(Icon)

    expect(d.length).toBeTruthy()
    expect(o.length).toBeTruthy()
    expect(o.node.props.name).toBe('alert')
    expect(wrapper.hasClass('has-icon')).toBeTruthy()
  })
})

describe('Status', () => {
  const status = ['error', 'info', 'success', 'warning']

  status.forEach(status => {
    test(`Renders ${status} styles`, () => {
      const wrapper = shallow(<Alert status={status} />)

      expect(wrapper.hasClass(`is-${status}`)).toBeTruthy()
    })
  })
})

describe('Styles', () => {
  test('Applies "noMargin" styles, if specified', () => {
    const wrapper = shallow(<Alert noMargin />)

    expect(wrapper.hasClass('is-noMargin')).toBeTruthy()
  })
})
