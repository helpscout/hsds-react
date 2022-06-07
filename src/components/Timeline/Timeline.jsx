import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Item from './Timeline.Item'
import classNames from 'classnames'

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

Timeline.defaultProps = {
  'data-cy': 'Timeline',
}

Timeline.propTypes = {
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
}

export default Timeline
