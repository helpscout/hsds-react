import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import { createSpec, faker } from '@helpscout/helix'
import Dropdown from './index'
import Button from '../Button'

const stories = storiesOf('Components/Dropdown', module)

stories.addParameters({
  a11y: { element: '.c-Dropdown' },
})

export const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
  onClick: () => (value, props) => console.log('Clicked!', value),
})

stories.add('Dropdown/Default', () => {
  const props = {
    items: ItemSpec.generate(100),
    disabled: boolean('disabled', false),
  }

  return <Dropdown {...props} />
})

stories.add('Dropdown/Empty', () => {
  const Empty = () => <div>Nothing here!</div>

  return <Dropdown items={[]} renderEmpty={() => <Empty />} />
})

stories.add('Dropdown/Loading', () => {
  const items = ItemSpec.generate(8)
  const Loading = () => <div>Loading...</div>

  return <Dropdown items={items} isLoading renderLoading={() => <Loading />} />
})

stories.add('Menu/Custom size', () => {
  const items = ItemSpec.generate(8)

  return <Dropdown items={items} minWidth={400} maxWidth={600} />
})

stories.add('Menu/DownLeft', () => {
  const items = ItemSpec.generate(20)

  return <Dropdown items={items} direction="left" />
})

stories.add('Menu/Callbacks', () => {
  const items = ItemSpec.generate(8)
  const onOpen = () => console.log('Open')
  const onClose = () => console.log('Close')
  const onSelect = (item, props) => console.log('Select', props.item)

  return <Dropdown {...{ items, onOpen, onClose, onSelect }} />
})

stories.add('Menu/StateReducer', () => {
  const items = ItemSpec.generate(8)
  const stateReducer = (state, action) => {
    console.group('State update')
    console.log('state', state)
    console.log('action', action)
    console.groupEnd()

    return state
  }

  return <Dropdown {...{ items, stateReducer }} />
})

stories.add('Menu/Subscribe', () => {
  const items = ItemSpec.generate(8)
  const subscribe = state => console.log('State update', state)

  return <Dropdown {...{ items, subscribe }} />
})

stories.add('Menu/zIndex', () => {
  const items = ItemSpec.generate(8)

  return (
    <div>
      <div
        style={{
          background: 'red',
          padding: 20,
          position: 'relative',
          zIndex: '88888',
        }}
      >
        z-index: 88888
      </div>
      <Dropdown items={items} zIndex={999999} direction="up" />
    </div>
  )
})

stories.add('Menu/Nested', () => {
  const items = [
    {
      ...ItemSpec.generate(),
      items: [
        ...ItemSpec.generate(5),
        {
          ...ItemSpec.generate(),
          items: [
            ...ItemSpec.generate(10),
            { ...ItemSpec.generate(), items: ItemSpec.generate(20) },
          ],
        },
      ],
    },
    ...ItemSpec.generate(6),
  ]

  return <Dropdown items={items} isOpened />
})

stories.add('Menu/Nested/UpLeft', () => {
  const items = [
    {
      ...ItemSpec.generate(),
      items: [
        ...ItemSpec.generate(5),
        {
          ...ItemSpec.generate(),
          items: [
            ...ItemSpec.generate(10),
            { ...ItemSpec.generate(), items: ItemSpec.generate(20) },
          ],
        },
      ],
    },
    ...ItemSpec.generate(6),
  ]

  return <Dropdown items={items} dropUp direction="left" />
})

stories.add('Item/Link', () => {
  const props = {
    disabled: boolean('disabled', false),
    items: ItemSpec.generate(100).map(item => ({
      ...item,
      href: 'https://helpscout.com',
    })),
  }

  return <Dropdown {...props} />
})

stories.add('Item/Disabled Link', () => {
  const props = {
    disabled: boolean('disabled', false),
    items: ItemSpec.generate(100)
      .map(item => ({ ...item, href: 'https://helpscout.com' }))
      .map((item, index) => ({
        ...item,
        disabled: index === 5 || index === 15 || index === 75,
      })),
  }

  return <Dropdown {...props} />
})

stories.add('Item/Active', () => {
  const items = ItemSpec.generate(8)
  const selectedItem = items[0]

  return (
    <Dropdown items={items} selectedItem={selectedItem} clearOnSelect={false} />
  )
})

stories.add('Item/Disabled', () => {
  const items = ItemSpec.generate(8).map((item, index) => {
    if (index !== 5) return item
    return {
      ...item,
      disabled: true,
    }
  })

  return <Dropdown items={items} />
})

stories.add('Item/Divider', () => {
  const items = ItemSpec.generate(8).map((item, index) => {
    if (index !== 5) return item
    return {
      type: 'divider',
    }
  })

  return <Dropdown items={items} />
})

stories.add('Item/Groups', () => {
  const items = [
    {
      items: [
        {
          ...ItemSpec.generate(),
          items: ItemSpec.generate(8),
        },
        ...ItemSpec.generate(8),
      ],
      label: 'Group 1',
      value: 'thing',
      type: 'group',
    },
    {
      items: ItemSpec.generate(8),
      label: 'Group 2',
      type: 'group',
      value: 'thing2',
    },
  ]

  return <Dropdown items={items} />
})

stories.add('Item/Custom', () => {
  const items = ItemSpec.generate(8)
  const onSelect = value => console.log(value)
  const CustomItem = props => {
    return (
      <div
        style={{
          padding: '0px 20px',
          background: 'magenta',
          display: 'inline',
        }}
      >
        Custom
        <br />
        <h2>{props.value}</h2>
      </div>
    )
  }

  return (
    <Dropdown
      items={items}
      renderItem={CustomItem}
      minWidth={300}
      onSelect={onSelect}
    />
  )
})

stories.add('Trigger/Custom', () => {
  const items = ItemSpec.generate(8)

  return (
    <Dropdown
      items={items}
      renderTrigger={<Button kind="secondary">Dropdown</Button>}
    />
  )
})

stories.add('Stateful', () => {
  class Example extends React.Component {
    state = {
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

    render() {
      const getItems = () => this.state.items
      // Forces' Dropdown diff'ing
      const nonCachedStateReducer = state => state

      return (
        <div>
          <button onClick={this.add}>Add Item</button>
          <button onClick={this.remove}>Remove Item</button>
          <hr />
          <Dropdown
            {...this.state}
            items={getItems()}
            stateReducer={nonCachedStateReducer}
          />
        </div>
      )
    }
  }

  return <Example />
})

stories.add('Stateful/Multiple Selection', () => {
  class Example extends React.Component {
    state = {
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

    getItems() {
      return this.state.items
    }

    render() {
      // Forces' Dropdown diff'ing
      const nonCachedStateReducer = state => state

      return (
        <div>
          <button onClick={this.add}>Add Item</button>
          <button onClick={this.remove}>Remove Item</button>
          <hr />
          <Dropdown
            {...this.state}
            allowMultipleSelection
            selectedItem={[this.state.items[0], this.state.items[2]]}
            items={this.getItems()}
            stateReducer={nonCachedStateReducer}
            onSelect={action('onSelect')}
          />
        </div>
      )
    }
  }

  return <Example />
})

stories.add('Disabled', () => {
  const items = ItemSpec.generate(100)

  return <Dropdown disabled items={items} />
})
