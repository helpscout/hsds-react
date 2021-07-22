import React from 'react'
import PropTypes from 'prop-types'
import equal from 'fast-deep-equal'
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
  sortedInfo,
  withSelectableRows,
}) {
  return (
    <thead data-cy={dataCy}>
      <tr className={`${TABLE_CLASSNAME}__HeaderRow`}>
        {withSelectableRows ? (
          <HeaderCellUI cellWidth="43px">
            <Checkbox
              checked={selected}
              onChange={(value, checked) => {
                if (checked) {
                  dispatch({
                    type: 'select-all',
                    payload: { value, checked, data: rows },
                  })
                } else {
                  dispatch({
                    type: 'deselect-all',
                    payload: { value, checked },
                  })
                }
              }}
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

function areEqual(prevProps, nextProps) {
  const { columns, sortedInfo } = prevProps

  if (
    equal(sortedInfo, nextProps.sortedInfo) &&
    equal(columns, nextProps.columns) &&
    prevProps.selected === nextProps.selected
  ) {
    return true
  }

  return false
}

export default TableHead
