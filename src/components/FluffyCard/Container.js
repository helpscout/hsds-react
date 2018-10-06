// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import { ContainerUI } from './styles/Container.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
}

class Container extends Component<Props> {
  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-FluffyCardContainer', className)

    return (
      <ContainerUI {...getValidProps(rest)} className={componentClassName}>
        {children}
      </ContainerUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Container)(Container)

export default Container
