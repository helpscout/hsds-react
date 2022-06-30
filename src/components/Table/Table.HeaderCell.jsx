import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import isNil from 'lodash.isnil'
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

export default function HeaderCell({
  column,
  isLoading,
  sortedInfo,
  tableRole,
}) {
  const sorterBtnId = Array.isArray(column.columnKey)
    ? `${column.columnKey.join('_')}_${column.sortKey}_sorter`
    : `${column.columnKey}_${column.sortKey}_sorter`

  function isTableSortedByThisColumn() {
    const colKey = Array.isArray(column.columnKey)
      ? column.sortKey
      : column.columnKey

    return (
      !isNil(sortedInfo) && sortedInfo.order && sortedInfo.columnKey === colKey
    )
  }

  function getColumnSortStatus() {
    if (isTableSortedByThisColumn()) {
      return sortedInfo.order
    }

    return 'none'
  }

  function handleClick(e) {
    e.persist()

    if (!isLoading && !isNil(column.sorter)) {
      const sorterFnResult = Array.isArray(column.columnKey)
        ? column.sorter(column.sortKey)
        : column.sorter(column.columnKey)

      /**
       * If the sorter function returns a promise, we refocus the button only when
       * the event was triggered via {enter} key press.
       *
       * The check here only looks for a `then` function as we don't want
       * to run this in all cases (like it would be if we use `Promise.resolve`)
       */
      if (sorterFnResult && typeof sorterFnResult.then === 'function') {
        sorterFnResult.then(() => {
          /**
           * Refocus button only if the event was triggered with keyboard (thus avoid having to setup a separate onKeyDown event)
           *
           * https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
           *     For click or dblclick events, UIEvent.detail is the current click count.
           *     For mousedown or mouseup events, UIEvent.detail is 1 plus the current click count.
           * => For all other UIEvent objects, UIEvent.detail is always zero.
           */
          if (e.detail === 0) {
            // Due to async DOM stuff going on, get this out of the queue to make sure is the last and actually takes effect
            setTimeout(() => {
              document.getElementById(sorterBtnId).focus()
            }, 0)
          }
        })
      }
    }
  }

  function renderCellContents() {
    const withCustomContent = !isNil(column.renderHeaderCell)
    const isSortable = !isNil(column.sorter)

    if (withCustomContent && !isSortable) {
      return generateCustomHeaderCell(column, sortedInfo)
    }

    if (isSortable) {
      const columnSortStatus = getColumnSortStatus()
      const isSorted = isTableSortedByThisColumn()

      return (
        <SortableCellUI
          align={column.align}
          className={classNames(
            `${TABLE_CLASSNAME}__SortableHeaderCell`,
            columnSortStatus !== 'none' && 'sorted'
          )}
        >
          <SortableCellContentUI
            aria-label={
              isSorted &&
              tableRole !== 'table' &&
              `Sorted by ${sortedInfo.columnKey} ${columnSortStatus}`
            }
            align={column.align}
            className={`${TABLE_CLASSNAME}__SortableHeaderCell__title`}
            onClick={handleClick}
            id={sorterBtnId}
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
      aria-sort={tableRole === 'table' ? getColumnSortStatus() : null}
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
