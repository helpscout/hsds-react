import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Animate from '../Animate'
import Badge from '../Badge'
import StatusDot from '../StatusDot'
import { classNames } from '../../utilities/classNames'
import { StatusBadgeUI, StatusDotUI } from './StatusBadge.css'

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

  const hasStatus = Boolean(status)

  const statusDotMarkup = (
    <StatusDotUI className="c-StatusBadge__statusDot">
      <Animate duration={100} in={hasStatus} sequence="scale fade">
        <StatusDot {...statusDotProps} status={status} />
      </Animate>
    </StatusDotUI>
  )

  return (
    <StatusBadgeUI {...getValidProps(rest)} className={componentClassName}>
      {statusDotMarkup}
      <Badge isSquare className="c-StatusBadge__badge">
        {count}
      </Badge>
    </StatusBadgeUI>
  )
}

StatusBadge.defaultProps = {
  count: 0,
  'data-cy': 'StatusBadge',
}

StatusBadge.propTypes = {
  /** Color for the StatusDot border. */
  borderColor: PropTypes.string,
  /** Custom class names to be added to the component.  */
  className: PropTypes.string,
  /** Count to display within the Badge. */
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Color for the StatusDot's outer border. */
  outerBorderColor: PropTypes.string,
  /** Status style to render to the StatusDot. */
  status: PropTypes.oneOf([
    'online',
    'offline',
    'busy',
    'new',
    'active',
    'inactive',
    '',
  ]),
  /** Custom text for the HTML `title` attributes. */
  title: PropTypes.string,
}

export default StatusBadge
