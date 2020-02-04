import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import {
  createFakeCustomers,
  defaultColumns,
  compoundColumns,
} from '../Table.testUtils'
import Heading from '../../Heading'
import PreviewCard from '../../PreviewCard'
import { Table } from '../../../index'
import TableWithPagination from './TableWithPagination'
import TableWithSorting from './TableWithSorting'
import { defaultSkin, alternativeSkin } from '../Table.skins'

const stories = storiesOf('Components/Table', module)

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
    />
  </div>
))

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

// stories.add('with row click', () => (
//   <Table
//     columns={defaultColumns}
//     data={createFakeCustomers({ amount: 10 })}
//     onRowClick={action('click')}
//   />
// ))

stories.add('expandable', () => (
  <div>
    <Heading size="h4" style={{ marginBottom: '20px' }}>
      Default expander text
    </Heading>
    <Table
      columns={defaultColumns}
      data={createFakeCustomers({ amount: 10 })}
      maxRowsToDisplay={4}
      style={{ marginBottom: '40px' }}
    />
    <Heading size="h4" style={{ marginBottom: '20px' }}>
      Custom expander text
    </Heading>
    <Table
      columns={defaultColumns}
      data={createFakeCustomers({ amount: 10 })}
      maxRowsToDisplay={4}
      expanderText={{
        collapsed: 'Show me all',
        expanded: 'Show me the top 4',
      }}
    />
  </div>
))
