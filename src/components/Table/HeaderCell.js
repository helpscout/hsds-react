import React from 'react'

import Icon from '../Icon'
import { SortableCellUI, HeaderCellUI } from './styles/Table.css'

function HeaderCell({ column, isLoading, sortedInfo }) {
  function renderCellContents() {
    if (column.renderHeaderCell) {
      return column.renderHeaderCell(column, { sortedInfo })
    }

    if (column.sorter) {
      const colKey = Array.isArray(column.columnKey)
        ? column.sortKey
        : column.columnKey

      return (
        <SortableCellUI align={column.align}>
          <span className="SortableCell_title">{column.title}</span>
          {sortedInfo.columnKey === colKey &&
            sortedInfo.order && (
              <Icon
                name={
                  sortedInfo.order === 'descending' ? 'caret-down' : 'caret-up'
                }
              />
            )}
        </SortableCellUI>
      )
    }

    return column.title
  }

  return (
    <HeaderCellUI
      align={column.align}
      cellWidth={column.width}
      aria-sort={
        sortedInfo.columnKey === column.columnKey && sortedInfo.order
          ? sortedInfo.order
          : 'none'
      }
      onClick={() => {
        if (!isLoading && column.sorter != null) {
          Array.isArray(column.columnKey)
            ? column.sorter(column.sortKey)
            : column.sorter(column.columnKey)
        }
      }}
    >
      {renderCellContents()}
    </HeaderCellUI>
  )
}

export default HeaderCell
