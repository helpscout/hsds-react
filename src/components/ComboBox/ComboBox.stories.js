import React from 'react'
import { storiesOf } from '@storybook/react'
import { createSpec, faker } from '@helpscout/helix'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import Artboard from '@helpscout/artboard'
import ComboBox from '.'
import InfiniteScroller from '../InfiniteScroller'

const stories = storiesOf('PhaseOut/ComboBox', module)
stories.addDecorator(withKnobs)
stories.addDecorator(storyFn => (
  <Artboard
    name="dropdown-v2"
    withCenterGuides={false}
    artboardWidth={480}
    artboardHeight={300}
  >
    <div
      style={{ boxSizing: 'border-box', width: 480, height: 300, padding: 30 }}
    >
      {storyFn()}
    </div>
  </Artboard>
))

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

stories.add('Default', () => {
  return <ComboBox itemFilterKey="label" items={items} isOpen={true} />
})

stories.add('DropUp', () => {
  return (
    <ComboBox itemFilterKey="label" items={items} isOpen={true} dropUp={true} />
  )
})

stories.add('StateReducer', () => {
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
})

stories.add('Stateful/With Multiple Selection', () => {
  const props = {
    items,
    dropUp: boolean('dropUp', false),
    onSelect: action('onSelect'),
    isOpen: boolean('isOpen', true),
    closeOnSelect: boolean('closeOnSelect', false),
    allowMultipleSelection: boolean('allowMultipleSelection', true),
  }

  return <ComboBox {...props} />
})

stories.add('Infinite Scroll', () => {
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
              node.closest('.c-DropdownV2MenuWrapper')
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
})
