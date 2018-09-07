// @flow
import type { StatusDotStatus, StatusDotSize } from './types'
import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Centralize from '../Centralize'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { StatusDotUI } from './styles/StatusDot.css.js'

type Props = {
  borderColor: string,
  className?: string,
  children?: any,
  icon?: string,
  inline: boolean,
  isUnread: boolean,
  outerBorderColor?: string,
  size: StatusDotSize,
  status: StatusDotStatus,
  style?: Object,
  title?: string,
}

const StatusDot = (props: Props) => {
  const {
    borderColor,
    children,
    className,
    icon,
    inline,
    isUnread,
    outerBorderColor,
    status,
    size,
    style,
    title,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-StatusDot',
    icon && 'is-icon',
    inline && 'is-inline',
    isUnread && 'is-unread',
    size && `is-${size}`,
    status && `is-${status}`,
    className
  )

  const componentStyle = {
    ...style,
    borderColor: borderColor || null,
    boxShadow: outerBorderColor ? `0 0 0 2px ${outerBorderColor}` : null,
  }

  const tooltipTitle = title || `Is ${status}`

  const iconMarkup = icon ? (
    <Centralize>
      <div className="c-StatusDot__icon">
        <Icon name={icon} size="20" />
      </div>
    </Centralize>
  ) : null

  return (
    <StatusDotUI
      {...getValidProps(rest)}
      className={componentClassName}
      style={componentStyle}
      title={tooltipTitle}
    >
      {iconMarkup}
    </StatusDotUI>
  )
}

StatusDot.defaultProps = {
  inline: false,
  isUnread: false,
  size: 'sm',
  status: 'online',
  style: {},
}

namespaceComponent(COMPONENT_KEY)(StatusDot)

export default StatusDot
