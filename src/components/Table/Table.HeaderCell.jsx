import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../Icon'
import {
  SortableCellUI,
  SortableCellContentUI,
  HeaderCellUI,
} from './Table.css'
import { TABLE_CLASSNAME } from './Table'
import {
  columnShape,
  generateCellClassNames,
  generateCustomHeaderCell,
} from './Table.utils'

export default function HeaderCell({ column, isLoading, sortedInfo }) {
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
    const withCustomContent = column.renderHeaderCell != null
    const isSortable = column.sorter != null

    if (withCustomContent && !isSortable) {
      return generateCustomHeaderCell(column, sortedInfo)
    }

    if (isSortable) {
      const columnSortStatus = getColumnSortStatus()

      return (
        <SortableCellUI
          align={column.align}
          className={classNames(
            `${TABLE_CLASSNAME}__SortableHeaderCell`,
            columnSortStatus !== 'none' && 'sorted'
          )}
        >
          <SortableCellContentUI
            align={column.align}
            className={`${TABLE_CLASSNAME}__SortableHeaderCell__title`}
            onClick={handleClick}
            tabIndex="0"
          >
            {withCustomContent ? (
              generateCustomHeaderCell(column, sortedInfo)
            ) : (
              <span>{column.title}</span>
            )}
            {columnSortStatus !== 'none' ? (
              <Icon
                name={
                  columnSortStatus === 'descending' ? 'caret-down' : 'caret-up'
                }
                size={13}
              />
            ) : null}
          </SortableCellContentUI>
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
  /** Whether tha table is in the loading state */
  isLoading: PropTypes.bool,
  /** When sortable, indicates which column tha table is sorted by, and in which order (ascending or descending) */
  sortedInfo: PropTypes.shape({
    columnKey: PropTypes.string,
    order: PropTypes.string,
  }),
}
