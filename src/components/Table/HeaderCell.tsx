import * as React from 'react'

import Icon from '../Icon'
import { SortableCellUI, HeaderCellUI } from './styles/Table.css'
import { TABLE_CLASSNAME } from './Table'

import { HeaderCellProps } from './types'

export default class HeaderCell extends React.PureComponent<HeaderCellProps> {
  render() {
    const { column, isLoading, sortedInfo } = this.props

    return (
      <HeaderCellUI
        className={`${TABLE_CLASSNAME}__HeaderCell`}
        align={column.align}
        cellWidth={column.width}
        aria-sort={
          sortedInfo &&
          sortedInfo.columnKey === column.columnKey &&
          sortedInfo.order
            ? sortedInfo.order
            : 'none'
        }
        onClick={() => {
          /* istanbul ignore else */
          if (!isLoading && column.sorter != null) {
            Array.isArray(column.columnKey)
              ? column.sorter(column.sortKey)
              : column.sorter(column.columnKey)
          }
        }}
      >
        {this.renderCellContents()}
      </HeaderCellUI>
    )
  }

  renderCellContents = () => {
    const { column, sortedInfo } = this.props

    if (column.renderHeaderCell) {
      return column.renderHeaderCell(column, { sortedInfo })
    }

    if (column.sorter) {
      const colKey = Array.isArray(column.columnKey)
        ? column.sortKey
        : column.columnKey

      return (
        <SortableCellUI
          align={column.align}
          className={`${TABLE_CLASSNAME}__SortableHeaderCell`}
        >
          <span className={`${TABLE_CLASSNAME}__SortableHeaderCell__title`}>
            {column.title}
          </span>
          {sortedInfo &&
            sortedInfo.columnKey === colKey &&
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
}
