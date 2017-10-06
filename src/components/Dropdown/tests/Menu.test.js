import React from 'react'
import { mount, shallow } from 'enzyme'
import { default as Menu, MenuComponent } from '../Menu'
import Item from '../Item'
import Keys from '../../../constants/Keys'

const simulateKeyPress = (keyCode, eventType = 'keyup') => {
  const event = new Event(eventType)
  event.keyCode = keyCode

  document.dispatchEvent(event)
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Nodes', () => {
  test('Has a reference to DOM nodes', () => {
    const wrapper = mount(<MenuComponent />)
    const o = wrapper.node

    expect(o.node).toBeTruthy()
    expect(o.wrapperNode).toBeTruthy()
    expect(o.contentNode).toBeTruthy()
    expect(o.listNode).toBeTruthy()
  })
})

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

describe('Selected', () => {
  test('Does not select an item by default', () => {
    const wrapper = shallow(
      <Menu>
        <Item />
        <Item />
        <Item />
        <Item />
      </Menu>
    )
    const o = wrapper.find(Item).first()

    expect(o.hasClass('is-focused')).toBeFalsy()
  })

  test('Select/focus an item if menu is opened', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={0}>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )
    const o = wrapper.find(Item).first()

    expect(wrapper.state().focusIndex).toBe(0)
    expect(o.hasClass('is-focused')).not.toBeTruthy()
  })

  test('Select/focus an item if specified', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )
    const o = wrapper.find(Item).first()

    expect(wrapper.state().focusIndex).toBe(0)
    expect(o.hasClass('is-focused')).toBeTruthy()
  })
})

describe('Arrow interactions', () => {
  test('Changes focusIndex on arrow down of a non-selected item', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )
    const o = wrapper.find(Item).first()
    const n = wrapper.find(Item).last()

    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')

    expect(wrapper.state().focusIndex).toBe(3)
    expect(o.hasClass('is-focused')).not.toBeTruthy()
    expect(n.hasClass('is-focused')).toBeTruthy()
  })

  test('Changes focusIndex on arrow up of a non-selected item', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={3} isOpen>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )
    const o = wrapper.find(Item).first()
    const n = wrapper.find(Item).last()

    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    simulateKeyPress(Keys.UP_ARROW, 'keydown')

    expect(wrapper.state().focusIndex).toBe(0)
    expect(o.hasClass('is-focused')).toBeTruthy()
    expect(n.hasClass('is-focused')).not.toBeTruthy()
  })

  test('Changes focusIndex on arrow up and down of a non-selected item', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={3} isOpen>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )
    const o = wrapper.find(Item).first()
    const n = wrapper.find(Item).last()

    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    simulateKeyPress(Keys.UP_ARROW, 'keydown')

    expect(wrapper.state().focusIndex).toBe(0)
    expect(o.hasClass('is-focused')).toBeTruthy()
    expect(n.hasClass('is-focused')).not.toBeTruthy()
  })
})

describe('Escape', () => {
  test('Pressing escape fires onClose callback', () => {
    const spy = jest.fn()
    mount(
      <MenuComponent selectedIndex={3} isOpen onClose={spy}>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )

    simulateKeyPress(Keys.ESCAPE)

    expect(spy).toHaveBeenCalled()
  })
})
