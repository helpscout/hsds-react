// @flow
import React, { PureComponent as Component } from 'react'
import classNames from '../../utilities/classNames'

type Props = {
  children?: any,
  className?: string,
  inline: boolean,
}

class Item extends Component<Props> {
  static defaultProps = {
    inline: false,
  }
  static displayName = 'Flexy.Item'

  render() {
    const { children, className, inline, ...rest } = this.props

    const componentClassName = classNames(
      inline ? 'c-Flexy__inline-item' : 'c-Flexy__item',
      className
    )

    return (
      <div className={componentClassName} {...rest}>
        {children}
      </div>
    )
  }
}

export default Item
