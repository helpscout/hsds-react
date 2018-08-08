// @flow
import React, { PureComponent as Component } from 'react'
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
      <div className={componentClassName} {...rest} role="list">
        {children}
      </div>
    )
  }
}

export default Timeline
