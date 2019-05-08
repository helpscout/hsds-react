import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { ContainerUI } from './styles/FluffyCard.Container.css'
import { COMPONENT_KEY } from './FluffyCard.utils'

type Props = {
  children?: any
  className?: string
}

class Container extends React.PureComponent<Props> {
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
