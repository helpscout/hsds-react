import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import ComboBox from '.'
import InfiniteScroller from '../InfiniteScroller'

export default {
  component: ComboBox,
  title: 'PhaseOut/ComboBox',
}

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
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
  return <ComboBox itemFilterKey="label" items={items} isOpen={true} />
}

export const DropUp = () => {
  return (
    <ComboBox itemFilterKey="label" items={items} isOpen={true} dropUp={true} />
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
    <ComboBox
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

  return <ComboBox {...props} />
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
      console.log('ComboBox: Infinite Scroll: Load More!')
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
        <ComboBox
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
