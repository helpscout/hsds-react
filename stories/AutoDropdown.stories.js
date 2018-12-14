import * as React from 'react'
import { AutoDropdown } from '../src/components'
import {
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { createSpec, faker } from '@helpscout/helix'
import { storiesOf } from '@storybook/react'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('AutoDropdown', module)
stories.addDecorator(withArtboard({ withCenterGuides: false }))
stories.addDecorator(withKnobs)

const ItemSpec = createSpec({
  id: faker.random.uuid(),
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
      onSelect: () => undefined,
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

    handleOnSelect = value => {
      this.setState({
        selectedItem: value,
      })
      this.props.onSelect(value)
      console.log(value)
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
