import * as React from 'react'
import { mount } from 'enzyme'
import DetailList from '../DetailList'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<DetailList />)
    const el = wrapper.find('dl.c-DetailList')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<DetailList className={customClass} />)
    const el = wrapper.find('dl.c-DetailList')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child', () => {
    const wrapper = mount(
      <DetailList>
        <div className="child">Hello</div>
      </DetailList>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})
