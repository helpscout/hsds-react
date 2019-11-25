import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  createFakeCustomers,
  defaultColumns,
  columsnWithCustomNameCell,
  columsnWithCustomHeaderNameCell,
  compoundColumns,
} from '../../src/components/Table/__tests__/utils'

import Heading from '../../src/components/Heading'
import PreviewCard from '../../src/components/PreviewCard'
import { Table } from '../../src/index'
import TablePlayground from './TablePlayground'
import TableWithPagination from './TableWithPagination'
import TableWithSorting from './TableWithSorting'

import {
  defaultSkin,
  alternativeSkin,
} from '../../src/components/Table/styles/skins'

import styled from '../../src/components/styled'

const stories = storiesOf('Table', module)

export const ContainerUI = styled('div')`
  table {
    tr.active td {
      background-color: lightsteelblue;
    }
    tr.stale td {
      background-color: lavenderblush;
    }
  }
`

stories.add('default', () => (
  <div>
    <PreviewCard style={{ marginBottom: '20px' }}>
      <Heading size="h4">Default skin</Heading>
      <pre>
        <code>skin = 'default' || undefined</code>
      </pre>
      <pre>
        <code>{JSON.stringify(defaultSkin, null, 2)}</code>
      </pre>
    </PreviewCard>
    <Table
      columns={defaultColumns}
      data={createFakeCustomers({ amount: 10 })}
    />
  </div>
))

const TableUI = styled(Table)``

stories.add('alternative skin (built in)', () => (
  <div>
    <PreviewCard style={{ marginBottom: '20px' }}>
      <Heading size="h4">Alternative skin</Heading>
      <pre>
        <code>skin = 'alternative'</code>
      </pre>
      <pre>
        <code>{JSON.stringify(alternativeSkin, null, 2)}</code>
      </pre>
    </PreviewCard>
    <TableUI
      skin="alternative"
      columns={defaultColumns}
      data={createFakeCustomers({ amount: 10 })}
      skin="alternative"
    />
  </div>
))

const purpleSkin = {
  fontColorHeader: 'rebeccapurple',
  fontColorBody: 'rebeccapurple',
  fontColorAlternate: 'plum',
  bgHeader: 'gold',
  bgColor: 'plum',
  bgAlternate: 'rebeccapurple',
  borderTableBody: '1px solid blueviolet',
  borderTableHeader: '1px solid blueviolet',
  borderRows: '1px solid blueviolet',
  borderColumns: '1px solid blueviolet',
}

stories.add('with custom skin', () => (
  <div>
    <PreviewCard style={{ marginBottom: '20px' }}>
      <Heading size="h4">Custom skin</Heading>
      <pre>
        <code>skin = </code>
        <code>{JSON.stringify(purpleSkin, null, 2)}</code>
      </pre>
    </PreviewCard>
    <Table
      columns={defaultColumns}
      data={createFakeCustomers({ amount: 10 })}
      skin={purpleSkin}
    />
  </div>
))

stories.add('with custom header cell render', () => (
  <Table
    columns={columsnWithCustomHeaderNameCell}
    data={createFakeCustomers({ amount: 5 })}
  />
))

stories.add('with custom cell rendering', () => (
  <Table
    columns={columsnWithCustomNameCell}
    data={createFakeCustomers({ amount: 10, longNames: true })}
    tableWidth={{ max: '800px', min: '500px' }}
  />
))

stories.add('with className provided to row for styling', () => {
  const customers = createFakeCustomers({ amount: 10 }).map(info => {
    const className = info.days < 50 ? 'active' : 'stale'
    return { ...info, ...{ className } }
  })

  return (
    <ContainerUI>
      <Table columns={defaultColumns} data={customers} />
    </ContainerUI>
  )
})

stories.add('with horizontal scroll', () => (
  <Table
    columns={defaultColumns}
    data={createFakeCustomers({ amount: 10 })}
    containerWidth="500px"
  />
))

stories.add('with pagination', () => <TableWithPagination />)

stories.add('with compound columns', () => (
  <div>
    <PreviewCard style={{ marginBottom: '20px' }}>
      <Heading size="h4">Columns:</Heading>
      <pre>
        <code>
          {JSON.stringify(
            compoundColumns,
            function(key, val) {
              if (typeof val === 'function') {
                let str = `${val}`
                let braceIndex = str.indexOf('{')
                return `${str.slice(0, braceIndex + 1)} ... }`
              }
              return val
            },
            2
          )}
        </code>
      </pre>
    </PreviewCard>
    <Table
      columns={compoundColumns}
      data={createFakeCustomers({ amount: 10 })}
    />
  </div>
))

stories.add('with sorting', () => <TableWithSorting />)

stories.add('with row click', () => (
  <Table
    columns={defaultColumns}
    data={createFakeCustomers({ amount: 10 })}
    onRowClick={action('click')}
  />
))

stories.add('expandable', () => (
  <Table
    columns={defaultColumns}
    data={createFakeCustomers({ amount: 10 })}
    maxRowsToDisplay={4}
  />
))

stories.add('playground', () => <TablePlayground />)
