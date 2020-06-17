import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { RowUI } from './Grid.Row.css'

class GridRow extends React.PureComponent {
  render() {
    const { className, children, flex, isFlex, size, ...rest } = this.props

    const componentClassName = classNames(
      'c-Row',
      (flex || isFlex) && 'is-flex',
      size && `is-${size}`,
      className
    )

    return (
      <RowUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </RowUI>
    )
  }
}

GridRow.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  flex: PropTypes.bool, // deprecating
  isFlex: PropTypes.bool,
  size: PropTypes.oneOf(['md', 'sm', 'xs']),
}

GridRow.defaultProps = {
  'data-cy': 'GridRow',
  flex: false,
  isFlex: false,
}

export default GridRow
