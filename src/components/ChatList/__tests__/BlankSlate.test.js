import React from 'react'
import { mount } from 'enzyme'
import { default as BlankSlate } from '../BlankSlate'
import { baseComponentTest } from '../../../tests/helpers/components'
import { Illo, Text } from '../../index'

const baseComponentOptions = {
  className: 'c-ChatListBlankSlate',
}

baseComponentTest(BlankSlate, baseComponentOptions)

describe('Illo', () => {
  test('Renders an Illo by default', () => {
    const wrapper = mount(<BlankSlate />)
    const o = wrapper.find(Illo)

    expect(o.length).toBeTruthy()
  })

  test('Does not render an Illo if illoName prop is blank', () => {
    const wrapper = mount(<BlankSlate illoName="" />)
    const o = wrapper.find(Illo)

    expect(o.length).not.toBeTruthy()
  })
})

describe('Message', () => {
  test('Render child message into a <Text>', () => {
    const wrapper = mount(<BlankSlate>Mugatu</BlankSlate>)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('Mugatu')
  })

  test('Renders a default message, if childless', () => {
    const wrapper = mount(<BlankSlate />)
    const o = wrapper.find(Text)

    expect(o.html()).toContain('all caught-up')
  })
})
