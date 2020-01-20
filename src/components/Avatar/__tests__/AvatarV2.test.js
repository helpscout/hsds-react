import React from 'react'
import { mount } from 'enzyme'
import { Avatar } from '../Avatar'
import { AvatarContext } from '../../Avatar'
import AvatarEntry from '../index'

describe('AvatarV2', () => {
  test('Can render Avatar V2', () => {
    const wrapper = mount(<Avatar />)
    const o = wrapper.find('div.c-Avatar')

    expect(o.length).toBe(1)
  })

  test('Can render Avatar V2, via AvatarContext.Provider', () => {
    const wrapper = mount(
      <AvatarContext.Provider value={{ version: 2 }}>
        <AvatarEntry />
      </AvatarContext.Provider>
    )
    const el = wrapper.find('div.c-Avatar')
    const comp = wrapper.find('Avatar').first()

    expect(el.length).toBe(1)
    expect(comp.prop('version')).toBe(2)
  })

  test('Can renders Avatar (v1), with enhanced properties', () => {
    const wrapper = mount(
      <AvatarContext.Provider value={{ version: 2 }}>
        <AvatarEntry />
      </AvatarContext.Provider>
    )
    const comp = wrapper.find('Avatar').last()

    expect(comp.prop('borderColor')).toBe('white')
    expect(comp.prop('withShadow')).toBe(true)
    expect(comp.prop('showStatusBorderColor')).toBe(true)
  })

  test('Can renders with adjusted properties', () => {
    const wrapper = mount(<AvatarEntry version={2} withBorder={false} />)
    const comp = wrapper.find('Avatar').last()

    expect(comp.prop('borderColor')).toBeFalsy()
    expect(comp.prop('withShadow')).toBe(false)
  })
})
