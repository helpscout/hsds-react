import React from 'react'
import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import { createSpec, faker } from '@helpscout/helix'
import Dropdown from './index'
import Button from '../Button'

export default {
  component: Dropdown,
  title: 'Components/Dropdowns/Dropdown',
}

export const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
  onClick: () => (value, props) => console.log('Clicked!', value),
})

export const DropdownDefault = () => {
  const props = {
    items: ItemSpec.generate(100),
    disabled: boolean('disabled', false),
  }

  return <Dropdown {...props} />
}

DropdownDefault.story = {
  name: 'Dropdown/Default',
}

export const DropdownEmpty = () => {
  const Empty = () => <div>Nothing here!</div>

  return <Dropdown items={[]} renderEmpty={() => <Empty />} />
}

DropdownEmpty.story = {
  name: 'Dropdown/Empty',
}

export const DropdownLoading = () => {
  const items = ItemSpec.generate(8)
  const Loading = () => <div>Loading...</div>

  return <Dropdown items={items} isLoading renderLoading={() => <Loading />} />
}

DropdownLoading.story = {
  name: 'Dropdown/Loading',
}

export const MenuCustomSize = () => {
  const items = ItemSpec.generate(8)

  return <Dropdown items={items} minWidth={400} maxWidth={600} />
}

MenuCustomSize.story = {
  name: 'Menu/Custom size',
}

export const MenuDownLeft = () => {
  const items = ItemSpec.generate(20)

  return <Dropdown items={items} direction="left" />
}

MenuDownLeft.story = {
  name: 'Menu/DownLeft',
}

export const MenuCallbacks = () => {
  const items = ItemSpec.generate(8)
  const onOpen = () => console.log('Open')
  const onClose = () => console.log('Close')
  const onSelect = (item, props) => console.log('Select', props.item)

  return <Dropdown {...{ items, onOpen, onClose, onSelect }} />
}

MenuCallbacks.story = {
  name: 'Menu/Callbacks',
}

export const MenuStateReducer = () => {
  const items = ItemSpec.generate(8)
  const stateReducer = (state, action) => {
    console.group('State update')
    console.log('state', state)
    console.log('action', action)
    console.groupEnd()

    return state
  }

  return <Dropdown {...{ items, stateReducer }} />
}

MenuStateReducer.story = {
  name: 'Menu/StateReducer',
}

export const MenuSubscribe = () => {
  const items = ItemSpec.generate(8)
  const subscribe = state => console.log('State update', state)

  return <Dropdown {...{ items, subscribe }} />
}

MenuSubscribe.story = {
  name: 'Menu/Subscribe',
}

export const MenuZIndex = () => {
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
}

MenuZIndex.story = {
  name: 'Menu/zIndex',
}

export const MenuNested = () => {
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
}

MenuNested.story = {
  name: 'Menu/Nested',
}

export const MenuNestedUpLeft = () => {
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
}

MenuNestedUpLeft.story = {
  name: 'Menu/Nested/UpLeft',
}

export const ItemLink = () => {
  const props = {
    disabled: boolean('disabled', false),
    items: ItemSpec.generate(100).map(item => ({
      ...item,
      href: 'https://helpscout.com',
    })),
  }

  return <Dropdown {...props} />
}

ItemLink.story = {
  name: 'Item/Link',
}

export const ItemDisabledLink = () => {
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
}

ItemDisabledLink.story = {
  name: 'Item/Disabled Link',
}

export const ItemActive = () => {
  const items = ItemSpec.generate(8)
  const selectedItem = items[0]

  return (
    <Dropdown items={items} selectedItem={selectedItem} clearOnSelect={false} />
  )
}

ItemActive.story = {
  name: 'Item/Active',
}

export const ItemDisabled = () => {
  const items = ItemSpec.generate(8).map((item, index) => {
    if (index !== 5) return item
    return {
      ...item,
      disabled: true,
    }
  })

  return <Dropdown items={items} />
}

ItemDisabled.story = {
  name: 'Item/Disabled',
}

export const ItemDivider = () => {
  const items = ItemSpec.generate(8).map((item, index) => {
    if (index !== 5) return item
    return {
      type: 'divider',
    }
  })

  return <Dropdown items={items} />
}

ItemDivider.story = {
  name: 'Item/Divider',
}

export const ItemGroups = () => {
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
}

ItemGroups.story = {
  name: 'Item/Groups',
}

export const ItemCustom = () => {
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
}

ItemCustom.story = {
  name: 'Item/Custom',
}

export const TriggerCustom = () => {
  const items = ItemSpec.generate(8)

  return (
    <Dropdown
      items={items}
      renderTrigger={<Button kind="secondary">Dropdown</Button>}
    />
  )
}

TriggerCustom.story = {
  name: 'Trigger/Custom',
}

export const Stateful = () => {
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
}

export const StatefulMultipleSelection = () => {
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
}

StatefulMultipleSelection.story = {
  name: 'Stateful/Multiple Selection',
}

export const Disabled = () => {
  const items = ItemSpec.generate(100)

  return <Dropdown disabled items={items} />
}
