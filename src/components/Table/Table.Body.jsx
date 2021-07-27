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
  rowClassName,
  rowWrapper,
  selectKey,
  selectedRows,
  withSelectableRows,
  withFocusableRows,
}) {
  function renderRow(row) {
    return (
      <Row
        columns={columns}
        dispatch={dispatch}
        key={`row_${row.id}`}
        onRowClick={onRowClick}
        row={row}
        rowClassName={rowClassName}
        rowWrapper={rowWrapper}
        selected={selectedRows && selectedRows.includes(row.id)}
        selectKey={selectKey}
        withSelectableRows={withSelectableRows}
        withFocusableRows={withFocusableRows}
      />
    )
  }

  // {rowWrapper ? rowWrapper(renderRows()) : renderRows()}
  return <tbody data-cy={dataCy}>{rows.map(renderRow)}</tbody>
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
