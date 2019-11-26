import * as React from 'react'

import * as equal from 'fast-deep-equal'

import Row from './Table.Row'
import { BodyProps, BodyState } from './Table.types'

export default class Body extends React.Component<BodyProps, BodyState> {
  state: BodyState = { rows: [] }
  columnsCache = this.getColumnsCache(this.props.columns)

  static getDerivedStateFromProps(nextProps, prevState) {
    /* istanbul ignore else */
    if (!equal(nextProps.rows, prevState.rows) || nextProps.isTableCollapsed) {
      return { rows: Body.getRows(nextProps) }
    }

    return null
  }

  static getRows(props: any = {}) {
    const { isTableCollapsed, rows, maxRowsToDisplay } = props

    if (!rows) {
      return []
    }

    return isTableCollapsed ? rows.slice(0, maxRowsToDisplay) : [...rows]
  }

  getColumnsCache(columns) {
    return columns.map(c => {
      let key = c.columnKey
      if (Array.isArray(key)) {
        key = key.join(',')
      }
      return key
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { maxRowsToDisplay, isTableCollapsed } = this.props
    const { rows } = this.state

    if (!equal(this.getColumnsCache(nextProps.columns), this.columnsCache)) {
      this.columnsCache = this.getColumnsCache(nextProps.columns)
      return true
    }

    if (
      isTableCollapsed !== nextProps.isTableCollapsed ||
      maxRowsToDisplay !== nextProps.maxRowsToDisplay
    ) {
      return true
    }

    if (!equal(rows, nextState.rows)) {
      return true
    }

    return false
  }

  render() {
    const { columns, onRowClick } = this.props
    const { rows } = this.state

    return (
      <tbody>
        {rows.map(row => (
          <Row
            row={row}
            columns={columns}
            key={`row_${row.id}`}
            onRowClick={onRowClick}
          />
        ))}
      </tbody>
    )
  }
}
