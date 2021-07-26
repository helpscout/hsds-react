import React from 'react'
import PropTypes from 'prop-types'
import equal from 'fast-deep-equal'
import { classNames } from '../../utilities/classNames'
import { generateCellKey, columnShape, dataShape } from './Table.utils'
import { TABLE_CLASSNAME } from './Table'
import TableCell from './Table.Cell'
import { CellUI } from './Table.css'
import Checkbox from '../Checkbox'

export function TableRow({
  columns,
  dispatch,
  row,
  onRowClick,
  selected,
  withSelectableRows,
}) {
  function handleRowClick(e) {
    e.persist()
    onRowClick && onRowClick(e, row)
  }

  return (
    <tr
      className={classNames(
        `${TABLE_CLASSNAME}__Row`,
        row.className,
        row.id && `row_id_${row.id}`,
        selected && 'is-row-selected'
      )}
      onClick={handleRowClick}
    >
      {withSelectableRows ? (
        <CellUI className="c-Table__Cell Column_Selector">
          <Checkbox
            checked={selected}
            onChange={(value, checked) => {
              if (checked) {
                dispatch({
                  type: 'select-row',
                  payload: { value, checked },
                })
              } else {
                dispatch({
                  type: 'deselect-row',
                  payload: { value, checked },
                })
              }
            }}
            value={row.id}
          />
        </CellUI>
      ) : null}
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

TableRow.propTypes = {
  /** List of columns */
  columns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  /** Object with data for this particular row */
  row: PropTypes.shape(dataShape),
  /** Callback function when the row is clicked. Arguments are the event and the row clicked. */
  onRowClick: PropTypes.func,
  onSelectRow: PropTypes.func,
}

function areEqual(prevProps, nextProps) {
  const { dispatch, onRowClick, ...rest } = prevProps
  const {
    dispatch: dispatchNext,
    onRowClick: onRowClickNext,
    ...restNext
  } = nextProps

  if (equal(rest, restNext)) {
    return true
  }

  return false
}

export default React.memo(TableRow, areEqual)
