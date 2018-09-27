// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Item from './Item'
import classNames from '../../utilities/classNames'

type Props = {
  children?: any,
  className?: string,
}

class Timeline extends Component<Props> {
  static Item = Item

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-Timeline', className)

    return (
      <div {...getValidProps(rest)} className={componentClassName} role="list">
        {children}
      </div>
    )
  }
}

export default Timeline
