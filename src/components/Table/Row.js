import React from 'react'

import Cell from './Cell'
import { generateCellKey } from './Table'

function Row({ row, columns }) {
  return (
    <tr>
      {columns.map(column => (
        <Cell column={column} row={row} key={generateCellKey('cell', column)} />
      ))}
    </tr>
  )
}

export default Row
