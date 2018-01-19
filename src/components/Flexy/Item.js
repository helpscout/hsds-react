import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

export const propTypes = {
  inline: PropTypes.bool
}

class Item extends Component {
  render () {
    const {
      children,
      className,
      inline,
      ...rest
    } = this.props

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

Item.propTypes = propTypes
Item.displayName = 'FlexyItem'

export default Item
