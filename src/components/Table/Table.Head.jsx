import React from 'react'
import PropTypes from 'prop-types'
import equal from 'fast-deep-equal'
import HeaderCell from './Table.HeaderCell'
import { TABLE_CLASSNAME } from './Table'
import { generateCellKey } from './Table.utils'
import { columnShape } from './Table'

class Head extends React.Component {
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
    const { isLoading, columns, sortedInfo } = this.props
    return (
      <thead>
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

Head.propTypes = {
  columns: PropTypes.arrayOf(columnShape),
  isLoading: PropTypes.bool,
  sortedInfo: PropTypes.shape({
    columnKey: PropTypes.string,
    order: PropTypes.string,
  }),
}

export default Head
