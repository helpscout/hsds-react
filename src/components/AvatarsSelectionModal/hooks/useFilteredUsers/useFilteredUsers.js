import { useEffect, useState } from 'react'

/**
 * Filters a list of items (e.g. teams, users) by one of their properties,
 * based on a search query
 *
 * @param {array} allItems
 * @param {string} attribute
 */
function useFilteredUsers(allItems, attribute) {
  const [query, setQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState(allItems)

  useEffect(() => {
    if (!allItems.length) {
      return
    }

    const cleanQuery = query.toLowerCase().trim()

    setFilteredItems(
      allItems.reduce((acc, curr) => {
        if (curr[attribute].toLowerCase().indexOf(cleanQuery) !== -1) {
          acc.push(curr)
        }

        return acc
      }, [])
    )
  }, [query, allItems, attribute])

  return {
    searchBarProps: {
      onChange: setQuery,
      value: query,
    },
    filteredItems,
  }
}

export default useFilteredUsers
