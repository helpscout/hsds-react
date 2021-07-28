import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { generateCellKey, columnShape, dataShape } from './Table.utils'
import { TABLE_CLASSNAME } from './Table'
import TableCell from './Table.Cell'

export default class TableRow extends React.PureComponent {
  handleRowClick = e => {
    const { row, onRowClick } = this.props
    onRowClick && onRowClick(e, row)
  }

  render() {
    const { row, columns } = this.props

    return (
      <tr
        className={classNames(`${TABLE_CLASSNAME}__Row`, row.className)}
        onClick={this.handleRowClick}
      >
        {columns.map(column => (
          <TableCell
            column={column}
            row={row}
            key={generateCellKey('cell', column)}
          />
        ))}
      </tr>
    )
  }
}

TableRow.propTypes = {
  /** List of columns */
  columns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  /** Object with data for this particular row */
  row: PropTypes.shape(dataShape),
  /** Callback function when the row is clicked. Arguments are the event and the row clicked. */
  onRowClick: PropTypes.func,
}
