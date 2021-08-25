import {
  decrementPathIndex,
  flattenGroupedItems,
  getCustomItemProps,
  getIndexMapFromItems,
  getItemFromCollection,
  getItemProps,
  getNextChildPath,
  getParentPath,
  getUniqueKeyFromItem,
  incrementPathIndex,
  isDropRight,
  isItemsEmpty,
  isPathActive,
  itemHasSubMenu,
  itemIsActive,
  itemIsHover,
  itemIsOpen,
  itemIsSelected,
  pathResolve,
  filterNonStoreProps,
  processSelectionOfItem,
  isSelectedItemEmpty,
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
    expect(isPathActive()).toBe(false)
    expect(isPathActive('0.1')).toBe(false)
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

  test('Returns empty string if no path', () => {
    expect(getParentPath()).toBe('')
  })
})

describe('getNextChildPath', () => {
  test('Returns the first child index + current path', () => {
    expect(getNextChildPath('1')).toBe('1.0')
    expect(getNextChildPath('1.1')).toBe('1.1.0')
    expect(getNextChildPath('1.0')).toBe('1.0.0')
    expect(getNextChildPath('0')).toBe('0.0')
  })

  test('Returns empty string if no path', () => {
    expect(getNextChildPath()).toBe('')
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

  test('Can match an item by id inside an array of items', () => {
    const selectedItem = [
      { id: 'ron', value: 'Ron' },
      { id: 'ralph', value: 'Ralph' },
      { id: 'rene', value: 'Rene' },
    ]
    const item = { id: 'ron' }

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Can match an item based on value', () => {
    const selectedItem = { id: 'ron', value: 'Ron' }
    const item = { value: 'Ron' }

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Can match an item by value inside an array of items', () => {
    const selectedItem = [
      { id: 'ron', value: 'Ron' },
      { id: 'ralph', value: 'Ralph' },
      { id: 'rene', value: 'Rene' },
    ]
    const item = { value: 'Ron' }

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Can match an item.value based on string selected value', () => {
    const selectedItem = 'Ron'
    const item = { value: 'Ron' }

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Can match an item.value based on string selected value inside an array of items', () => {
    const selectedItem = ['Ron', 'Ralph', 'Rene']
    const item = { value: 'Ron' }

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Can match an item.id based on string selected value', () => {
    const selectedItem = 'ron'
    const item = { id: 'ron' }

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Can match an item.id based on string selected value inside an array of items', () => {
    const selectedItem = ['ron', 'ralph', 'rene']
    const item = { id: 'ron' }

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Can exactly match an item', () => {
    const selectedItem = 'ron'
    const item = 'ron'

    expect(itemIsActive(selectedItem, item)).toBe(true)
  })

  test('Can exactly match an item inside an array of items', () => {
    const selectedItem = ['ron', 'ralph', 'rene']
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

  test('Returns false for non matches inside an array of items', () => {
    const selectedItem = [{ nope_id: 'ron' }, { nope_id: 'ralph' }]
    const item = { id: 'ron', value: 'Ron' }

    expect(itemIsActive(selectedItem, item)).toBe(false)
    expect(itemIsActive(selectedItem, 'ron')).toBe(false)
    expect(itemIsActive('nope', 'ron')).toBe(false)
  })
})

describe('processSelectionOfItem', () => {
  test('Can add to the selection if item is not present', () => {
    const selectedItem = [
      { id: 'ron', value: 'Ron' },
      { id: 'ralph', value: 'Ralph' },
      { id: 'rene', value: 'Rene' },
    ]
    const item = { id: 'ringo', value: 'Ringo' }

    expect(processSelectionOfItem(selectedItem, item)).toEqual(
      selectedItem.concat(item)
    )
  })

  test('Can remove from the selection if item is present', () => {
    const selectedItem = [
      { id: 'ron', value: 'Ron' },
      { id: 'ralph', value: 'Ralph' },
      { id: 'rene', value: 'Rene' },
    ]
    const item = { id: 'ron', value: 'Ron' }

    expect(processSelectionOfItem(selectedItem, item)).toEqual([
      { id: 'ralph', value: 'Ralph' },
      { id: 'rene', value: 'Rene' },
    ])
  })
})

describe('isSelectedItemEmpty', () => {
  test('Checks if selected item is empty when null', () => {
    const selectedItem = null

    expect(isSelectedItemEmpty(selectedItem)).toBe(true)
  })

  test('Checks if selected item is empty when empty string', () => {
    const selectedItem = ''

    expect(isSelectedItemEmpty(selectedItem)).toBe(true)
  })

  test('Checks if selected item is empty when empty array', () => {
    const selectedItem = []

    expect(isSelectedItemEmpty(selectedItem)).toBe(true)
  })

  test('Checks if selected item is not empty', () => {
    const selectedItem = ['hello']

    expect(isSelectedItemEmpty(selectedItem)).toBe(false)
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

  test('Returns undefined for no match', () => {
    const items = [
      { name: 'Ron', value: 'ron' },
      { name: 'Brick', value: 'brick' },
      { name: 'Champ', value: 'champ' },
      { name: 'Brian', value: 'brian' },
    ]

    expect(getItemFromCollection(items, 'nope')).toBe(undefined)
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
  test('Returns true if item matches index', () => {
    const state = {
      index: '1.2.3',
    }

    expect(itemIsHover(state, '1.2')).toBe(true)
    expect(itemIsHover(state, '1.2.3')).toBe(true)
  })

  test('Returns false if item does not match index', () => {
    const state = {
      index: '1.2.3',
    }

    const index = '0.1.2.3'

    expect(itemIsHover(state, index)).toBe(false)
    expect(itemIsHover({}, index)).toBe(false)
  })
})

describe('itemIsOpen', () => {
  test('Returns true if item matches index', () => {
    const state = {
      index: '1.2.3',
    }

    const index = '1.2'

    expect(itemIsOpen(state, index)).toBe(true)
  })

  test('Returns false if item does not match index', () => {
    const state = {
      index: '1.2.3',
    }

    const index = '0.1.2.3'

    expect(itemIsOpen(state, index)).toBe(false)
    expect(itemIsOpen({}, index)).toBe(false)
  })

  test('Returns false if item index is larger than index', () => {
    const state = {
      index: '1.2.3',
    }

    expect(itemIsOpen(state, '1.2.3.4')).toBe(false)
    expect(itemIsOpen(state, '1.2.3')).toBe(false)
  })
})

describe('itemIsSelected', () => {
  test('Returns true if item matches index', () => {
    const state = {
      index: '1.2.3',
    }

    const index = '1.2.3'

    expect(itemIsSelected(state, index)).toBe(true)
  })

  test('Returns false if item does not match index', () => {
    const state = {
      index: '1.2.3',
    }

    expect(itemIsSelected(state, '0.1.2.3')).toBe(false)
    expect(itemIsSelected(state, '0.1.2')).toBe(false)
    expect(itemIsSelected(state, '0.1')).toBe(false)
    expect(itemIsSelected({}, '1.2.3')).toBe(false)
  })
})

describe('flattenGroupedItems', () => {
  test('Returns a flattened array of group + items', () => {
    const items = [
      {
        type: 'group',
        label: 'Channel 4',
        items: [
          { name: 'Ron', id: 'ron' },
          { name: 'Brick', id: 'brick' },
          { name: 'Champ', id: 'champ' },
          { name: 'Brian', id: 'brian' },
        ],
      },
    ]

    const collection = flattenGroupedItems(items)

    expect(collection.length).toBe(5)
    expect(collection[0].type).toBe('group')
    expect(collection[0].label).toBe('Channel 4')
  })
})

describe('isItemsEmpty', () => {
  test('Returns true for empty items', () => {
    expect(isItemsEmpty([])).toBe(true)
    expect(isItemsEmpty([{ type: 'group', items: [] }])).toBe(true)
  })

  test('Returns false for non empty items', () => {
    expect(isItemsEmpty([{ value: 'ron' }])).toBe(false)
    expect(isItemsEmpty([{ type: 'group', items: [{ value: 'ron' }] }])).toBe(
      false
    )
  })
})

describe('getUniqueKeyFromItem', () => {
  test('Attempts to return the best, unique, key', () => {
    expect(getUniqueKeyFromItem({ id: 'ron' })).toBe('ron')
    expect(getUniqueKeyFromItem({ value: 'ron' })).toBe('ron')
    expect(getUniqueKeyFromItem({ label: 'ron' })).toBe('ron')
    expect(getUniqueKeyFromItem({ id: 'ron', value: 'brick' })).toBe('ron')
    // Invalid items
    expect(getUniqueKeyFromItem({})).toBe(undefined)

    expect(getUniqueKeyFromItem()).toBe(undefined)
  })
})

describe('getIndexMapFromItems', () => {
  test('Can create an indexMap with flat items', () => {
    const items = [
      { name: 'Ron', id: 'ron' },
      { name: 'Brick', id: 'brick' },
      { name: 'Champ', id: 'champ' },
      { type: 'divider' },
      { name: 'Brian', id: 'brian' },
    ]
    const indexMap = getIndexMapFromItems(items)

    expect(Object.keys(indexMap).length).toBe(4)
    expect(indexMap['0']).toEqual('ron')
    expect(indexMap['1']).toEqual('brick')
  })

  test('Can create an indexMap with grouped items', () => {
    const items = [
      {
        type: 'group',
        label: 'Channel 4',
        items: [
          { name: 'Ron', id: 'ron' },
          { name: 'Brick', id: 'brick' },
          { name: 'Champ', id: 'champ' },
          { name: 'Brian', id: 'brian' },
        ],
      },
    ]
    const indexMap = getIndexMapFromItems(items)

    expect(Object.keys(indexMap).length).toBe(4)
    expect(indexMap['0']).toEqual('ron')
    expect(indexMap['1']).toEqual('brick')
  })

  test('Can create an indexMap with grouped items + nested items', () => {
    const items = [
      {
        type: 'group',
        label: 'Channel 4',
        items: [
          {
            name: 'Ron',
            id: 'ron',
            items: [
              { name: 'Brick', id: 'brick' },
              { name: 'Champ', id: 'champ' },
              { name: 'Brian', id: 'brian' },
            ],
          },
        ],
      },
    ]
    const indexMap = getIndexMapFromItems(items)

    expect(Object.keys(indexMap).length).toBe(4)
    expect(indexMap['0']).toEqual('ron')
    expect(indexMap['0.0']).toEqual('brick')
  })
})

describe('getItemProps', () => {
  const item = {
    className: 'ron',
    index: '0',
    value: 'ron',
    'aria-label': 'Is Ron',
  }

  test('Returns unmodified item if state is undefined', () => {
    const state = undefined

    expect(getItemProps(state, item)).toBe(item)
  })

  test('Enhances item based on state, if applicable', () => {
    const state = {
      indexMap: getIndexMapFromItems([item]),
      items: [{ ...item, items: [{ value: 'brick' }] }],
      index: '0',
      selectedItem: item,
    }

    const enhancedItem = getItemProps(state, item)

    expect(enhancedItem).not.toBe(item)
    expect(enhancedItem.className).toContain(item.className)
    expect(enhancedItem.className.length).toBeGreaterThan(item.className.length)
    expect(enhancedItem.isSelected).toBe(true)
    expect(enhancedItem.isActive).toBe(true)
  })
})

describe('filterNonStoreProps', () => {
  test('Removes non-store safe props', () => {
    const props = {
      a: 'nope',
      items: [],
      index: '0',
    }
    const nextProps = filterNonStoreProps(props)

    expect(Object.keys(nextProps).length).toBe(2)
    expect(nextProps['a']).toBe(undefined)
    expect(nextProps['items']).toBe(props.items)
    expect(nextProps['index']).toBe(props.index)
  })
})
