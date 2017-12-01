import React from 'react'
import { shallow } from 'enzyme'
import StatusDot from '..'
import { Icon } from '../../index'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<StatusDot />)

    expect(wrapper.hasClass('c-StatusDot')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<StatusDot className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('BorderColor', () => {
  test('Does not have custom borderColor by default', () => {
    const wrapper = shallow(<StatusDot />)

    expect(wrapper.instance().props.borderColor).toBeFalsy()
    expect(wrapper.props().style.borderColor).toBeFalsy()
  })

  test('Can customize borderColor style', () => {
    const wrapper = shallow(<StatusDot borderColor='red' />)

    expect(wrapper.instance().props.borderColor).toBe('red')
    expect(wrapper.props().style.borderColor).toBe('red')
  })

  test('Can customize borderColor style + add custom style', () => {
    const wrapper = shallow(<StatusDot borderColor='red' style={{ margin: 10 }} />)

    expect(wrapper.instance().props.borderColor).toBe('red')
    expect(wrapper.props().style.borderColor).toBe('red')
    expect(wrapper.props().style.margin).toBe(10)
  })
})

describe('Icon', () => {
  test('Does not render an icon by default', () => {
    const wrapper = shallow(<StatusDot />)
    const o = wrapper.find(Icon)

    expect(wrapper.hasClass('is-icon')).not.toBe(true)
    expect(o.length).toBe(0)
  })

  test('Can render icon, if defined', () => {
    const wrapper = shallow(<StatusDot icon='tick' />)
    const o = wrapper.find(Icon)

    expect(wrapper.hasClass('is-icon')).toBeTruthy()
    expect(o.length).toBe(1)
    expect(o.props().name).toBe('tick')
  })
})

describe('Inline', () => {
  test('Is not inline by default', () => {
    const wrapper = shallow(<StatusDot />)

    expect(wrapper.hasClass('is-inline')).not.toBe(true)
  })

  test('Can render inline styles, if defined', () => {
    const wrapper = shallow(<StatusDot inline />)

    expect(wrapper.hasClass('is-inline')).toBeTruthy()
  })
})

describe('OuterBorderColor', () => {
  test('Does not have custom outerBorderColor by default', () => {
    const wrapper = shallow(<StatusDot />)

    expect(wrapper.instance().props.outerBorderColor).toBeFalsy()
    expect(wrapper.props().style.boxShadow).toBeFalsy()
  })

  test('Can customize outerBorderColor style', () => {
    const wrapper = shallow(<StatusDot outerBorderColor='red' />)

    expect(wrapper.instance().props.outerBorderColor).toBe('red')
    expect(wrapper.props().style.boxShadow).toContain('red')
  })

  test('Can customize outerBorderColor style + add custom style', () => {
    const wrapper = shallow(<StatusDot outerBorderColor='red' style={{ margin: 10 }} />)

    expect(wrapper.instance().props.outerBorderColor).toBe('red')
    expect(wrapper.props().style.boxShadow).toContain('red')
    expect(wrapper.props().style.margin).toBe(10)
  })
})

describe('Size', () => {
  test('Has a default size', () => {
    const wrapper = shallow(<StatusDot />)

    expect(wrapper.hasClass('is-sm')).toBe(true)
  })

  test('Can render size styles, if defined', () => {
    const wrapper = shallow(<StatusDot size='md' />)

    expect(wrapper.hasClass('is-md')).toBeTruthy()
    expect(wrapper.hasClass('is-sm')).not.toBeTruthy()
  })
})

describe('Status', () => {
  test('Has an online status by default', () => {
    const wrapper = shallow(<StatusDot />)

    expect(wrapper.hasClass('is-online')).toBe(true)
  })

  test('Can render status styles, if defined', () => {
    const wrapper = shallow(<StatusDot status='offline' />)

    expect(wrapper.hasClass('is-offline')).toBeTruthy()
    expect(wrapper.hasClass('is-online')).not.toBeTruthy()
  })
})

describe('Unread', () => {
  test('Is not unread by default', () => {
    const wrapper = shallow(<StatusDot />)

    expect(wrapper.instance().props.isUnread).toBe(false)
    expect(wrapper.hasClass('is-unread')).toBe(false)
  })

  test('Can add unread styles, if defined', () => {
    const wrapper = shallow(<StatusDot isUnread />)

    expect(wrapper.instance().props.isUnread).toBe(true)
    expect(wrapper.hasClass('is-unread')).toBe(true)
  })
})

describe('Title', () => {
  test('Provides a tooltip title by default', () => {
    const wrapper = shallow(<StatusDot status='online' />)

    expect(wrapper.props().title).toBe('Is online')
  })

  test('Title can be customized', () => {
    const wrapper = shallow(<StatusDot status='online' title='OMG! ONLINE' />)

    expect(wrapper.props().title).toBe('OMG! ONLINE')
  })
})

describe('Children', () => {
  test('Does not renders child content', () => {
    const wrapper = shallow(<StatusDot><div className='child'>Hello</div></StatusDot>)
    const el = wrapper.find('div.child')

    expect(el.length).toBe(0)
  })
})
