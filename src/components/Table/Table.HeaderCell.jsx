import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import { SortableCellUI, HeaderCellUI } from './Table.css'
import { TABLE_CLASSNAME } from './Table'
import { columnShape, generateCellClassNames } from './Table.utils'

export default function HeaderCell({ column, columns, isLoading, sortedInfo }) {
  function getColumnSortStatus() {
    const colKey = Array.isArray(column.columnKey)
      ? column.sortKey
      : column.columnKey

    const isTableSortedByThisColumn =
      sortedInfo != null && sortedInfo.order && sortedInfo.columnKey === colKey

    if (isTableSortedByThisColumn) {
      return sortedInfo.order
    }

    return 'none'
  }

  function handleClick() {
    if (!isLoading && column.sorter != null) {
      Array.isArray(column.columnKey)
        ? column.sorter(column.sortKey)
        : column.sorter(column.columnKey)
    }
  }

  function renderCellContents() {
    if (column.renderHeaderCell) {
      return column.renderHeaderCell(column, sortedInfo)
    }

    if (column.sorter) {
      const columnSortStatus = getColumnSortStatus()

      return (
        <SortableCellUI
          align={column.align}
          className={`${TABLE_CLASSNAME}__SortableHeaderCell`}
          onClick={handleClick}
        >
          <span className={`${TABLE_CLASSNAME}__SortableHeaderCell__title`}>
            {column.title}
          </span>
          {columnSortStatus !== 'none' ? (
            <Icon
              name={
                columnSortStatus === 'descending' ? 'caret-down' : 'caret-up'
              }
            />
          ) : null}
        </SortableCellUI>
      )
    }

    return column.title
  }

  return (
    <HeaderCellUI
      className={generateCellClassNames(column, 'HeaderCell')}
      align={column.align}
      cellWidth={column.width}
      aria-sort={getColumnSortStatus()}
    >
      {renderCellContents()}
    </HeaderCellUI>
  )
}

HeaderCell.propTypes = {
  /** The column */
  column: PropTypes.shape(columnShape),
  /** List of all columns */
  columns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  /** Whether tha table is in the loading state */
  isLoading: PropTypes.bool,
  /** When sortable, indicates which column tha table is sorted by, and in which order (ascending or descending) */
  sortedInfo: PropTypes.shape({
    columnKey: PropTypes.string,
    order: PropTypes.string,
  }),
}
