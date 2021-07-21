import PropTypes from 'prop-types'
import _ from 'lodash'
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
        ? column.columnKey.join('_').replaceAll('.', '_')
        : column.columnKey.replaceAll('.', '_')
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

export function difference(object, base) {
  function changes(object, base) {
    return _.transform(object, function (result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value
      }
    })
  }
  return changes(object, base)
}

export function reducer(state, action) {
  const { type, payload } = action

  switch (type) {
    case 'updated-data':
      return {
        ...state,
        currentTableData: getDisplayTableData(payload),
      }

    case 'expand':
    case 'collapse':
      return {
        ...state,
        currentTableData: getDisplayTableData(payload),
      }

    case 'select-all':
      return {
        ...state,
        selectedRows: payload.data.map(d => d.id),
      }

    case 'deselect-all':
      return {
        ...state,
        selectedRows: [],
      }

    case 'select-row':
      return {
        ...state,
        selectedRows: state.selectedRows.concat(payload.value),
      }

    case 'deselect-row':
      return {
        ...state,
        selectedRows: state.selectedRows.filter(row => row !== payload.value),
      }

    //   return { selectedRows }
    // case 'add':
    //   return {count: state.count - 1};
    // case 'remove':
    //   return {count: state.count - 1};
    default:
      return state
  }
}
