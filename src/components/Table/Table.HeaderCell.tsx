import * as React from 'react'

import Icon from '../Icon'
import { SortableCellUI, HeaderCellUI } from './styles/Table.css'
import { TABLE_CLASSNAME } from './Table'

import { HeaderCellProps } from './Table.types'

export default class HeaderCell extends React.PureComponent<HeaderCellProps> {
  getColumnSortStatus = () => {
    const { column, sortedInfo } = this.props
    const colKey = Array.isArray(column.columnKey)
      ? column.sortKey
      : column.columnKey

    const isTableSortedByThisColumn =
      sortedInfo != null && sortedInfo.order && sortedInfo.columnKey === colKey

    if (isTableSortedByThisColumn) {
      // @ts-ignore
      // TS complains that sortedInfo could be undefined, but given the conditional above, it can't
      return sortedInfo.order
    }

    return 'none'
  }

  handleClick = () => {
    const { column, isLoading } = this.props
    /* istanbul ignore else */
    if (!isLoading && column.sorter != null) {
      Array.isArray(column.columnKey)
        ? column.sorter(column.sortKey)
        : column.sorter(column.columnKey)
    }
  }

  renderCellContents = () => {
    const { column, sortedInfo } = this.props

    if (column.renderHeaderCell) {
      return column.renderHeaderCell(column, sortedInfo)
    }

    if (column.sorter) {
      const columnSortStatus = this.getColumnSortStatus()

      return (
        <SortableCellUI
          align={column.align}
          className={`${TABLE_CLASSNAME}__SortableHeaderCell`}
          onClick={this.handleClick}
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

  render() {
    const { column } = this.props

    return (
      <HeaderCellUI
        className={`${TABLE_CLASSNAME}__HeaderCell`}
        align={column.align}
        cellWidth={column.width}
        aria-sort={this.getColumnSortStatus()}
      >
        {this.renderCellContents()}
      </HeaderCellUI>
    )
  }
}
