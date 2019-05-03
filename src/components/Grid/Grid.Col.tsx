import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames, variantClassNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Grid.utils'
import { ColUI } from './styles/Grid.Col.css'
import { GridColProps } from './Grid.types'

class Col extends React.PureComponent<GridColProps> {
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

namespaceComponent(COMPONENT_KEY.Col)(Col)

export default Col
