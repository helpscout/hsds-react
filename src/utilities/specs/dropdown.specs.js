import { createSpec, faker } from '@helpscout/helix'

export const ItemSpec = createSpec({
  id: faker.datatype.uuid(),
  value: faker.company.companyName(),
  label: faker.name.firstName(),
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

export const groupAndDividerItems = [
  {
    items: [
      {
        label: '0001',
        value: '0001',
      },
      {
        label: '0002',
        value: '0002',
      },
    ],
    label: 'Group 1',
    value: 'thing',
    type: 'group',
  },
  {
    type: 'divider',
  },
  {
    label: '0004',
    value: '0004',
  },
  {
    label: '0005',
    value: '0005',
  },
  {
    type: 'divider',
  },
  {
    items: [
      {
        label: '0008',
        value: '0008',
      },
      {
        label: '0009',
        value: '0009',
      },
      {
        label: '0010 is disabled',
        value: '0010',
        isDisabled: true,
      },
    ],
    label: 'Group 2',
    type: 'group',
    value: 'thing2',
  },
]

export const regularItems = ItemSpec.generate(15)

export const disabledItems = ItemSpec.generate(10).map((item, index) => {
  if (index % 2 === 0) {
    item.isDisabled = true
  }

  return item
})

export const plainItems = [
  'hello',
  'hola',
  'goodbye',
  'adios',
  'alo',
  'arrivederci',
  'gutten tag',
]
