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
import { Table } from '../../src/index.js'
import TablePlayground from './TablePlayground'
import TableWithPagination from './TableWithPagination'
import TableWithSorting from './TableWithSorting'

import {
  defaultTheme,
  alternativeTheme,
} from '../../src/components/Table/styles/themes'

const stories = storiesOf('Table', module)

stories.add('default', () => (
  <div>
    <PreviewCard style={{ marginBottom: '20px' }}>
      <Heading size="h4">Default theme</Heading>
      <pre>
        <code>theme = 'default' || undefined</code>
      </pre>
      <pre>
        <code>{JSON.stringify(defaultTheme, null, 2)}</code>
      </pre>
    </PreviewCard>
    <Table
      columns={defaultColumns}
      data={createFakeCustomers({ amount: 10 })}
    />
  </div>
))

stories.add('alternative theme (built in)', () => (
  <div>
    <PreviewCard style={{ marginBottom: '20px' }}>
      <Heading size="h4">Alternative theme</Heading>
      <pre>
        <code>theme = 'alternative'</code>
      </pre>
      <pre>
        <code>{JSON.stringify(alternativeTheme, null, 2)}</code>
      </pre>
    </PreviewCard>
    <Table
      columns={defaultColumns}
      data={createFakeCustomers({ amount: 10 })}
      theme="alternative"
    />
  </div>
))

const purpleTheme = {
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

stories.add('with custom theme', () => (
  <div>
    <PreviewCard style={{ marginBottom: '20px' }}>
      <Heading size="h4">Custom theme</Heading>
      <pre>
        <code>theme = </code>
        <code>{JSON.stringify(purpleTheme, null, 2)}</code>
      </pre>
    </PreviewCard>
    <Table
      columns={defaultColumns}
      data={createFakeCustomers({ amount: 10 })}
      theme={purpleTheme}
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
