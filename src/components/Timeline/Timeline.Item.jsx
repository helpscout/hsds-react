import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Timestamp from '../Timestamp'
import { classNames } from '../../utilities/classNames'
import { TimelineItemUI } from './Timeline.css'

class TimelineItem extends React.PureComponent {
  static displayName = 'Timeline.Item'

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

TimelineItem.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  timestamp: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
}

export default TimelineItem
