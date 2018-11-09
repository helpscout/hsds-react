import React from 'react'
import { mount, shallow } from 'enzyme'
import Item from '../Item'
import { Timestamp } from '../../..'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Item />)
    const el = wrapper.find('div.c-TimelineItem')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Item className={customClass} />)
    const el = wrapper.find('div.c-TimelineItem')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Item>
        <div className="child">Hello</div>
      </Item>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})

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
