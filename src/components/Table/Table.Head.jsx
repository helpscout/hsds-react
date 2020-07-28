import React from 'react'
import PropTypes from 'prop-types'
import equal from 'fast-deep-equal'
import HeaderCell from './Table.HeaderCell'
import { TABLE_CLASSNAME } from './Table'
import { generateCellKey, columnShape } from './Table.utils'

class TableHead extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { columns, sortedInfo } = this.props

    if (!equal(sortedInfo, nextProps.sortedInfo)) {
      return true
    }

    if (!equal(columns, nextProps.columns)) {
      return true
    }

    return false
  }

  render() {
    const { isLoading, columns, sortedInfo, 'data-cy': dataCy } = this.props

    return (
      <thead data-cy={dataCy}>
        <tr className={`${TABLE_CLASSNAME}__HeaderRow`}>
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
}

TableHead.defaultProps = {
  'data-cy': 'TableHead',
}

TableHead.propTypes = {
  /** List of columns */
  columns: PropTypes.arrayOf(PropTypes.shape(columnShape)),
  /** Whether tha table is in the loading state */
  isLoading: PropTypes.bool,
  /** When sortable, indicates which column tha table is sorted by, and in which order (ascending or descending) */
  sortedInfo: PropTypes.shape({
    columnKey: PropTypes.string,
    order: PropTypes.string,
  }),
}

export default TableHead
