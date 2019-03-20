import * as React from 'react'

import { CellUI } from './styles/Table.css'
import { TABLE_CLASSNAME } from './Table'

import { CellProps } from './types'

export default class Cell extends React.PureComponent<CellProps> {
  render() {
    const { column, row } = this.props

    if (Array.isArray(column.columnKey)) {
      const cellData = {}

      for (const colKey of column.columnKey) {
        cellData[colKey] = row[colKey]
      }

      return (
        <CellUI align={column.align} className={`${TABLE_CLASSNAME}__Cell`}>
          {column.renderCell
            ? column.renderCell(cellData)
            : (Object as any)
                .values(cellData)
                .map(d => <div key={d.slice(4)}>{d}</div>)}
        </CellUI>
      )
    }

    return (
      <CellUI align={column.align} className={`${TABLE_CLASSNAME}__Cell`}>
        {column.renderCell
          ? column.renderCell(row[column.columnKey])
          : row[column.columnKey]}
      </CellUI>
    )
  }
}
