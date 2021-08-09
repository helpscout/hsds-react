import React from 'react'
import PropTypes from 'prop-types'
import equal from 'fast-deep-equal'
import get from 'lodash.get'
import { isObject } from '../../utilities/is'
import Truncate from '../Truncate'
import { CellUI } from './Table.css'
import { columnShape, dataShape, generateCellClassNames } from './Table.utils'

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
      <div key={isObject(d) ? Object.values(d)[0].slice(4) : d.slice(4)}>
        {d}
      </div>
    ))
  }

  function renderSingleColumnCell() {
    const cellContent = get(row, column.columnKey)

    return (
      <CellUI align={column.align} className={cellClassNames}>
        {column.renderCell ? (
          column.renderCell({
            [column.columnKey]: cellContent,
            row,
          })
        ) : (
          <Truncate>{cellContent}</Truncate>
        )}
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

function areEqual(prevProps, nextProps) {
  if (equal(prevProps, nextProps)) {
    return true
  }

  return false
}

export default React.memo(TableCell, areEqual)
