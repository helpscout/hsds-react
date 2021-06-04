import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import SearchableDropdown from '.'
import InfiniteScroller from '../InfiniteScroller'

export const ItemSpec = createSpec({
  id: faker.datatype.uuid(),
  value: faker.name.firstName(),
})

export const items = [
  {
    items: ItemSpec.generate(8),
    label: 'Group 1',
    value: 'thing',
    type: 'group',
  },
  {
    items: [
      ...ItemSpec.generate(8),
      { type: 'divider' },
      ...ItemSpec.generate(3),
    ],
    label: 'Group 2',
    type: 'group',
    value: 'thing2',
  },
]

export const InfiniteScroll = () => {
  class Test extends React.Component {
    state = {
      items: ItemSpec.generate(30),
      showInfiniteScroller: true,
    }

    onInputChange = inputValue => {
      this.setState({
        showInfiniteScroller: inputValue.length === 0,
      })
    }

    loadMore = () => {
      console.log('SearchableDropdown: Infinite Scroll: Load More!')
      this.setState({
        items: [...this.state.items, ...ItemSpec.generate(30)],
      })
    }

    renderMenuEnd = () => {
      return (
        this.state.showInfiniteScroller && (
          <InfiniteScroller
            onLoading={this.loadMore}
            offset={200}
            getScrollParent={({ node }) =>
              node.closest('.c-DropdownMenuWrapper')
            }
          />
        )
      )
    }

    render() {
      return (
        <SearchableDropdown
          itemFilterKey="label"
          items={this.state.items}
          isOpen={false}
          onInputChange={this.onInputChange}
          renderMenuEnd={this.renderMenuEnd}
        />
      )
    }
  }

  return <Test />
}
