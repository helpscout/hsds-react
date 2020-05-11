import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Item from './Timeline.Item'
import { classNames } from '../../utilities/classNames'

class Timeline extends React.PureComponent {
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

Timeline.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

export default Timeline
