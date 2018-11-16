import React from 'react'
import { storiesOf } from '@storybook/react'
import { Provider } from 'unistore/react'
import Artboard from '@helpscout/artboard'
import Dropdown from '../src/components/Dropdown/DropdownV2'
import Button from '../src/components/Button'
import store from '../src/components/Dropdown/V2/Dropdown.store'
import { createSpec, faker } from '@helpscout/helix'

const stories = storiesOf('DropdownV2', module)
stories.addDecorator(storyFn => (
  <Artboard
    name="dropdown-v2"
    withCenterGuides={false}
    showInterface={false}
    artboardWidth={800}
    artboardHeight={600}
  >
    <Provider store={store}>{storyFn()}</Provider>
  </Artboard>
))

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
})

stories.add('Menu/Default', () => {
  const items = ItemSpec.generate(8)

  return <Dropdown items={items} />
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

stories.add('Menu/Subscribe', () => {
  const items = ItemSpec.generate(8)
  const subscribe = state => console.log(state)

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

  return <Dropdown items={items} />
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

stories.add('Menu/Custom', () => {
  const items = ItemSpec.generate(3)
  const onSelect = value => console.log(value)
  const CustomItem = props => {
    return (
      <div style={{ padding: '0px 20px', background: 'magenta' }}>
        Custom<br />
        <h5>{props.value}</h5>
      </div>
    )
  }

  const renderMenu = props => {
    const { items } = props
    return (
      <div style={{ background: 'blue', padding: 20 }}>
        <input placeholder="Input" />
        {items.map(item => <Dropdown.Item {...item} key={item.id} />)}
      </div>
    )
  }

  return (
    <Dropdown
      items={items}
      renderItem={CustomItem}
      minWidth={300}
      onSelect={onSelect}
    >
      {renderMenu}
    </Dropdown>
  )
})

stories.add('Item/Active', () => {
  const items = ItemSpec.generate(8)
  const selectedItem = items[0]

  return <Dropdown items={items} selectedItem={selectedItem} />
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

stories.add('Item/Custom', () => {
  const items = ItemSpec.generate(8)
  const onSelect = value => console.log(value)
  const CustomItem = props => {
    return (
      <div style={{ padding: '0px 20px', background: 'magenta' }}>
        Custom<br />
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
      renderTrigger={
        <Button version={2} kind="secondary">
          Dropdown
        </Button>
      }
    />
  )
})
