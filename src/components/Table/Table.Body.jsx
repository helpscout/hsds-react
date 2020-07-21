import React from 'react'
import PropTypes from 'prop-types'
import equal from 'fast-deep-equal'
import Row from './Table.Row'
import { columnShape, dataShape } from './Table.utils'

export default class TableBody extends React.Component {
  state = { rows: [] }
  columnsCache = this.getColumnsCache(this.props.columns)

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!equal(nextProps.rows, prevState.rows) || nextProps.isTableCollapsed) {
      return { rows: TableBody.getRows(nextProps) }
    }

    return null
  }

  static getRows(props = {}) {
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
    const { columns, onRowClick, 'data-cy': dataCy } = this.props
    const { rows } = this.state

    return (
      <tbody data-cy={dataCy}>
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

TableBody.defaultProps = {
  'data-cy': 'TableBody',
}

TableBody.propTypes = {
  /** List of columns */
  columns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  /** Whether the table is currently expanded/collapsed */
  isTableCollapsed: PropTypes.bool,
  /** When provided the Table will only show this number of rows and and expander to see the rest */
  maxRowsToDisplay: PropTypes.number,
  /** List of Rows (data), which are objects */
  rows: PropTypes.arrayOf(PropTypes.shape(dataShape)),
  /** Callback function when a row is clicked. Arguments are the event and the row clicked. */
  onRowClick: PropTypes.func,
}
