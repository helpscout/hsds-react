import React from 'react'
import styled from '../../src/components/styled'
import { storiesOf } from '@storybook/react'
import { createFakeCustomers } from './utils'

import Heading from '../../src/components/Heading'
import PreviewCard from '../../src/components/PreviewCard'
import Ellipsified from '../../src/components/Ellipsified/Ellipsified'
import Table from '../../src/components/Table/Table'
import TablePlayground from './TablePlayground'
import TableWithPagination from './TableWithPagination'
import TableWithSorting from './TableWithSorting'

import {
  defaultTheme,
  alternativeTheme,
} from '../../src/components/Table/styles/themes'

const stories = storiesOf('Table', module)

const defaultColumns = [
  {
    title: 'Name',
    columnKey: 'name',
    width: '25%',
  },
  {
    title: 'Company',
    columnKey: 'companyName',
    width: '25%',
  },
  {
    title: 'Email',
    columnKey: 'emails',
    width: '25%',
    renderCell: email => <Ellipsified lines={1} text={email} />,
  },
  {
    title: 'Last Seen',
    columnKey: 'lastSeen',
    width: '25%',
  },
]

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

const columsnWithCustomNameCell = [
  {
    title: 'Name',
    columnKey: 'name',
    width: '25%',
    renderCell: name => <Ellipsified text={name} lines={2} lineHeight={16} />,
  },
  {
    title: 'Company',
    columnKey: 'companyName',
    width: '25%',
  },
  {
    title: 'Email',
    columnKey: 'emails',
    width: '25%',
    renderCell: email => <Ellipsified lines={1} text={email} />,
  },
  {
    title: 'Last Seen',
    columnKey: 'lastSeen',
    width: '25%',
  },
]

stories.add('with long names', () => (
  <div>
    <PreviewCard style={{ marginBottom: '20px' }}>
      <p>
        The <strong>name</strong> column is "Ellipsified" to 2 lines
      </p>
      <p>
        The <strong>email</strong> column is "Ellipsified" to 1 line
      </p>
    </PreviewCard>
    <Table
      columns={columsnWithCustomNameCell}
      data={createFakeCustomers({ amount: 10, longNames: true })}
      tableWidth={{ max: '800px', min: '500px' }}
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

const compoundColumns = [
  {
    title: 'Customer',
    columnKey: ['name', 'companyName'],
    width: '40%',
    renderCell: ({ name, companyName }) => {
      return (
        <div>
          <strong>{name}</strong>
          <br />
          <span>{companyName}</span>
        </div>
      )
    },
  },
  {
    title: 'Email',
    columnKey: 'emails',
    width: '35%',
    renderCell: email => <Ellipsified lines={1} text={email} />,
  },
  {
    title: 'Last Seen',
    columnKey: 'lastSeen',
    width: '25%',
  },
]

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
stories.add('playground', () => <TablePlayground />)
