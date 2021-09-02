import React from 'react'
import PropTypes from 'prop-types'
import { generateCellKey, columnShape, dataShape } from './Table.utils'
import { TABLE_CLASSNAME } from './Table'
import Checkbox from '../Checkbox'
import HeaderCell from './Table.HeaderCell'
import { HeaderCellUI } from './Table.css'

function TableHead({
  columns,
  'data-cy': dataCy = 'TableHead',
  isLoading,
  selectAllRows,
  deselectAllRows,
  onSelectRow,
  rows,
  selected,
  selectionKey,
  sortedInfo,
  withSelectableRows,
}) {
  function handleChange(_, checked) {
    if (checked) {
      selectAllRows(rows, selectionKey, onSelectRow)
    } else {
      deselectAllRows(onSelectRow)
    }
  }

  return (
    <thead data-cy={dataCy}>
      <tr className={`${TABLE_CLASSNAME}__HeaderRow`}>
        {withSelectableRows ? (
          <HeaderCellUI
            className="c-Table__Header Column_Selector"
            cellWidth="43px"
          >
            <Checkbox
              checked={selected}
              onChange={handleChange}
              onEnter={handleChange}
              value="all"
            />
          </HeaderCellUI>
        ) : null}
        {columns
          .filter(column => column.show)
          .map(column => (
            <HeaderCell
              key={generateCellKey('headercell', column)}
              column={column}
              isLoading={isLoading}
              sortedInfo={sortedInfo}
            />
          ))}
      </tr>
    </thead>
  )
}

TableHead.propTypes = {
  /** List of columns */
  columns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  /** Whether tha table is in the loading state */
  isLoading: PropTypes.bool,
  selectAllRows: PropTypes.func,
  deselectAllRows: PropTypes.func,
  onSelectRow: PropTypes.func,
  /** List of Rows (data), which are objects */
  rows: PropTypes.arrayOf(PropTypes.shape(dataShape)),
  selected: PropTypes.bool,
  /** Customize which key from your data should be used for selection */
  selectionKey: PropTypes.string,
  /** When sortable, indicates which column tha table is sorted by, and in which order (ascending or descending) */
  sortedInfo: PropTypes.shape({
    columnKey: PropTypes.string,
    order: PropTypes.string,
  }),
  /** Adds a column with a checkbox for row selection */
  withSelectableRows: PropTypes.bool,
}

export default TableHead
