import React from 'react'
import { mount, shallow } from 'enzyme'
import Item from '../Item'
import { Timestamp } from '../../..'
import { baseComponentTest } from '../../../tests/helpers/components'

const baseComponentOptions = {
  className: 'c-TimelineItem',
}
baseComponentTest(Item, baseComponentOptions)

test('Does not show Timestamp by default', () => {
  const wrapper = shallow(<Item />)
  const o = wrapper.find('.c-TimelineItem__timestamp')

  expect(o.length).not.toBeTruthy()
})

test('Renders timestamp wrapper if defined', () => {
  const wrapper = mount(<Item timestamp="9:41am" />)
  const o = wrapper.find('.c-TimelineItem__timestamp')

  expect(o.length).toBeTruthy()
})

test('Renders timestamp when hovered', () => {
  const wrapper = mount(<Item timestamp="9:41am" />)
  wrapper.simulate('mouseenter')
  const o = wrapper.find(Timestamp)

  expect(o.length).toBeTruthy()
})
