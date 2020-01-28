import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ContainerUI } from './Grid.Container.css'
import { GridContainerProps } from './Grid.types'

class Container extends React.PureComponent<GridContainerProps> {
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
