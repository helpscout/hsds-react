import React from 'react'
import { mount } from 'enzyme'
import { Avatar } from '../../index'
import StatusAvatar from '../StatusAvatar'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<StatusAvatar />)

    expect(wrapper.hasClass('c-StatusAvatar')).toBeTruthy()
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<StatusAvatar className={customClass} />)

    expect(wrapper.prop('className')).toContain(customClass)
  })
})

describe('Avatar', () => {
  test('Renders an Avatar', () => {
    const wrapper = mount(<StatusAvatar />)
    const el = wrapper.find(Avatar)

    expect(el.length).toBe(1)
  })

  test('Passes props to Avatar', () => {
    const wrapper = mount(<StatusAvatar image="hansel.jpg" name="Hansel" />)
    const el = wrapper.find(Avatar)

    expect(el.prop('name')).toBe('Hansel')
    expect(el.prop('image')).toBe('hansel.jpg')
  })

  test('Sets status props on Avatar', () => {
    const wrapper = mount(<StatusAvatar />)
    const el = wrapper.find(Avatar)

    expect(el.prop('statusIcon')).toBeTruthy()
    expect(el.prop('status')).toBeTruthy()
  })
})

describe('Status', () => {
  test('Is online by default', () => {
    const wrapper = mount(<StatusAvatar />)
    const el = wrapper.find(Avatar)

    expect(el.prop('status')).toBe('online')
  })

  test('Can be set to offline', () => {
    const wrapper = mount(<StatusAvatar isOnline={false} />)
    const el = wrapper.find(Avatar)

    expect(el.prop('status')).toBe('offline')
  })

  test('Uses online icon, if online', () => {
    const wrapper = mount(<StatusAvatar isOnline />)
    const el = wrapper.find(Avatar)

    expect(el.prop('statusIcon')).toContain('tick')
  })

  test('Uses offline icon, if offline', () => {
    const wrapper = mount(<StatusAvatar isOnline={false} />)
    const el = wrapper.find(Avatar)

    expect(el.prop('statusIcon')).toContain('cross')
  })
})
