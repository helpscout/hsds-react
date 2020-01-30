import * as React from 'react'
import Animate from '../Animate'
import Badge from '../Badge'
import StatusDot from '../StatusDot'
import { classNames } from '../../utilities/classNames'

import { StatusBadgeUI, StatusDotUI } from './StatusBadge.css'

const defaultProps = {
  count: 0,
}

const StatusBadge = props => {
  const {
    borderColor,
    children,
    className,
    count,
    icon,
    inline,
    isUnread,
    outerBorderColor,
    size,
    status,
    style,
    title,
    ...rest
  } = props

  const statusDotProps = {
    borderColor,
    outerBorderColor,
    title,
  }

  const componentClassName = classNames('c-StatusBadge', className)

  const hasStatus = status !== null && status !== undefined

  const statusDotMarkup = (
    <StatusDotUI className="c-StatusBadge__statusDot">
      <Animate duration={100} in={hasStatus} sequence="scale fade">
        <StatusDot {...statusDotProps} status={status} />
      </Animate>
    </StatusDotUI>
  )

  return (
    <StatusBadgeUI className={componentClassName} {...rest}>
      {statusDotMarkup}
      <Badge isSquare className="c-StatusBadge__badge">
        {count}
      </Badge>
    </StatusBadgeUI>
  )
}

StatusBadge.defaultProps = defaultProps
StatusBadge.displayName = 'StatusBadge'

export default StatusBadge
