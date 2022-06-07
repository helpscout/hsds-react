import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Flexy from '../Flexy'
import Timestamp from '../Timestamp'
import classNames from 'classnames'
import { TimelineItemUI } from './Timeline.css'

class TimelineItem extends React.PureComponent {
  render() {
    const { children, className, timestamp, ...rest } = this.props
    const componentClassName = classNames('c-TimelineItem', className)
    const timestampMarkup = timestamp ? (
      <Flexy.Item className="c-TimelineItem__timestamp">
        <Timestamp timestamp={timestamp} />
      </Flexy.Item>
    ) : null

    return (
      <TimelineItemUI
        {...getValidProps(rest)}
        className={componentClassName}
        role="listitem"
      >
        <Flexy gap="md" just="left">
          <Flexy.Item className="c-TimelineItem__block">{children}</Flexy.Item>
          {timestampMarkup}
        </Flexy>
      </TimelineItemUI>
    )
  }
}

TimelineItem.defaultProps = {
  'data-cy': 'TimelineItem',
}

TimelineItem.propTypes = {
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Renders a `Timestamp` when component is hovered. */
  timestamp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default TimelineItem
