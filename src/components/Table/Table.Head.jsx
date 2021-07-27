import React from 'react'
import PropTypes from 'prop-types'
import { generateCellKey, columnShape } from './Table.utils'
import { TABLE_CLASSNAME } from './Table'
import Checkbox from '../Checkbox'
import HeaderCell from './Table.HeaderCell'
import { HeaderCellUI } from './Table.css'

function TableHead({
  columns,
  'data-cy': dataCy = 'TableHead',
  isLoading,
  dispatch,
  rows,
  selected,
  selectKey,
  sortedInfo,
  withSelectableRows,
}) {
  function handleChange(_, checked) {
    if (checked) {
      dispatch({
        type: 'select-all',
        payload: { data: rows, selectKey },
      })
    } else {
      dispatch({
        type: 'deselect-all',
      })
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
        {columns.map(column => (
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
  dispatch: PropTypes.func,
  withSelectableRows: PropTypes.bool,
  /** When sortable, indicates which column tha table is sorted by, and in which order (ascending or descending) */
  sortedInfo: PropTypes.shape({
    columnKey: PropTypes.string,
    order: PropTypes.string,
  }),
}

export default TableHead
