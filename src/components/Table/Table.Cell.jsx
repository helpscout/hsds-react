import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import Truncate from '../Truncate'
import { CellUI } from './Table.css'
import { TABLE_CLASSNAME } from './Table'
import { columnShape, dataShape } from './Table.utils'

export default class TableCell extends React.PureComponent {
  getCompoundColumnCellData = () => {
    const { column, row } = this.props
    const cellData = {}

    for (const colKey of column.columnKey) {
      cellData[colKey.replaceAll('.', '_')] = get(row, colKey)
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
    return Object.values(cellData).map(d => <div key={d.slice(4)}>{d}</div>)
  }

  renderSingleColumnCell = () => {
    const { column, row } = this.props
    const cellContent = get(row, column.columnKey)

    return (
      <CellUI align={column.align} className={`${TABLE_CLASSNAME}__Cell`}>
        {column.renderCell ? (
          column.renderCell({
            [column.columnKey]: cellContent,
          })
        ) : (
          <Truncate>{cellContent}</Truncate>
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

TableCell.propTypes = {
  column: PropTypes.shape(columnShape),
  row: PropTypes.shape(dataShape),
}
