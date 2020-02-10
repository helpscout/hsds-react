import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Item from './Inline.Item'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { InlineUI } from './Inline.css'

export class Inline extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.func,
    size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  }

  static className = 'c-Inline'
  static defaultProps = {
    innerRef: noop,
    size: 'sm',
  }

  static Item = Item

  getClassName() {
    const { className, size } = this.props
    return classNames(Inline.className, size && `is-${size}`, className)
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <InlineUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
        role="list"
      >
        {children}
      </InlineUI>
    )
  }
}

export default Inline
