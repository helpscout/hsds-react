import React from 'react'
import { mount, shallow } from 'enzyme'
import { default as Menu, MenuComponent } from '../Menu'
import Item from '../Item'

describe('Items', () => {
  test('Can render a single item', () => {
    const wrapper = shallow(<Menu><Item /></Menu>)
    const o = wrapper.find(Item)

    expect(o.length).toBe(1)
  })

  test('Can render a multiple items', () => {
    const wrapper = shallow(
      <Menu>
        <Item />
        <Item />
        <Item />
        <Item />
      </Menu>
    )
    const o = wrapper.find(Item)

    expect(o.length).toBe(4)
  })

  test('Can render a multiple items from array', () => {
    const items = []
    for (let i = 0, len = 4; i < len; i++) {
      items.push(<Item key={i} />)
    }
    const wrapper = shallow(
      <Menu>
        {items}
      </Menu>
    )
    const o = wrapper.find(Item)

    expect(o.length).toBe(4)
  })

  test('Can render item with children', () => {
    const wrapper = shallow(
      <Menu>
        <Item>
          <div className='brick'>
            Hello
          </div>
        </Item>
      </Menu>
    )
    const o = wrapper.find(Item)

    expect(o.html()).toContain('Hello')
    expect(o.find('.brick').length).toBe(1)
  })

  test('Remaps only items to Menu.items for reference', () => {
    const items = []
    for (let i = 0, len = 4; i < len; i++) {
      items.push(<Item key={i} />)
    }
    const wrapper = mount(
      <MenuComponent>
        {items}
        <div className='brick'>Brick</div>
      </MenuComponent>
    )
    const n = wrapper.node
    const o = wrapper.find('.brick')

    expect(n.items.length).toBe(4)
    expect(o.length).toBe(1)
  })
})
