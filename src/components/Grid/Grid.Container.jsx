import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ContainerUI } from './Grid.Container.css'

class GridContainer extends React.PureComponent {
  render() {
    const {
      className,
      children,
      isFluid,
      isResponsive,
      fluid,
      responsive,
      size,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Container',
      (fluid || isFluid) && 'is-fluid',
      (responsive || isResponsive) && 'is-responsive',
      size && `is-${size}`,
      className
    )

    return (
      <ContainerUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </ContainerUI>
    )
  }
}

GridContainer.defaultProps = {
  'data-cy': 'GridContainer',
  fluid: false,
  responsive: false,
  isFluid: false,
  isResponsive: false,
}

GridContainer.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  fluid: PropTypes.bool, // deprecating
  responsive: PropTypes.bool, // deprecating
  isFluid: PropTypes.bool,
  isResponsive: PropTypes.bool,
  size: PropTypes.oneOf(['md', 'sm', 'xs']),
}

export default GridContainer
