import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Grid.utils'
import { ContainerUI } from './styles/Container.css'

export type ContainerSize = 'md' | 'sm' | 'xs'
export interface Props {
  className?: string
  children?: any
  fluid: boolean // deprecating
  responsive: boolean // deprecating
  isFluid: boolean
  isResponsive: boolean
  size?: ContainerSize
}

class Container extends React.PureComponent<Props> {
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

namespaceComponent(COMPONENT_KEY.Container)(Container)

export default Container
