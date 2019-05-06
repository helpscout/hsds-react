import * as React from 'react'

import Truncate from '../Truncate/index'
import { CellUI } from './styles/Table.css'
import { TABLE_CLASSNAME } from './Table'

import { CellProps } from './Table.types'

export default class Cell extends React.PureComponent<CellProps> {
  getCompoundColumnCellData = () => {
    const { column, row } = this.props
    const cellData = {}

    for (const colKey of column.columnKey) {
      cellData[colKey] = row[colKey]
    }

    return cellData
  }

  renderCompoundColumnsCell = () => {
    const { column } = this.props
    const cellData = this.getCompoundColumnCellData()

    return (
      <CellUI align={column.align} className={`${TABLE_CLASSNAME}__Cell`}>
        {column.renderCell
          ? column.renderCell(cellData)
          : this.renderCompoundColumnCellDefaultMarkup(cellData)}
      </CellUI>
    )
  }

  renderCompoundColumnCellDefaultMarkup = cellData => {
    return (Object as any)
      .values(cellData)
      .map(d => <div key={d.slice(4)}>{d}</div>)
  }

  renderSingleColumnCell = () => {
    const { column, row } = this.props

    return (
      <CellUI align={column.align} className={`${TABLE_CLASSNAME}__Cell`}>
        {column.renderCell ? (
          column.renderCell({
            [column.columnKey as any]: row[column.columnKey as any],
          })
        ) : (
          <Truncate>{row[column.columnKey as any]}</Truncate>
        )}
      </CellUI>
    )
  }

  render() {
    const { column } = this.props

    return Array.isArray(column.columnKey)
      ? this.renderCompoundColumnsCell()
      : this.renderSingleColumnCell()
  }
}
