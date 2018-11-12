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

stories.add('Item/Default', () => {
  return <Dropdown.Item>Item</Dropdown.Item>
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
