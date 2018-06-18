import React from 'react'
import { mount } from 'enzyme'
import Reference from '../Reference'
import Manager from '../Manager'
import PopperReference from '../../Popper/Reference'

describe('Props', () => {
  test('Can pass in props', () => {
    const wrapper = mount(<Reference className="ron" data-color="Burgundy" />)
    const el = wrapper.find('span')

    expect(el.hasClass('ron')).toBe(true)
    expect(el.prop('data-color')).toBe('Burgundy')
  })
})

describe('Children', () => {
  test('Can render children', () => {
    const wrapper = mount(
      <Reference className="ron" data-color="Burgundy">
        Milk was a bad choice!
      </Reference>
    )
    const el = wrapper.find('span')

    expect(el.html()).toContain('Milk was a bad choice!')
  })

  test('Can render Components as children', () => {
    const wrapper = mount(
      <Reference className="ron" data-color="Burgundy">
        <div>Milk was a bad choice!</div>
      </Reference>
    )

    const el = wrapper.find('div')

    expect(el.html()).toContain('Milk was a bad choice!')
  })
})

describe('Manager', () => {
  test('Passes node reference back to Manager', () => {
    const wrapper = mount(
      <Manager>
        <Reference className="ron" data-color="Burgundy">
          Milk was a bad choice!
        </Reference>
      </Manager>
    )
    const man = wrapper.find(Manager)
    const el = wrapper.find('span').getNode()

    expect(man.node.state.context.referenceNode).toBe(el)
  })
})
