import * as React from 'react'
import { AutoDropdown } from '../src/components'
import { withKnobs, boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { createSpec, faker } from '@helpscout/helix'
import { storiesOf } from '@storybook/react'

const stories = storiesOf('AutoDropdown', module)
stories.addDecorator(withKnobs)

const ItemSpec = createSpec({
  value: faker.name.firstName(),
})
const items = ItemSpec.generate(15)

stories.add('Default', () => {
  const props = {
    items,
    dropUp: boolean('dropUp', false),
    limit: number('limit', 15),
    onSelect: action('onSelect'),
  }

  return <AutoDropdown {...props} />
})

stories.add('Stateful', () => {
  class Example extends React.Component {
    static defaultProps = {
      onSelect: action('onSelect'),
    }

    state = {
      selectedItem: undefined,

      isOpen: true,
      items: ItemSpec.generate(8),
    }

    add = () => {
      this.setState({
        items: [...this.state.items, ItemSpec.generate()],
      })
    }

    remove = () => {
      this.setState({
        items: this.state.items.slice(0, -1),
      })
    }

    handleOnSelect = (value, props) => {
      this.setState({
        selectedItem: value,
      })
      this.props.onSelect(value, props)
    }

    render() {
      const props = {
        ...this.state,
        onSelect: this.handleOnSelect,
        clearOnSelect: false,
      }

      return (
        <div>
          <button onClick={this.add}>Add Item</button>
          <button onClick={this.remove}>Remove Item</button>
          <hr />
          <AutoDropdown {...props} />
        </div>
      )
    }
  }

  return <Example />
})

stories.add('Stateful/With Multiple Selection', () => {
  const props = {
    items,
    dropUp: boolean('dropUp', false),
    limit: number('limit', 1),
    onSelect: action('onSelect'),
    isOpen: boolean('isOpen', true),
    closeOnSelect: boolean('closeOnSelect', false),
    clearOnSelect: boolean('closeOnSelect', false),
    selectedItem: [],
    selectionClearer: 'All Items',
    allowMultipleSelection: boolean('allowMultipleSelection', true),
    stateReducer: (state, action) => {
      if (
        action.type === '@@HSDS/DROPDOWN/SELECT_ITEM' ||
        action.type === '@@HSDS/DROPDOWN/CLEAR_SELECTION'
      ) {
        console.group('stateReducer')
        console.log('HSDS: action', action)
        console.log('HSDS: state', state)
        console.groupEnd('stateReducer')
      }
      return state
    },
  }

  return <AutoDropdown {...props} />
})

stories.add('Multiple instances', () => {
  const renderTrigger = index => <span>{`Click ${index}`}</span>

  return (
    <ul>
      {[...Array(100).keys()].map(i => (
        <li key={i}>
          <AutoDropdown items={items} renderTrigger={renderTrigger(i)} />
        </li>
      ))}
    </ul>
  )
})
