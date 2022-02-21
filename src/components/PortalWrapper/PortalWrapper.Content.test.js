import React from 'react'
import { mount } from 'enzyme'
import { setupManager } from './PortalWrapper.utils'
import Content from './PortalWrapper.Content'

afterEach(() => {
  window.MrManager = undefined
})

describe('Children', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Content>
        <div className="ron" />
      </Content>
    )
    const o = wrapper.find('div.ron')

    expect(o.length).toBe(1)
  })
})

describe('Manager', () => {
  test('Creates a manager by default', () => {
    const wrapper = mount(<Content />)
    const props = wrapper.props()

    expect(props.manager).toBeTruthy()
    expect(typeof props.manager.add).toBe('function')
    expect(typeof props.manager.remove).toBe('function')
  })

  test('Accepts a manager', () => {
    const manager = setupManager('MrManager')
    const wrapper = mount(<Content manager={manager} />)

    expect(wrapper.props().manager).toBe(manager)
  })

  test('Adds ID to manager on mount', () => {
    const manager = setupManager('MrManager')
    expect(manager.data.length).toBe(0)

    mount(<Content manager={manager} id={1} />)

    expect(manager.data.length).toBe(1)
  })

  test('Removes from manager on unmount', () => {
    const manager = setupManager('MrManager')
    const wrapper = mount(<Content manager={manager} id={1} />)

    expect(manager.data.length).toBe(1)

    wrapper.unmount()

    expect(manager.data.length).toBe(0)
  })
})
