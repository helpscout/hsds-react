import React, {PureComponent as Component} from 'react'
import classNames from '../../utilities/classNames'

class Block extends Component {
  render () {
    const {
      children,
      className,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Flexy__block',
      className
    )

    return (
      <div className={componentClassName} {...rest}>
        {children}
      </div>
    )
  }
}

Block.displayName = 'FlexyBlock'

export default Block
