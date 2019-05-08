import * as React from 'react'
import { mount } from 'enzyme'
import Timeline from '../Timeline'

describe('ClassName', () => {
  test('Has default className', () => {
    const wrapper = mount(<Timeline />)
    const el = wrapper.find('div.c-Timeline')

    expect(el.length).toBe(1)
  })

  test('Applies custom className if specified', () => {
    const customClass = 'piano-key-neck-tie'
    const wrapper = mount(<Timeline className={customClass} />)
    const el = wrapper.find('div.c-Timeline')

    expect(el.hasClass(customClass)).toBeTruthy()
  })
})

describe('Children', () => {
  test('Renders child content', () => {
    const wrapper = mount(
      <Timeline>
        <div className="child">Hello</div>
      </Timeline>
    )
    const el = wrapper.find('div.child')

    expect(el.text()).toContain('Hello')
  })
})
