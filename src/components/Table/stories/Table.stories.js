import React from 'react'
import styled from 'styled-components'
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

export default {
  component: Table,
  title: 'Components/Structural/Table',
  excludeStories: ['ContainerUI'],
}

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

export const Default = () => (
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
)

Default.story = {
  name: 'default',
}

const TableUI = styled(Table)``

export const AlternativeSkinBuiltIn = () => (
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
)

AlternativeSkinBuiltIn.story = {
  name: 'alternative skin (built in)',
}

export const WithHorizontalScroll = () => (
  <Table
    columns={defaultColumns}
    data={createFakeCustomers({ amount: 10 })}
    containerWidth="500px"
  />
)

WithHorizontalScroll.story = {
  name: 'with horizontal scroll',
}

export const WithPagination = () => <TableWithPagination />

WithPagination.story = {
  name: 'with pagination',
}

export const WithCompoundColumns = () => (
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
)

WithCompoundColumns.story = {
  name: 'with compound columns',
}

export const WithSorting = () => <TableWithSorting />

WithSorting.story = {
  name: 'with sorting',
}

export const Expandable = () => (
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
)

Expandable.story = {
  name: 'expandable',
}
