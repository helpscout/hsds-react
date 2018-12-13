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
  class StatefulDropdown extends React.PureComponent {
    static defaultProps = {
      onSelect: () => undefined,
    }

    state = {
      selectedItem: undefined,
    }

    handleOnSelect = value => {
      this.setState({
        selectedItem: value,
      })
      this.props.onSelect(value)
    }

    render() {
      const { onSelect, ...rest } = this.props
      const { selectedItem } = this.state
      const props = {
        onSelect: this.handleOnSelect,
        selectedItem,
        ...rest,
      }

      console.log(selectedItem)

      return <AutoDropdown {...props} />
    }
  }

  return <StatefulDropdown items={ItemSpec.generate(4)} />
})
