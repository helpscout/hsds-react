import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Timestamp from '../Timestamp'
import { classNames } from '../../utilities/classNames'

import { TimelineItemUI } from './styles/Timeline.css'

type Props = {
  children?: any
  className?: string
  timestamp?: number | string
}

class Item extends React.PureComponent<Props> {
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

export default Item
