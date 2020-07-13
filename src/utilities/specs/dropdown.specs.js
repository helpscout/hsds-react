import { createSpec, faker } from '@helpscout/helix'

export const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
  onClick: () => (value, props) => console.log('Clicked!', value),
})

export const itemsWithDivider = ItemSpec.generate(8).map((item, index) => {
  if (index !== 5) return item
  return {
    type: 'divider',
  }
})

export const groupedItems = [
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
