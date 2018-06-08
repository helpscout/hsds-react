// @flow
import React, { PureComponent as Component } from 'react'
import classNames from '../../utilities/classNames'

type Props = {
  children?: any,
  className?: string,
}

class Block extends Component<Props> {
  static displayName = 'Flexy.Block'

  render() {
    const { children, className, ...rest } = this.props

    const componentClassName = classNames('c-Flexy__block', className)

    return (
      <div className={componentClassName} {...rest}>
        {children}
      </div>
    )
  }
}

export default Block
