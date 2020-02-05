import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { action } from '@storybook/addon-actions'
import { boolean, number } from '@storybook/addon-knobs'
import SearchableDropdown from '.'
import InfiniteScroller from '../InfiniteScroller'

export default {
  component: SearchableDropdown,
  title: 'Components/Dropdowns/SearchableDropdown',
}

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  value: faker.name.firstName(),
})

const items = [
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

export const Default = () => {
  return (
    <SearchableDropdown itemFilterKey="label" items={items} isOpen={true} />
  )
}

export const DropUp = () => {
  return (
    <SearchableDropdown
      itemFilterKey="label"
      items={items}
      isOpen={true}
      dropUp={true}
    />
  )
}

DropUp.story = {
  name: 'DropUp',
}

export const StateReducer = () => {
  const stateReducer = (state, action) => {
    console.group('State update')
    console.log('state', state)
    console.log('action', action)
    console.groupEnd()

    return state
  }

  return (
    <SearchableDropdown
      itemFilterKey="label"
      items={items}
      isOpen={true}
      stateReducer={stateReducer}
    />
  )
}

StateReducer.story = {
  name: 'StateReducer',
}

export const StatefulWithMultipleSelection = () => {
  const props = {
    items,
    dropUp: boolean('dropUp', false),
    onSelect: action('onSelect'),
    isOpen: boolean('isOpen', true),
    closeOnSelect: boolean('closeOnSelect', false),
    allowMultipleSelection: boolean('allowMultipleSelection', true),
  }

  return <SearchableDropdown {...props} />
}

StatefulWithMultipleSelection.story = {
  name: 'Stateful/With Multiple Selection',
}

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
          isOpen={true}
          onInputChange={this.onInputChange}
          renderMenuEnd={this.renderMenuEnd}
        />
      )
    }
  }

  return <Test />
}

export const WithAutoInput = () => {
  const props = {
    items,
    dropUp: boolean('dropUp', false),
    limit: number('limit', 15),
    onSelect: action('onSelect'),
    autoInput: true,
  }

  return <SearchableDropdown {...props} />
}

WithAutoInput.story = {
  name: 'with Auto input',
}
