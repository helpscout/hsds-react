import React from 'react'
import PropTypes from 'prop-types'
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
    if (shouldfireRowClickEvent(e)) {
      e.persist()
      onRowClick && onRowClick(e, row)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && shouldfireRowClickEvent(e)) {
      e.persist()
      onRowClick && onRowClick(e, row)
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
        data-row-id={row.id}
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

function shouldfireRowClickEvent(e) {
  const { target } = e
  // Avoid firing when selecting a row
  const wasSelectorClicked = target.closest('.Selector_Checkbox')
  // Avoid firing if the content is clickable
  const isTargetLinkOrButton =
    target.tagName === 'A' || target.tagName === 'BUTTON'

  return !wasSelectorClicked && !isTargetLinkOrButton
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

export default TableRow
