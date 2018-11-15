import {
  pathResolve,
  isPathActive,
  getParentPath,
  getNextChildPath,
  incrementPathIndex,
  decrementPathIndex,
  enhanceItemsWithProps,
  getCustomItemProps,
  isItemActiveFromSelected,
  getItemFromCollection,
} from '../Dropdown.utils'

describe('pathResolve', () => {
  test('Combines paths together, with a . delimeter', () => {
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

describe('isItemActiveFromSelected', () => {
  test('Can match an item based on id', () => {
    const selectedItem = { id: 'ron' }
    const item = { id: 'ron', value: 'Ron' }

    expect(isItemActiveFromSelected(selectedItem, item)).toBe(true)
  })

  test('Can match an item based on value', () => {
    const selectedItem = { id: 'ron', value: 'Ron' }
    const item = { value: 'Ron' }

    expect(isItemActiveFromSelected(selectedItem, item)).toBe(true)
  })

  test('Can match an item.value based on string selected value', () => {
    const selectedItem = 'Ron'
    const item = { value: 'Ron' }

    expect(isItemActiveFromSelected(selectedItem, item)).toBe(true)
  })

  test('Can match an item.id based on string selected value', () => {
    const selectedItem = 'ron'
    const item = { id: 'ron' }

    expect(isItemActiveFromSelected(selectedItem, item)).toBe(true)
  })

  test('Can exactly match an item', () => {
    const selectedItem = 'ron'
    const item = 'ron'

    expect(isItemActiveFromSelected(selectedItem, item)).toBe(true)
  })

  test('Returns false for non matches', () => {
    const selectedItem = { nope_id: 'ron' }
    const item = { id: 'ron', value: 'Ron' }

    expect(isItemActiveFromSelected(selectedItem, item)).toBe(false)
    expect(isItemActiveFromSelected(selectedItem, 'ron')).toBe(false)
    expect(isItemActiveFromSelected('nope', 'ron')).toBe(false)
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
