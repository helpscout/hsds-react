import React from 'react'
import PropTypes from 'prop-types'
import Row from './Table.Row'
import { columnShape, dataShape } from './Table.utils'

export function TableBody({
  columns,
  'data-cy': dataCy = 'TableBody',
  dispatch,
  onRowClick,
  rows,
  selectedRows,
  withSelectableRows,
}) {
  return (
    <tbody data-cy={dataCy}>
      {rows.map(row => (
        <Row
          row={row}
          columns={columns}
          key={`row_${row.id}`}
          dispatch={dispatch}
          onRowClick={onRowClick}
          selected={selectedRows && selectedRows.includes(row.id)}
          withSelectableRows={withSelectableRows}
        />
      ))}
    </tbody>
  )
}

TableBody.propTypes = {
  /** List of columns */
  columns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  /** When provided the Table will only show this number of rows and and expander to see the rest */
  dispatch: PropTypes.func,
  /** Callback function when a row is clicked. Arguments are the event and the row clicked. */
  onRowClick: PropTypes.func,
  /** List of Rows (data), which are objects */
  rows: PropTypes.arrayOf(PropTypes.shape(dataShape)),
  selectedRows: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  withSelectableRows: PropTypes.bool,
}

export default TableBody
