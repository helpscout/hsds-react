import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ItemUI } from './Inline.css'

export class Item extends React.PureComponent {
  static className = 'c-InlineItem'
  static defaultProps = {
    innerRef: noop,
  }
  static displayName = 'InlineItem'

  getClassName() {
    const { className } = this.props
    return classNames(Item.className, className)
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <ItemUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
        role="listitem"
      >
        {children}
      </ItemUI>
    )
  }
}

Item.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  innerRef: PropTypes.func,
}

export default Item
