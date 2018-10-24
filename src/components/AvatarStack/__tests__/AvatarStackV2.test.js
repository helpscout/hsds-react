import React from 'react'
import { mount } from 'enzyme'
import AvatarStack from '../AvatarStack'
import AvatarStackEntry from '../index'
import Avatar from '../../Avatar'
import PropProvider from '../../PropProvider'

describe('AvatarStackV2', () => {
  test('Can render AvatarStack V2', () => {
    const wrapper = mount(<AvatarStackEntry version={2} />)
    const o = wrapper.find('div.c-AvatarStack')
    const comp = wrapper.find('AvatarStack').last()

    expect(o.length).toBe(1)
    expect(comp.prop('avatarVersion')).toBe(2)
  })

  test('Can render AvatarStack (V1)', () => {
    const wrapper = mount(<AvatarStackEntry version={1} />)
    const o = wrapper.find('div.c-AvatarStack')
    const comp = wrapper.find('AvatarStack').last()

    expect(o.length).toBe(1)
    expect(comp.prop('avatarVersion')).toBe(1)
  })

  test('Can render AvatarStackV2 via PropProvider', () => {
    const wrapper = mount(
      <PropProvider value={{ AvatarStack: { version: 2 } }}>
        <AvatarStackEntry />
      </PropProvider>
    )
    const comp = wrapper.find('AvatarStack').first()
    const el = wrapper.find('div.c-AvatarStack')

    expect(comp.prop('version')).toBe(2)
    expect(el.length).toBe(1)
  })

  test('Adds layer stack className', () => {
    const wrapper = mount(
      <PropProvider value={{ AvatarStack: { version: 2 } }}>
        <AvatarStackEntry />
      </PropProvider>
    )
    const el = wrapper.find('div.c-AvatarStack')

    expect(el.hasClass('is-withLayerStack')).toBe(true)
  })
})

describe('Avatar', () => {
  test('Adds layer stack className', () => {
    const wrapper = mount(
      <AvatarStack avatarVersion={2}>
        <Avatar />
      </AvatarStack>
    )
    const el = wrapper.find('div.c-AvatarStack__item')

    expect(el.hasClass('is-withLayerStack')).toBe(true)
  })

  test('Single avatars render xl sizes', () => {
    const wrapper = mount(
      <AvatarStack avatarVersion={2}>
        <Avatar />
      </AvatarStack>
    )
    const comp = wrapper.find('Avatar').last()

    expect(comp.prop('size')).toBe('xl')
  })

  test('2 avatars render lg sizes', () => {
    const wrapper = mount(
      <AvatarStack avatarVersion={2}>
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const comp = wrapper.find('Avatar').last()

    expect(comp.prop('size')).toBe('lg')
  })

  test('3 avatars render md sizes', () => {
    const wrapper = mount(
      <AvatarStack avatarVersion={2}>
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const comp = wrapper.find('Avatar').last()

    expect(comp.prop('size')).toBe('md')
  })

  test('3+ avatars render md sizes', () => {
    const wrapper = mount(
      <AvatarStack avatarVersion={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const comp = wrapper.find('Avatar').last()

    expect(comp.prop('size')).toBe('md')
  })

  test('Adjusts z-index with layering for odd avatar counts', () => {
    const wrapper = mount(
      <AvatarStack avatarVersion={2}>
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const els = wrapper.find('div.c-AvatarStack__item')
    const one = els.at(0)
    const two = els.at(1)
    const three = els.at(2)

    expect(two.prop('style').zIndex).toBeGreaterThan(one.prop('style').zIndex)
    expect(two.prop('style').zIndex).toBeGreaterThan(three.prop('style').zIndex)
    expect(one.prop('style').zIndex).toBeGreaterThan(three.prop('style').zIndex)
  })

  test('Adjusts z-index linearly for even avatar counts', () => {
    const wrapper = mount(
      <AvatarStack avatarVersion={2}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </AvatarStack>
    )
    const els = wrapper.find('div.c-AvatarStack__item')
    const one = els.at(0)
    const two = els.at(1)
    const three = els.at(2)
    const four = els.at(3)

    expect(three.prop('style').zIndex).toBeGreaterThan(
      four.prop('style').zIndex
    )
    expect(two.prop('style').zIndex).toBeGreaterThan(three.prop('style').zIndex)
    expect(one.prop('style').zIndex).toBeGreaterThan(two.prop('style').zIndex)
  })
})
