import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { generateCellKey } from './Table.utils'
import { TABLE_CLASSNAME, columnShape, dataShape } from './Table'
import Cell from './Table.Cell'

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
          <Cell
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
  columns: PropTypes.arrayOf(columnShape),
  row: dataShape,
  onRowClick: PropTypes.func,
}
