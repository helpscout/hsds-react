import React from 'react'
import { mount, shallow } from 'enzyme'
import { default as Menu, MenuComponent } from '../Dropdown.Menu'
import Divider from '../Dropdown.Divider'
import Item from '../Dropdown.Item'
import Keys from '../../../constants/Keys'

jest.useFakeTimers()

const simulateKeyPress = (keyCode, eventType = 'keyup') => {
  const event = new Event(eventType)
  event.keyCode = keyCode

  document.dispatchEvent(event)
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Classname', () => {
  test('Has default className', () => {
    const wrapper = shallow(<MenuComponent />)
    const o = wrapper.find('.c-DropdownMenu')

    expect(o.length).toBeTruthy()
  })

  test('Can accept custom classNames', () => {
    const wrapper = shallow(<MenuComponent className="ron" />)
    const o = wrapper.find('.c-DropdownMenu')

    expect(o.hasClass('ron')).toBeTruthy()
  })
})

describe('Nodes', () => {
  test('Has a reference to DOM nodes', () => {
    const wrapper = mount(<MenuComponent isOpen />)
    const o = wrapper.instance()

    expect(o.node).toBeTruthy()
    expect(o.wrapperNode).toBeTruthy()
    expect(o.contentNode).toBeTruthy()
    expect(o.listNode).toBeTruthy()
  })
})

describe('Items', () => {
  test('Can render a single item', () => {
    const wrapper = shallow(
      <Menu>
        <Item />
      </Menu>
    )
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
    const wrapper = shallow(<Menu>{items}</Menu>)
    const o = wrapper.find(Item)

    expect(o.length).toBe(4)
  })

  test('Can render item with children', () => {
    const wrapper = shallow(
      <Menu>
        <Item>
          <div className="brick">Hello</div>
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
      <MenuComponent isOpen>
        {items}
        <div className="brick">Brick</div>
      </MenuComponent>
    )
    const n = wrapper.instance()
    const o = wrapper.find('.brick')

    expect(n.items.length).toBe(4)
    expect(o.length).toBe(1)
  })

  test('Sets focusIndex when item is focused', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )

    expect(wrapper.state().focusIndex).not.toBe(3)

    const o = wrapper
      .find(Item)
      .last()
      .find('.c-DropdownItem__link')
    o.simulate('focus')

    expect(wrapper.state().focusIndex).toBe(3)
  })

  test('Sets focusIndex/hoverIndex when item is mouseenter', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )

    expect(wrapper.state().focusIndex).not.toBe(3)
    expect(wrapper.state().hoverIndex).not.toBe(3)

    const o = wrapper
      .find(Item)
      .last()
      .find('.c-DropdownItem__link')
    o.simulate('mouseenter')

    expect(wrapper.state().focusIndex).toBe(3)
    expect(wrapper.state().hoverIndex).toBe(3)
  })

  test('Fires onSelect callback when Item is clicked', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen onSelect={spy}>
        <Item />
        <Item />
        <Item />
        <Item value="Brick" />
      </MenuComponent>
    )

    const o = wrapper
      .find(Item)
      .last()
      .find('.c-DropdownItem__link')
    o.simulate('click')

    expect(spy).toHaveBeenCalledWith('Brick')
  })

  test('Closes menu on click, by default', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen onClose={spy}>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )

    const o = wrapper
      .find(Item)
      .first()
      .find('.c-DropdownItem__link')
    o.simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  test('Closes menu on click AND fires item onClick callback', () => {
    const spy = jest.fn()
    const itemSpy = jest.fn()
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen onClose={spy}>
        <Item onClick={itemSpy} />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )

    const o = wrapper
      .find(Item)
      .first()
      .find('.c-DropdownItem__link')
    o.simulate('click')

    expect(spy).toHaveBeenCalled()
    expect(itemSpy).toHaveBeenCalled()
  })

  test('Does not close menu on click, if specified', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MenuComponent
        selectedIndex={0}
        isOpen
        onClose={spy}
        closeMenuOnClick={false}
      >
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )

    const o = wrapper
      .find(Item)
      .first()
      .find('.c-DropdownItem__link')
    o.simulate('click')

    expect(spy).not.toHaveBeenCalled()
  })

  test('Can trigger onBeforeClose callback', () => {
    const spy = jest.fn()
    const wrapper = mount(<Menu selectedIndex={0} isOpen onBeforeClose={spy} />)

    wrapper.unmount()

    jest.runAllTimers()

    expect(spy).toHaveBeenCalled()
  })

  test('Closes ALL menus when a sub-menu item is clicked', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen onClose={spy}>
        <Item>
          <MenuComponent isOpen>
            <Item>
              <MenuComponent isOpen>
                <Item />
              </MenuComponent>
            </Item>
            <Item />
            <Item />
            <Item />
            <Item />
          </MenuComponent>
        </Item>
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )

    const o = wrapper
      .find(Item)
      .first()
      .find(MenuComponent)
      .find(Item)
      .first()
      .find(MenuComponent)
      .find(Item)
      .first()
      .find('.c-DropdownItem__link')

    o.simulate('click')

    expect(spy).toHaveBeenCalled()
  })
})

describe('Selected', () => {
  test('Does not select an item by default', () => {
    const wrapper = mount(
      <MenuComponent isOpen>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )

    jest.runOnlyPendingTimers()

    const o = wrapper.find('div.c-DropdownItem').first()

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
    const o = wrapper.find('div.c-DropdownItem').first()

    jest.runAllTimers()

    expect(wrapper.state().focusIndex).toBe(0)
    expect(o.hasClass('is-focused')).toBeTruthy()
  })
})

describe('Height', () => {
  test('Keeps height at null if Menu is within viewport', () => {
    const wrapper = mount(<MenuComponent isOpen />)
    const o = wrapper.find('div.c-DropdownMenu')

    o.getDOMNode().getBoundingClientRect = () => ({
      width: 200,
      height: 40,
      top: 0,
      left: 8,
      right: 0,
      bottom: 0,
    })

    expect(o.instance().height).toBeFalsy()
  })

  test('Attempts to update height on resize', () => {
    const wrapper = mount(<MenuComponent isOpen />)
    const o = wrapper.instance()
    o.height = 10
    // Mock the HTMLDivElement height
    o.contentNode.style.height = '100px'
    o.handleOnResize()

    expect(o.height).not.toBe(10)
    expect(window.getComputedStyle(o.contentNode).height).not.toContain(100)
  })
})

describe('Keyboard Arrows: Up/Down', () => {
  test('Changes focusIndex on arrow down of a non-selected item', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )

    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')

    expect(wrapper.state().focusIndex).toBe(3)
    wrapper.setState({}) // Force update

    expect(
      wrapper
        .find('div.c-DropdownItem')
        .first()
        .hasClass('is-focused')
    ).not.toBeTruthy()

    expect(
      wrapper
        .find('div.c-DropdownItem')
        .last()
        .hasClass('is-focused')
    ).toBeTruthy()
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

    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    simulateKeyPress(Keys.UP_ARROW, 'keydown')

    expect(wrapper.state().focusIndex).toBe(0)
    wrapper.setState({}) // Force update

    expect(
      wrapper
        .find('div.c-DropdownItem')
        .first()
        .hasClass('is-focused')
    ).toBeTruthy()

    expect(
      wrapper
        .find('div.c-DropdownItem')
        .last()
        .hasClass('is-focused')
    ).not.toBeTruthy()
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

    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    simulateKeyPress(Keys.UP_ARROW, 'keydown')

    expect(wrapper.state().focusIndex).toBe(0)
    wrapper.setState({})

    expect(
      wrapper
        .find('div.c-DropdownItem')
        .first()
        .hasClass('is-focused')
    ).toBeTruthy()

    expect(
      wrapper
        .find('div.c-DropdownItem')
        .last()
        .hasClass('is-focused')
    ).not.toBeTruthy()
  })

  test('Can account for divider', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen>
        <Item />
        <Divider />
        <Item />
        <Item />
        <Divider />
        <Item />
      </MenuComponent>
    )
    const o = wrapper.find(Item).first()
    const n = wrapper.find(Item).at(1)
    const z = wrapper.find(Item).last()

    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    wrapper.setState({})

    expect(wrapper.state().focusIndex).toBe(1)

    expect(o.getDOMNode().classList.contains('is-focused')).not.toBeTruthy()
    expect(n.getDOMNode().classList.contains('is-focused')).toBeTruthy()

    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    wrapper.setState({})

    expect(wrapper.state().focusIndex).toBe(0)
    expect(o.getDOMNode().classList.contains('is-focused')).toBeTruthy()
    expect(n.getDOMNode().classList.contains('is-focused')).not.toBeTruthy()

    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    wrapper.setState({})

    expect(wrapper.state().focusIndex).toBe(3)
    expect(o.getDOMNode().classList.contains('is-focused')).not.toBeTruthy()
    expect(n.getDOMNode().classList.contains('is-focused')).not.toBeTruthy()
    expect(z.getDOMNode().classList.contains('is-focused')).toBeTruthy()
  })

  test('Up arrow does not do anything if menu is not focused', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={3} isOpen>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )
    wrapper.instance().isFocused = false

    simulateKeyPress(Keys.UP_ARROW, 'keydown')
    expect(wrapper.state().focusIndex).toBe(3)
  })

  test('Down arrow does not do anything if menu is not focused', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={3} isOpen>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )
    wrapper.instance().isFocused = false

    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    expect(wrapper.state().focusIndex).toBe(3)
  })
})

describe('Keyboard Arrows: Left/Right', () => {
  test('Left arrow does not close if menu is root menu', () => {
    const spy = jest.fn()
    mount(
      <MenuComponent selectedIndex={3} isOpen onClose={spy}>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )

    simulateKeyPress(Keys.LEFT_ARROW, 'keydown')

    expect(spy).not.toHaveBeenCalled()
  })

  test('Left arrow fires onClose callback if menu is sub menu', () => {
    const spy = jest.fn()
    mount(
      <MenuComponent selectedIndex={3} isOpen onClose={spy}>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>,
      {
        context: {
          parentMenu: <div />,
        },
      }
    )

    simulateKeyPress(Keys.LEFT_ARROW, 'keydown')

    expect(spy).toHaveBeenCalled()
  })

  test('Left arrow does not fire onClose callback, if menu is sub menu, but not focused', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MenuComponent selectedIndex={3} isOpen onClose={spy}>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )
    wrapper.instance().isFocused = false

    simulateKeyPress(Keys.LEFT_ARROW, 'keydown')

    expect(spy).not.toHaveBeenCalled()
  })

  test('Right arrow sets hoverIndex + unfocuses menu, if sub menu is present', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MenuComponent selectedIndex={1} isOpen onClose={spy}>
        <Item />
        <Item>
          Sub Menu
          <Menu />
        </Item>
        <Item />
        <Item />
      </MenuComponent>
    )
    const o = wrapper.instance()
    const previousHoverIndex = wrapper.state().hoverIndex

    simulateKeyPress(Keys.RIGHT_ARROW, 'keydown')

    expect(o.items[wrapper.state().focusIndex].menu).toBeTruthy()
    expect(previousHoverIndex).not.toBe(wrapper.state().hoverIndex)
    expect(o.isFocused).toBeFalsy()
  })

  test('Right arrow does not unfocus, if there is no sub menu is present', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MenuComponent selectedIndex={1} isOpen onClose={spy}>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )
    const o = wrapper.instance()

    expect(o.isFocused).toBeTruthy()

    simulateKeyPress(Keys.RIGHT_ARROW, 'keydown')

    expect(o.items[wrapper.state().focusIndex].menu).not.toBeTruthy()
    expect(o.isFocused).toBeTruthy()
  })

  test('Right arrow does not unfocus, if there is no focusIndex', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MenuComponent selectedIndex={1} isOpen onClose={spy}>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )
    const o = wrapper.instance()

    expect(o.isFocused).toBeTruthy()

    wrapper.setState({ focusIndex: null })
    simulateKeyPress(Keys.RIGHT_ARROW, 'keydown')
    expect(o.isFocused).toBeTruthy()

    wrapper.setState({ focusIndex: undefined })
    simulateKeyPress(Keys.RIGHT_ARROW, 'keydown')
    expect(o.isFocused).toBeTruthy()
  })

  // test('Right arrow does not fire onClose callback, if menu is sub menu, but not focused', () => {
  //   const spy = jest.fn()
  //   const wrapper = mount(
  //     <MenuComponent selectedIndex={3} isOpen onClose={spy}>
  //       <Item />
  //       <Item />
  //       <Item />
  //       <Item />
  //     </MenuComponent>
  //   )
  //   wrapper.instance().isFocused = false

  //   simulateKeyPress(Keys.LEFT_ARROW, 'keydown')

  //   expect(spy).not.toHaveBeenCalled()
  // })
})

describe('Open state', () => {
  test('Sets internal isFocused when isOpen prop changes to true', () => {
    const wrapper = mount(
      <MenuComponent>
        <Item />
      </MenuComponent>
    )
    const o = wrapper.instance()
    wrapper.setProps({ isOpen: true })

    expect(o.isFocused).toBe(true)
  })
})

describe('Escape', () => {
  test('Pressing escape fires onClose callback', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <MenuComponent selectedIndex={3} isOpen onClose={spy}>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )

    wrapper.instance().props.onClose()

    // Breaks Enzyme 3 + JSDom
    // simulateKeyPress(Keys.ESCAPE)

    expect(spy).toHaveBeenCalled()
  })
})

describe('Focus', () => {
  test('Focuses item on key down arrow', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )

    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')

    expect(wrapper.state().focusIndex).toBe(3)
    expect(wrapper.instance().items[3].node).toBe(document.activeElement)
  })

  test('Does not focuses item on key down arrow, if menu is unfocused', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen>
        <Item />
        <Item />
        <Item />
        <Item />
      </MenuComponent>
    )
    const o = wrapper.instance()
    o.isFocused = false

    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')
    simulateKeyPress(Keys.DOWN_ARROW, 'keydown')

    expect(wrapper.instance().items[3].node).not.toBe(document.activeElement)
  })

  test('Removes this.isFocused when item with sub-menu is hovered', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={0} isOpen>
        <Item />
        <Item />
        <Item />
        <Item>
          Item
          <Menu />
        </Item>
      </MenuComponent>
    )

    expect(wrapper.instance().isFocused).toBeTruthy()
    expect(wrapper.state().focusIndex).not.toBe(3)
    expect(wrapper.state().hoverIndex).not.toBe(3)

    const o = wrapper
      .find(Item)
      .last()
      .find('.c-DropdownItem__link')
    o.simulate('mouseenter')

    expect(wrapper.state().focusIndex).toBe(3)
    expect(wrapper.state().hoverIndex).toBe(3)
    expect(wrapper.instance().isFocused).not.toBeTruthy()
  })

  test('Resets focus when sub-menu is closed, and if menu is mounted', () => {
    const wrapper = mount(<MenuComponent selectedIndex={0} isOpen />)
    const o = wrapper.instance()
    o.isFocused = false

    o.handleItemOnMenuClose()

    expect(o._isMounted).toBeTruthy()
    expect(o.isFocused).toBeTruthy()
  })

  test('Only resets focus when sub-menu is closed, and if menu is mounted', () => {
    const wrapper = mount(<MenuComponent selectedIndex={0} isOpen />)
    const o = wrapper.instance()
    o.isFocused = false
    o._isMounted = false

    o.handleItemOnMenuClose()

    expect(o._isMounted).not.toBeTruthy()
    expect(o.isFocused).not.toBeTruthy()
  })
})

describe('Propagation', () => {
  test('Clicking the menu stops the event from bubbling', () => {
    const spy = jest.fn()
    const wrapper = mount(
      <div onClick={spy}>
        <MenuComponent selectedIndex={3} isOpen>
          <Item />
          <Item />
          <Item />
          <Item />
        </MenuComponent>
      </div>
    )

    wrapper.find(MenuComponent).simulate('click')

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('Unmounting', () => {
  test('Sets internal _isMounted to false when unmounting', () => {
    const wrapper = mount(
      <MenuComponent selectedIndex={3} isOpen>
        <Item />
      </MenuComponent>
    )
    const o = wrapper.instance()

    expect(o._isMounted).not.toBeFalsy()
    wrapper.unmount()
    expect(o._isMounted).toBeFalsy()
  })
})

describe('Tab navigation', () => {
  test('Is not enabled by default', () => {
    const spy = jest.fn()
    const wrapper = mount(<MenuComponent />)
    const o = wrapper.instance()
    o.handleDownArrow = spy
    o.handleUpArrow = spy

    o.handleTab()
    expect(spy).not.toHaveBeenCalled()

    o.handleShiftTab()
    expect(spy).not.toHaveBeenCalled()
  })

  test('Fires arrow functions, if enabled', () => {
    const spy = jest.fn()
    const wrapper = mount(<MenuComponent enableTabNavigation />)
    const o = wrapper.instance()
    o.handleDownArrow = spy
    o.handleUpArrow = spy

    o.handleTab()
    expect(spy).toHaveBeenCalled()

    o.handleShiftTab()
    expect(spy).toHaveBeenCalled()
  })
})

describe('Closing', () => {
  test('Fires onClose callback when ESC is pressed', () => {
    const spy = jest.fn()
    const wrapper = mount(<MenuComponent isOpen onClose={spy} />)

    // Mock the interaction...
    wrapper.instance().handleEscape()

    expect(spy).toHaveBeenCalled()
  })
})
