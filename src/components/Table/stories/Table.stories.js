import React from 'react'
import {
  createFakeCustomers,
  defaultColumns,
  compoundColumns,
} from '../Table.testUtils'
import Table from '../'
import TableWithPagination from './TableWithPagination'
import TableWithSorting from './TableWithSorting'

export default {
  component: Table,
  title: 'Components/Structural/Table',
}

export const Default = () => <TableWithPagination />

Default.story = {
  name: 'default',
}

export const WithCompoundColumns = () => (
  <Table columns={compoundColumns} data={createFakeCustomers({ amount: 10 })} />
)

WithCompoundColumns.story = {
  name: 'with compound columns',
}

export const WithSorting = () => <TableWithSorting />

WithSorting.story = {
  name: 'with sorting',
}

export const Expandable = () => (
  <Table
    columns={defaultColumns}
    data={createFakeCustomers({ amount: 10 })}
    maxRowsToDisplay={4}
  />
)

Expandable.story = {
  name: 'expandable',
}
