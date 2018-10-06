import React from 'react'
import PropTypes from 'prop-types'
import Animate from '../Animate'
import Badge from '../Badge'
import {
  default as StatusDot,
  propTypes as statusDotPropTypes,
} from '../StatusDot'
import { statusTypes } from './propTypes'
import classNames from '../../utilities/classNames.ts'

export const propTypes = {
  ...statusDotPropTypes,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: statusTypes,
}

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
    <div className="c-StatusBadge__statusDot">
      <Animate duration={100} in={hasStatus} sequence="scale fade">
        <StatusDot {...statusDotProps} status={status} />
      </Animate>
    </div>
  )

  return (
    <div className={componentClassName} {...rest}>
      {statusDotMarkup}
      <Badge isSquare className="c-StatusBadge__badge">
        {count}
      </Badge>
    </div>
  )
}

StatusBadge.propTypes = propTypes
StatusBadge.defaultProps = defaultProps
StatusBadge.displayName = 'StatusBadge'

export default StatusBadge
