import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import GridComponent from '../Grid'
import { classNames } from '../../utilities/classNames'

import { COMPONENT_KEY } from './FromGroup.utils'

type Props = {
  children?: any
  className?: string
}

class Grid extends React.PureComponent<Props> {
  static displayName = 'FormGroupGrid'

  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-FormGroupGrid', className)

    return (
      <div {...getValidProps(rest)} className={componentClassName}>
        <GridComponent>{children}</GridComponent>
      </div>
    )
  }
}

export default Grid
