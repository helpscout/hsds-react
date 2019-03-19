import React from 'react'

import Cell from './Cell'
import { generateCellKey, TABLE_CLASSNAME } from './Table'

function Row({ row, columns, onRowClick }) {
  return (
    <tr className={`${TABLE_CLASSNAME}__Row`} onClick={handleRowClick}>
      {columns.map(column => (
        <Cell column={column} row={row} key={generateCellKey('cell', column)} />
      ))}
    </tr>
  )

  function handleRowClick(event) {
    onRowClick && onRowClick(row, event)
  }
}

export default Row
