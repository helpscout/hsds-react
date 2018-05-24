import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import Block from './Block'
import Item from './Item'
import classNames from '../../utilities/classNames'
import { alignTypes, gapTypes, justTypes } from './propTypes'

export const propTypes = {
  align: alignTypes,
  className: PropTypes.string,
  gap: gapTypes,
  just: justTypes,
}

const defaultProps = {
  gap: 'sm',
}

class Flexy extends Component {
  render() {
    const { align, children, className, gap, just, ...rest } = this.props

    const componentClassName = classNames(
      'c-Flexy',
      align && `is-${align}`,
      gap && `c-Flexy--gap-${gap}`,
      just && `c-Flexy--just-${just}`,
      className
    )

    return (
      <div className={componentClassName} {...rest}>
        {children}
      </div>
    )
  }
}

Flexy.propTypes = propTypes
Flexy.defaultProps = defaultProps
Flexy.Block = Block
Flexy.Item = Item
Flexy.displayName = 'Flexy'

export default Flexy
