import React from 'react'
import { shallow } from 'enzyme'
import { Avatar } from '../../index'
import StatusAvatar from '..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = shallow(<StatusAvatar />)

    expect(wrapper.hasClass('c-StatusAvatar')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = shallow(<StatusAvatar className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Avatar', () => {
  test('Renders an Avatar', () => {
    const wrapper = shallow(<StatusAvatar />)
    const el = wrapper.find(Avatar)

    expect(el.length).toBe(1)
  })

  test('Passes props to Avatar', () => {
    const wrapper = shallow(<StatusAvatar image='hansel.jpg' name='Hansel' />)
    const el = wrapper.find(Avatar)

    expect(el.prop('name')).toBe('Hansel')
    expect(el.prop('image')).toBe('hansel.jpg')
  })

  test('Sets status props on Avatar', () => {
    const wrapper = shallow(<StatusAvatar />)
    const el = wrapper.find(Avatar)

    expect(el.prop('statusIcon')).toBeTruthy()
    expect(el.prop('status')).toBeTruthy()
  })
})

describe('Status', () => {
  test('Is online by default', () => {
    const wrapper = shallow(<StatusAvatar />)
    const el = wrapper.find(Avatar)

    expect(el.prop('status')).toBe('online')
  })

  test('Can be set to offline', () => {
    const wrapper = shallow(<StatusAvatar isOnline={false} />)
    const el = wrapper.find(Avatar)

    expect(el.prop('status')).toBe('offline')
  })

  test('Uses online icon, if online', () => {
    const wrapper = shallow(<StatusAvatar isOnline />)
    const el = wrapper.find(Avatar)

    expect(el.prop('statusIcon')).toContain('tick')
  })

  test('Uses offline icon, if offline', () => {
    const wrapper = shallow(<StatusAvatar isOnline={false} />)
    const el = wrapper.find(Avatar)

    expect(el.prop('statusIcon')).toContain('cross')
  })
})
