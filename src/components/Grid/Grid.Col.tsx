import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames, variantClassNames } from '../../utilities/classNames'
import { ColUI } from './Grid.Col.css'
import { GridColProps } from './Grid.types'

class Col extends React.PureComponent<GridColProps> {
  static displayName = 'GridCol'

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

export default Col
