import React from 'react'

import { CellUI } from './styles/Table.css'

function Cell({ column, row }) {
  if (Array.isArray(column.columnKey)) {
    const cellData = {}

    for (const colKey of column.columnKey) {
      cellData[colKey] = row[colKey]
    }

    return (
      <CellUI align={column.align}>
        {column.renderCell
          ? column.renderCell(cellData)
          : Object.values(cellData).map(data => (
              <div key={data.slice(4)}>{data}</div>
            ))}
      </CellUI>
    )
  }

  return (
    <CellUI align={column.align}>
      {column.renderCell
        ? column.renderCell(row[column.columnKey])
        : row[column.columnKey]}
    </CellUI>
  )
}

export default Cell
