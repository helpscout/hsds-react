import React from 'react'
import PropTypes from 'prop-types'
import equal from 'fast-deep-equal'
import classNames from 'classnames'
import { generateCellKey, columnShape, dataShape } from './Table.utils'
import { TABLE_CLASSNAME } from './Table'
import TableCell from './Table.Cell'
import { CellUI } from './Table.css'
import Checkbox from '../Checkbox'

export function TableRow({
  columns,
  deselectRow,
  onRowClick,
  onSelectRow,
  row,
  rowClassName,
  rowWrapper,
  selected,
  selectRow,
  selectionKey,
  withSelectableRows,
  withFocusableRows,
}) {
  function handleRowClick(e) {
    // Avoid firing when selecting a row
    const wasSelectorClicked = Boolean(e.target.closest('.Selector_Checkbox'))

    if (!wasSelectorClicked) {
      e.persist()
      onRowClick && onRowClick(e, row)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const wasSelectorClicked = Boolean(e.target.closest('.Selector_Checkbox'))

      if (!wasSelectorClicked) {
        e.persist()
        onRowClick && onRowClick(e, row)
      }
    }
  }

  function handleChange(value, checked) {
    if (checked) {
      selectRow(value, onSelectRow)
    } else {
      deselectRow(value, onSelectRow)
    }
  }

  function renderRow() {
    return (
      <tr
        className={classNames(
          `${TABLE_CLASSNAME}__Row`,
          row.className,
          row.id && `row_id_${row.id}`,
          selected && 'is-row-selected',
          rowClassName(row)
        )}
        onClick={handleRowClick}
        onKeyDown={handleKeyDown}
        tabIndex={withFocusableRows ? '0' : '-1'}
      >
        {withSelectableRows ? (
          <CellUI className="c-Table__Cell Column_Selector">
            <Checkbox
              className="Selector_Checkbox"
              checked={selected}
              onEnter={handleChange}
              onChange={handleChange}
              value={row[selectionKey]}
            />
          </CellUI>
        ) : null}
        {columns
          .filter(column => column.show)
          .map(column => (
            <TableCell
              column={column}
              row={row}
              key={generateCellKey('cell', column)}
            />
          ))}
      </tr>
    )
  }

  return rowWrapper ? rowWrapper(renderRow(), row) : renderRow()
}

TableRow.propTypes = {
  /** List of columns */
  columns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  /** Object with data for this particular row */
  row: PropTypes.shape(dataShape),
  /** Callback function when the row is clicked. Arguments are the event and the row clicked. */
  onRowClick: PropTypes.func,
  onSelectRow: PropTypes.func,
  deselectRow: PropTypes.func,
  /** Custom class names to be added to the each row based on a condition. */
  rowClassName: PropTypes.func,
  /** Gives you the ability to wrap rows based on conditions */
  rowWrapper: PropTypes.func,
  selected: PropTypes.bool,
  selectRow: PropTypes.func,
  /** Customize which key from your data should be used for selection */
  selectionKey: PropTypes.string,
  /** Adds tabindex=0 to each row*/
  withFocusableRows: PropTypes.bool,
  /** Adds a column with a checkbox for row selection */
  withSelectableRows: PropTypes.bool,
}

function areEqual(prevProps, nextProps) {
  const { onRowClick, ...rest } = prevProps
  const { onRowClick: onRowClickNext, ...restNext } = nextProps

  if (equal(rest, restNext)) {
    return true
  }

  return false
}

// export default React.memo(TableRow, areEqual)
export default TableRow
