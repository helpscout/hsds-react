import { createSpec, faker } from '@helpscout/helix'

export const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
  // onClick: () => (value, props) => console.log('Clicked!', value),
})

export const itemsWithDivider = ItemSpec.generate(8).map((item, index) => {
  if (index !== 2) return item
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

export const simpleGroupedItems = [
  {
    items: ItemSpec.generate(3),
    label: 'Group 1',
    value: 'thing',
    type: 'group',
  },
  {
    items: ItemSpec.generate(5),
    label: 'Group 2',
    type: 'group',
    value: 'thing2',
  },
]

export const regularItems = ItemSpec.generate(15)

export const plainItems = [
  'hello',
  'hola',
  'goodbye',
  'adios',
  'alo',
  'arrivederci',
  'gutten tag',
]
