import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import isPlainObject from 'lodash.isplainobject'
import Truncate from '../Truncate'
import { CellUI } from './Table.css'
import { columnShape, dataShape, generateCellClassNames } from './Table.utils'
import isFunction from 'lodash.isfunction'

export function TableCell({ column, row }) {
  const cellClassNames = generateCellClassNames(column)

  function getCompoundColumnCellData() {
    const cellData = {}

    for (const colKey of column.columnKey) {
      cellData[colKey.replace(/\./g, '_')] = get(row, colKey)
    }

    return { ...cellData, row }
  }

  function renderCompoundColumnsCell() {
    const cellData = getCompoundColumnCellData()

    return (
      <CellUI align={column.align} className={cellClassNames}>
        {column.renderCell
          ? column.renderCell(cellData)
          : renderCompoundColumnCellDefaultMarkup(cellData)}
      </CellUI>
    )
  }

  function renderCompoundColumnCellDefaultMarkup(cellData) {
    const { row, ...rest } = cellData

    return Object.values(rest).map(d => (
      <div key={isPlainObject(d) ? Object.values(d)[0].slice(4) : d.slice(4)}>
        {d}
      </div>
    ))
  }

  function renderSingleColumnCell() {
    const cellContent = get(row, column.columnKey)
    const { renderCell } = column
    let cellMarkup = <Truncate>{cellContent}</Truncate>

    if (isFunction(renderCell)) {
      cellMarkup = renderCell({
        [column.columnKey]: cellContent,
        row,
      })
    }

    return (
      <CellUI align={column.align} className={cellClassNames}>
        {cellMarkup}
      </CellUI>
    )
  }

  return Array.isArray(column.columnKey)
    ? renderCompoundColumnsCell()
    : renderSingleColumnCell()
}

TableCell.propTypes = {
  column: PropTypes.shape(columnShape),
  row: PropTypes.shape(dataShape),
}

export default TableCell
