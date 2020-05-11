import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ContainerUI } from './Grid.Container.css'

class Container extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    fluid: PropTypes.bool, // deprecating
    responsive: PropTypes.bool, // deprecating
    isFluid: PropTypes.bool,
    isResponsive: PropTypes.bool,
    size: PropTypes.oneOf(['md', 'sm', 'xs']),
  }

  static displayName = 'GridContainer'

  static defaultProps = {
    fluid: false,
    responsive: false,
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

export default Container
