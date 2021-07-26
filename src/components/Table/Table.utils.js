import PropTypes from 'prop-types'
import classNames from 'classnames'
import { createUniqueIDFactory } from '../../utilities/id'
import { TABLE_CLASSNAME } from './Table'

const uniqueCellKeyFactory = createUniqueIDFactory('Cell')

export const columnShape = {
  title: PropTypes.string,
  columnKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  width: PropTypes.string,
  align: PropTypes.string,
  renderCell: PropTypes.func,
  renderHeaderCell: PropTypes.func,
  sortKey: PropTypes.string,
  sorter: PropTypes.func,
}

export const dataShape = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  key: PropTypes.any,
}

export function generateCellKey(element, column) {
  return Array.isArray(column.columnKey)
    ? `${uniqueCellKeyFactory(element)}_${
        column.sortKey
      }_${column.columnKey.join('_')}`
    : `${uniqueCellKeyFactory(element)}_${column.columnKey}`
}

export function generateCellClassNames(column, cellType = 'Cell') {
  return classNames(
    `${TABLE_CLASSNAME}__${cellType}`,
    `Column_${
      column.title
        ? column.title.replace(/[ .]/g, '')
        : Array.isArray(column.columnKey)
        ? column.columnKey.join('_').replace(/\./g, '_')
        : column.columnKey.replace(/\./g, '_')
    }`,
    column.className || ''
  )
}

export function getDisplayTableData({ data, rowsToDisplay }) {
  if (rowsToDisplay != null && rowsToDisplay < data.length) {
    return data.slice(0, rowsToDisplay)
  }

  return data
}
