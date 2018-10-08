// @flow
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import Timestamp from '../Timestamp'
import { classNames } from '../../utilities/classNames.ts'

type Props = {
  children?: any,
  className?: string,
  timestamp?: number | string,
}

class Item extends Component<Props> {
  render() {
    const { children, className, timestamp, ...rest } = this.props

    const componentClassName = classNames('c-TimelineItem', className)

    const timestampMarkup = timestamp ? (
      <Flexy.Item className="c-TimelineItem__timestamp">
        <Timestamp timestamp={timestamp} />
      </Flexy.Item>
    ) : null

    return (
      <div
        {...getValidProps(rest)}
        className={componentClassName}
        role="listitem"
      >
        <Flexy gap="md" just="left">
          <Flexy.Item className="c-TimelineItem__block">{children}</Flexy.Item>
          {timestampMarkup}
        </Flexy>
      </div>
    )
  }
}

export default Item
