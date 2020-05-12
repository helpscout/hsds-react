import PropTypes from 'prop-types'
import { createUniqueIDFactory } from '../../utilities/id'

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
