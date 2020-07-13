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

GridCol.defaultProps = {
  'data-cy': 'GridCol',
}

GridCol.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Adds fluid styles to the component. */
  isFluid: PropTypes.bool,
  /** Adds responsive styles to the component. */
  isResponsive: PropTypes.bool,
  /** Column size */
  size: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default GridCol
