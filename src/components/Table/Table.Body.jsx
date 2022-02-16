import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Row from './Table.Row'
import { columnShape, dataShape } from './Table.utils'
import isPlainObject from 'lodash.isplainobject'
import { TBodyUI } from './Table.css'

export function TableBody({
  animateRows,
  columns,
  'data-cy': dataCy = 'TableBody',
  deselectRow,
  onRowClick,
  onSelectRow,
  rows,
  rowClassName,
  rowWrapper,
  selectRow,
  selectionKey,
  selectedRows,
  withSelectableRows,
  withFocusableRows,
}) {
  function renderRow(row) {
    return (
      <Row
        columns={columns}
        selectRow={selectRow}
        deselectRow={deselectRow}
        key={`row_${row.id}`}
        onRowClick={onRowClick}
        onSelectRow={onSelectRow}
        row={row}
        rowClassName={rowClassName}
        rowWrapper={rowWrapper}
        selected={selectedRows && selectedRows.includes(row.id)}
        selectionKey={selectionKey}
        withSelectableRows={withSelectableRows}
        withFocusableRows={withFocusableRows}
      />
    )
  }

  if (animateRows) {
    let animateRowsObj = {
      timeout: 500,
      classNames: 'animated-row',
    }

    if (isPlainObject(animateRows)) {
      animateRowsObj = { ...animateRowsObj, ...animateRows }
    }

    return (
      <TBodyUI
        className="TableBody--animated"
        data-cy={dataCy}
        $timeout={animateRowsObj.timeout}
      >
        <TransitionGroup className="animated-table-body" component={null}>
          {rows.map(row => {
            return (
              <CSSTransition key={row.id} {...animateRowsObj}>
                {renderRow(row)}
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </TBodyUI>
    )
  }

  return (
    <tbody className="TableBody" data-cy={dataCy}>
      {rows.map(renderRow)}
    </tbody>
  )
}

TableBody.propTypes = {
  /** List of columns */
  columns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  deselectRow: PropTypes.func,
  /** Callback function when a row is clicked. Arguments are the event and the row clicked. */
  onRowClick: PropTypes.func,
  onSelectRow: PropTypes.func,
  /** List of Rows (data), which are objects */
  rows: PropTypes.arrayOf(PropTypes.shape(dataShape)),
  /** Custom class names to be added to the each row based on a condition. */
  rowClassName: PropTypes.func,
  /** Gives you the ability to wrap rows based on conditions */
  rowWrapper: PropTypes.func,
  selectRow: PropTypes.func,
  selectedRows: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  /** Customize which key from your data should be used for selection */
  selectionKey: PropTypes.string,
  /** Adds tabindex=0 to each row*/
  withFocusableRows: PropTypes.bool,
  /** Adds a column with a checkbox for row selection */
  withSelectableRows: PropTypes.bool,
}

export default TableBody
