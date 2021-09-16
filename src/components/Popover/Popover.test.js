import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import Popover from './Popover'
import { ArrowPopoverUI } from './Popover.css'

describe('className', () => {
  test('Can render custom className', () => {
    const wrapper = mount(
      <Popover className="derek">
        <div />
      </Popover>
    )

    expect(wrapper.hasClass('derek')).toBe(true)
  })
})

describe('Tooltip', () => {
  test('Renders an enhanced Tooltip', () => {
    const wrapper = mount(<Popover content="Hello" />)
    const el = wrapper.find('Tooltip')

    expect(el).toBeTruthy()
  })

  test('Renders arrow', () => {
    const wrapper = mount(<Popover content="Hello" />)

    expect(wrapper.find(ArrowPopoverUI).length).toBeTruthy()
  })

  test('Does not render arrow', () => {
    const wrapper = mount(<Popover content="Hello" withArrow={false} />)

    expect(wrapper.find(ArrowPopoverUI).length).toBeFalsy()
  })
})

describe('renderContent', () => {
  test('Can render content', () => {
    let wrapper = mount(<Popover content="Hello" />)

    expect(wrapper.find('PopoverContent').text()).toContain('Hello')
  })

  test('Can render header', () => {
    let wrapper = mount(<Popover header="Hello" />)

    expect(wrapper.find('PopoverHeader').text()).toContain('Hello')
  })

  test('Can render header and content (string)', () => {
    const wrapper = mount(<Popover header="Title" content="Content" />)

    expect(wrapper.find('PopoverContent').text()).toContain('Content')
    expect(wrapper.find('PopoverHeader').text()).toContain('Title')
  })

  test('Can render header and content (number)', () => {
    const wrapper = mount(<Popover header={123} content={456} />)

    expect(wrapper.find('PopoverContent').text()).toContain('456')
    expect(wrapper.find('PopoverHeader').text()).toContain('123')
  })

  test('Can render header and content (components)', () => {
    const wrapper = mount(
      <Popover header={<div>123</div>} content={<div>456</div>} />
    )

    expect(wrapper.text()).toContain('123')
    expect(wrapper.text()).toContain('456')
  })

  test('Renders renderHeader inside header', () => {
    const wrapper = mount(<Popover renderHeader={() => <div>Hai</div>} />)

    expect(wrapper.text()).not.toContain('Hello')
    expect(wrapper.text()).toContain('Hai')
  })

  test('Renders renderContent over content', () => {
    const wrapper = mount(
      <Popover renderContent={() => <div>Hai</div>} content="Hello" />
    )

    expect(wrapper.text()).not.toContain('Hello')
    expect(wrapper.text()).toContain('Hai')
  })
})
