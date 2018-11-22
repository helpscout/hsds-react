import * as React from 'react'
import {
  pathResolve,
  isPathActive,
  getParentPath,
  getNextChildPath,
  incrementPathIndex,
  decrementPathIndex,
  enhanceItemsWithProps,
  getCustomItemProps,
  itemIsActive,
  getItemFromCollection,
  setMenuPositionStyles,
  isDropRight,
  itemHasSubMenu,
  itemIsHover,
  itemIsOpen,
  itemIsSelected,
  getItemPropsOld,
  getEnhancedItemsWithProps,
  renderRenderPropComponent,
} from '../Dropdown.utils'

describe('pathResolve', () => {
  test('Combines paths together, with a . delimeter', () => {
    expect(pathResolve(0)).toBe('0')
    expect(pathResolve('a')).toBe('a')
    expect(pathResolve('a', 'b')).toBe('a.b')
    expect(pathResolve('a', 'b', 'c', 'd')).toBe('a.b.c.d')
  })

  test('Filters out undefined paths', () => {
    expect(pathResolve('a', 'b', undefined, 'd')).toBe('a.b.d')
    expect(pathResolve('a', 'b', null, 'd')).toBe('a.b.d')
  })

  test('Ignores initial path if undefined', () => {
    expect(pathResolve(null, 'b')).toBe('b')
    expect(pathResolve(undefined, 'b')).toBe('b')
  })

  test('Does not ignore zero as initial path', () => {
    expect(pathResolve(0, 'b')).toBe('0.b')
  })

  test('Converts numbers to strings', () => {
    expect(pathResolve(0, 1, 2, 3, 4)).toBe('0.1.2.3.4')
    expect(pathResolve(0, 1, 2, 0, 4)).toBe('0.1.2.0.4')
    expect(pathResolve(0, 1, 2, null, 4)).toBe('0.1.2.4')
  })
})

describe('isPathActive', () => {
  test('Returns true for matching path', () => {
    expect(isPathActive('1.2.3.4', '1')).toBe(true)
    expect(isPathActive('1.2.3', '1')).toBe(true)
    expect(isPathActive('1.2.3', '1.2')).toBe(true)
    expect(isPathActive('1.2.3', '1.2.3')).toBe(true)
    expect(isPathActive('1.2.3.4', '1.2.3')).toBe(true)
  })

  test('Returns false for non-matching paths', () => {
    // @ts-ignore
    expect(isPathActive()).toBe(false)
    expect(isPathActive('1.2', '1.2.3')).toBe(false)
    expect(isPathActive('0', '1')).toBe(false)
    expect(isPathActive('0.1', '1')).toBe(false)
    expect(isPathActive('0.1.1', '1.1')).toBe(false)
    expect(isPathActive('1.1.1', '1.2')).toBe(false)
    expect(isPathActive('1.1.1', '1.2.1')).toBe(false)
    expect(isPathActive('1.1.1', '1.1.0')).toBe(false)
  })
})

describe('getParentPath', () => {
  test('Returns the parent path', () => {
    expect(getParentPath('1.2.3.4')).toBe('1.2.3')
    expect(getParentPath('1.2.3')).toBe('1.2')
    expect(getParentPath('1.2')).toBe('1')
    expect(getParentPath('1')).toBe('1')
  })
})

describe('getNextChildPath', () => {
  test('Returns the first child index + current path', () => {
    expect(getNextChildPath('1')).toBe('1.0')
    expect(getNextChildPath('1.1')).toBe('1.1.0')
    expect(getNextChildPath('1.0')).toBe('1.0.0')
    expect(getNextChildPath('0')).toBe('0.0')
  })
})

describe('incrementPathIndex', () => {
  test('Increases path index by 1, by default', () => {
    expect(incrementPathIndex('0')).toBe('1')
    expect(incrementPathIndex('1')).toBe('2')
    expect(incrementPathIndex('0.0')).toBe('0.1')
    expect(incrementPathIndex('0.1.0.1')).toBe('0.1.0.2')
  })

  test('Can increment path by a specified value', () => {
    expect(incrementPathIndex('0', 5)).toBe('5')
    expect(incrementPathIndex('1', 10)).toBe('11')
    expect(incrementPathIndex('0.0', 3)).toBe('0.3')
    expect(incrementPathIndex('0.1.0.1', 18)).toBe('0.1.0.19')
  })
})

describe('decrementPathIndex', () => {
  test('Increases path index by 1, by default', () => {
    expect(decrementPathIndex('1')).toBe('0')
    expect(decrementPathIndex('2')).toBe('1')
    expect(decrementPathIndex('0.1')).toBe('0.0')
    expect(decrementPathIndex('0.1.0.1')).toBe('0.1.0.0')
  })

  test('Can increment path by a specified value', () => {
    expect(decrementPathIndex('6', 5)).toBe('1')
    expect(decrementPathIndex('20', 10)).toBe('10')
    expect(decrementPathIndex('0.5', 3)).toBe('0.2')
  })

  test('Does not decrement below zero', () => {
    expect(decrementPathIndex('0')).toBe('0')
    expect(decrementPathIndex('5.4.3.0')).toBe('5.4.3.0')
    expect(decrementPathIndex('5.4.3.0', 10)).toBe('5.4.3.0')
  })
})

describe('enhanceItemsWithProps', () => {
  test('Can add props to an array of items', () => {
    const items = [{ name: 'ron' }, { name: 'champ' }]
    const enhancedItems = enhanceItemsWithProps(items, { network: 'channel 4' })

    expect(enhancedItems[0]).toEqual({
      name: 'ron',
      network: 'channel 4',
    })
    expect(enhancedItems[1]).toEqual({
      name: 'champ',
      network: 'channel 4',
    })
  })

  test('Can add props to a nested array of items', () => {
    const items = [
      {
        name: 'ron',
        items: [{ name: 'brick' }],
      },
      { name: 'champ' },
    ]
    const enhancedItems = enhanceItemsWithProps(items, { network: 'channel 4' })

    expect(enhancedItems[0]).toEqual({
      name: 'ron',
      network: 'channel 4',
      items: [{ name: 'brick', network: 'channel 4' }],
    })
    expect(enhancedItems[1]).toEqual({
      name: 'champ',
      network: 'channel 4',
    })
  })
})

describe('getCustomItemProps', () => {
  test('Plucks out some props from provided props', () => {
    const props = {
      renderItem: {},
      value: 'ron',
      label: 'Ron',
    }

    const nextProps = getCustomItemProps(props)

    expect(nextProps.renderItem).toBe(undefined)
  })
})

describe('itemIsActive', () => {
  test('Can match an item based on id', () => {
    const selectedItem = { id: 'ron' }
    const item = { id: 'ron', value: 'Ron' }

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Can match an item based on value', () => {
    const selectedItem = { id: 'ron', value: 'Ron' }
    const item = { value: 'Ron' }

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Can match an item.value based on string selected value', () => {
    const selectedItem = 'Ron'
    const item = { value: 'Ron' }

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Can match an item.id based on string selected value', () => {
    const selectedItem = 'ron'
    const item = { id: 'ron' }

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Can exactly match an item', () => {
    const selectedItem = 'ron'
    const item = 'ron'

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Returns false for non matches', () => {
    const selectedItem = { nope_id: 'ron' }
    const item = { id: 'ron', value: 'Ron' }

    expect(itemIsActive(selectedItem, item)).toBe(false)
    expect(itemIsActive(selectedItem, 'ron')).toBe(false)
    expect(itemIsActive('nope', 'ron')).toBe(false)
  })
})

describe('getItemFromCollection', () => {
  test('Can return an item from a collection based on value match', () => {
    const items = [
      { name: 'Ron', value: 'ron' },
      { name: 'Brick', value: 'brick' },
      { name: 'Champ', value: 'champ' },
      { name: 'Brian', value: 'brian' },
    ]

    expect(getItemFromCollection(items, 'ron')).toEqual({
      name: 'Ron',
      value: 'ron',
    })
  })

  test('Can return a nested item from a collection based on value match', () => {
    const items = [
      {
        newsTeam: 'channel4',
        items: [
          { name: 'Ron', value: 'ron' },
          { name: 'Brick', value: 'brick' },
          { name: 'Champ', value: 'champ' },
          { name: 'Brian', value: 'brian' },
        ],
      },
    ]

    expect(getItemFromCollection(items, 'ron')).toEqual({
      name: 'Ron',
      value: 'ron',
    })
  })

  test('Can return a nested item from a collection based on { value } match', () => {
    const items = [
      {
        newsTeam: 'channel4',
        items: [
          { name: 'Ron', value: 'ron' },
          { name: 'Brick', value: 'brick' },
          { name: 'Champ', value: 'champ' },
          { name: 'Brian', value: 'brian' },
        ],
      },
    ]

    expect(getItemFromCollection(items, { value: 'ron' })).toEqual({
      name: 'Ron',
      value: 'ron',
    })
  })

  test('Can return a nested item from a collection based on { id } match', () => {
    const items = [
      {
        newsTeam: 'channel4',
        items: [
          { name: 'Ron', id: 'ron' },
          { name: 'Brick', id: 'brick' },
          { name: 'Champ', id: 'champ' },
          { name: 'Brian', id: 'brian' },
        ],
      },
    ]

    expect(getItemFromCollection(items, { id: 'ron' })).toEqual({
      name: 'Ron',
      id: 'ron',
    })
  })

  test('Can return a nested item from a collection based on direct match', () => {
    const items = [
      {
        newsTeam: 'channel4',
        items: [
          { name: 'Ron', id: 'ron' },
          { name: 'Brick', id: 'brick' },
          { name: 'Champ', id: 'champ' },
          { name: 'Brian', id: 'brian' },
        ],
      },
    ]

    expect(getItemFromCollection(items, { name: 'Ron', id: 'ron' })).toEqual({
      name: 'Ron',
      id: 'ron',
    })
  })
})

describe('setMenuPositionStyles', () => {
  test('Does not modify wrapperNode styles if other required DOM nodes are missing', () => {
    const wrapperNode: HTMLElement = document.createElement('div')
    const triggerNode: HTMLElement = document.createElement('div')
    const itemNode: HTMLElement = document.createElement('div')

    const props = {
      wrapperNode,
      menuNode: null,
      triggerNode,
      itemNode,
    }
    const styles = wrapperNode.style.transform

    setMenuPositionStyles(props)

    expect(styles).toBe(wrapperNode.style.transform)
  })

  test('Modifies wrapperNode styles from DOM node measurements', () => {
    const wrapperNode: HTMLElement = document.createElement('div')
    const menuNode: HTMLElement = document.createElement('div')
    const triggerNode: HTMLElement = document.createElement('div')
    const itemNode: HTMLElement = document.createElement('div')

    wrapperNode.style.height = '100px'

    const props = {
      wrapperNode,
      menuNode,
      triggerNode,
      itemNode,
    }

    const styles = { ...wrapperNode.style }

    setMenuPositionStyles(props)

    expect(styles).not.toEqual(wrapperNode.style)
  })
})

describe('itemHasSubMenu', () => {
  test('Returns true item contains items', () => {
    const item = {
      items: [1, 2, 3],
    }

    expect(itemHasSubMenu(item)).toBe(true)
  })

  test('Returns false item does not contains items', () => {
    const item = {
      value: 'ron',
    }

    expect(itemHasSubMenu(item)).toBe(false)
  })

  test('Returns false item.items is empty', () => {
    const item = {
      items: [],
    }

    expect(itemHasSubMenu(item)).toBe(false)
  })
})

describe('isDropRight', () => {
  test('Returns true if direction is "right"', () => {
    const state = {
      direction: 'right',
    }

    expect(isDropRight(state)).toBe(true)
  })

  test('Returns false if direction is "left"', () => {
    const state = {
      direction: 'left',
    }

    expect(isDropRight(state)).toBe(false)
  })
})

describe('itemIsHover', () => {
  test('Returns true if item matches activeIndex', () => {
    const state = {
      activeIndex: '1.2.3',
    }

    expect(itemIsHover(state, '1.2')).toBe(true)
    expect(itemIsHover(state, '1.2.3')).toBe(true)
  })

  test('Returns false if item does not match activeIndex', () => {
    const state = {
      activeIndex: '1.2.3',
    }

    const index = '0.1.2.3'

    expect(itemIsHover(state, index)).toBe(false)
    expect(itemIsHover({}, index)).toBe(false)
  })
})

describe('itemIsOpen', () => {
  test('Returns true if item matches activeIndex', () => {
    const state = {
      activeIndex: '1.2.3',
    }

    const index = '1.2'

    expect(itemIsOpen(state, index)).toBe(true)
  })

  test('Returns false if item does not match activeIndex', () => {
    const state = {
      activeIndex: '1.2.3',
    }

    const index = '0.1.2.3'

    expect(itemIsOpen(state, index)).toBe(false)
    expect(itemIsOpen({}, index)).toBe(false)
  })

  test('Returns false if item index is larger than activeIndex', () => {
    const state = {
      activeIndex: '1.2.3',
    }

    expect(itemIsOpen(state, '1.2.3.4')).toBe(false)
    expect(itemIsOpen(state, '1.2.3')).toBe(false)
  })
})

describe('itemIsSelected', () => {
  test('Returns true if item matches activeIndex', () => {
    const state = {
      activeIndex: '1.2.3',
    }

    const index = '1.2.3'

    expect(itemIsSelected(state, index)).toBe(true)
  })

  test('Returns false if item does not match activeIndex', () => {
    const state = {
      activeIndex: '1.2.3',
    }

    expect(itemIsSelected(state, '0.1.2.3')).toBe(false)
    expect(itemIsSelected(state, '0.1.2')).toBe(false)
    expect(itemIsSelected(state, '0.1')).toBe(false)
    expect(itemIsSelected({}, '1.2.3')).toBe(false)
  })
})

describe('getItemPropsOld', () => {
  const item = {
    className: 'ron',
    index: '0.1',
    value: 'ron',
    'aria-label': 'Is Ron',
  }

  test('Returns unmodified item if state is undefined', () => {
    const state = undefined

    expect(getItemPropsOld(state, item)).toBe(item)
  })

  test('Enhances item based on state, if applicable', () => {
    const state = {
      activeIndex: '0.1.3',
    }

    const enhancedItem: any = getItemPropsOld(state, item)

    expect(enhancedItem).not.toBe(item)
    expect(enhancedItem.className).toContain(item.className)
    expect(enhancedItem.className.length).toBeGreaterThan(item.className.length)
    expect(enhancedItem.isHover).toBe(true)
    expect(enhancedItem.isOpen).toBe(true)
    expect(enhancedItem.isSelected).toBe(false)
    expect(enhancedItem.isActive).toBe(false)
  })
})

describe('getEnhancedItemsWithProps', () => {
  test('Enhances item from state', () => {
    const item = {
      className: 'ron',
      value: 'ron',
      'aria-label': 'Is Ron',
    }

    const state = {
      activeIndex: '2',
      items: [item],
    }

    const enhancedItems: any = getEnhancedItemsWithProps(state)
    const enhancedItem = enhancedItems[0]

    expect(enhancedItem).not.toBe(item)
    expect(enhancedItem.className).toContain(item.className)
    expect(enhancedItem.className.length).toBeGreaterThan(item.className.length)
    expect(enhancedItem.isHover).toBe(false)
    expect(enhancedItem.isOpen).toBe(false)
    expect(enhancedItem.isSelected).toBe(false)
    expect(enhancedItem.isActive).toBe(false)
  })

  test('Enhances nested item from state', () => {
    const item = {
      className: 'ron',
      value: 'ron',
      'aria-label': 'Is Ron',
      items: [
        {
          className: 'brian',
          value: 'brian',
          'aria-label': 'Is Brian',
        },
      ],
    }

    const state = {
      activeIndex: '0.0',
      selectedItem: 'brian',
      items: [item],
    }

    const childItem = item.items[0]
    const enhancedItems: any = getEnhancedItemsWithProps(state)
    const enhancedItem = enhancedItems[0]
    const enhancedChildItem = enhancedItem.items[0]

    expect(enhancedItem.hasSubMenu).toBe(true)
    expect(enhancedItem.isHover).toBe(true)
    expect(enhancedItem.isOpen).toBe(true)

    expect(enhancedChildItem).not.toBe(childItem)
    expect(enhancedChildItem.className).toContain(childItem.className)
    expect(enhancedChildItem.className.length).toBeGreaterThan(
      childItem.className.length
    )
    expect(enhancedChildItem.isHover).toBe(true)
    expect(enhancedChildItem.isOpen).toBe(false)
    expect(enhancedChildItem.isSelected).toBe(true)
    expect(enhancedChildItem.isActive).toBe(true)
  })
})

describe('renderRenderPropComponent', () => {
  test('Can render an instantiated React component', () => {
    const CryLaughingComponent = () => <div />
    const result = renderRenderPropComponent(<CryLaughingComponent />)

    expect(React.isValidElement(result)).toBe(true)
  })

  test('Can pass props to instantiated component', () => {
    const CryLaughingComponent = () => <div />
    const props = {
      disabled: true,
    }
    const result = renderRenderPropComponent(
      // @ts-ignore
      <CryLaughingComponent title="custom" />,
      props
    )

    expect(result.props.title).toBe('custom')
    expect(result.props.disabled).toBe(true)
  })

  test('Can render a function', () => {
    const CryLaughingComponent = () => <div />
    const result = renderRenderPropComponent(() => <CryLaughingComponent />)

    expect(React.isValidElement(result)).toBe(true)
  })

  test('Can pass props to a functional component', () => {
    const CryLaughingComponent = () => <div />
    const props = {
      disabled: true,
    }
    const result = renderRenderPropComponent(
      ({ disabled }) => (
        // @ts-ignore
        <CryLaughingComponent title="custom" disabled={disabled} />
      ),
      props
    )

    expect(result.props.title).toBe('custom')
    expect(result.props.disabled).toBe(true)
  })

  test('Returns null for invalid arg', () => {
    expect(renderRenderPropComponent(0)).toBe(null)
    expect(renderRenderPropComponent(null)).toBe(null)
    expect(renderRenderPropComponent(undefined)).toBe(null)
    expect(renderRenderPropComponent('div')).toBe(null)
  })
})
