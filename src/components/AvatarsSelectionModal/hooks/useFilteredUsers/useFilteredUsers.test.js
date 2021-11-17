import { act, render } from '@testing-library/react'

import React from 'react'
import useFilteredUsers from './useFilteredUsers'

function setup(...args) {
  const returnVal = {}
  function TestComponent() {
    Object.assign(returnVal, useFilteredUsers(...args))
    return null
  }
  render(<TestComponent />)
  return returnVal
}

describe('useFilteredUsers tests', () => {
  const users = [
    { name: 'Maxi', email: 'charca@gmail.com' },
    { name: 'Steve', email: 'steve@gmail.com' },
    { name: 'Andy', email: 'andy@hotmail.com' },
  ]

  test('should allow you to filter the list of users using the returned props', () => {
    const result = setup(users, 'name')

    expect(result.filteredItems).toEqual(users)
    expect(result.searchBarProps.value).toEqual('')

    act(() => result.searchBarProps.onChange('max'))

    expect(result.filteredItems).toEqual([users[0]])
    expect(result.searchBarProps.value).toEqual('max')

    act(() => result.searchBarProps.onChange('a'))

    expect(result.filteredItems).toEqual([users[0], users[2]])
    expect(result.searchBarProps.value).toEqual('a')
  })

  test('should allow you to filter the list by a custom attribute', () => {
    const result = setup(users, 'email')

    expect(result.filteredItems).toEqual(users)
    expect(result.searchBarProps.value).toEqual('')

    act(() => result.searchBarProps.onChange('max'))

    expect(result.filteredItems).toEqual([])
    expect(result.searchBarProps.value).toEqual('max')

    act(() => result.searchBarProps.onChange('charca'))

    expect(result.filteredItems).toEqual([users[0]])
    expect(result.searchBarProps.value).toEqual('charca')

    act(() => result.searchBarProps.onChange('gmail'))

    expect(result.filteredItems).toEqual([users[0], users[1]])
    expect(result.searchBarProps.value).toEqual('gmail')
  })
})
