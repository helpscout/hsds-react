import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ContainerUI } from './Grid.Container.css'

class Container extends React.PureComponent {
  static displayName = 'GridContainer'
  static defaultProps = {
    isFluid: false,
    isResponsive: false,
  }

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

Container.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Adds fluid styles to the component. */
  isFluid: PropTypes.bool,
  /** Adds responsive styles to the component. */
  isResponsive: PropTypes.bool,
  size: PropTypes.oneOf(['md', 'sm', 'xs']),
}

export default Container
