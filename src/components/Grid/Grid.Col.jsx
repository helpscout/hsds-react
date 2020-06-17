import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames, variantClassNames } from '../../utilities/classNames'
import { ColUI } from './Grid.Col.css'

class GridCol extends React.PureComponent {
  render() {
    const { className, children, size, ...rest } = this.props
    const sizeClassName = size ? variantClassNames('is', size) : null
    const componentClassName = classNames('c-Col', sizeClassName, className)

    return (
      <ColUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </ColUI>
    )
  }
}

GridCol.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

GridCol.defaultProps = {
  'data-cy': 'GridCol',
}

export default GridCol
