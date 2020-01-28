import * as React from 'react'
import { StatusDotStatus, StatusDotSize } from './StatusDot.types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Centralize from '../Centralize'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'

import { StatusDotUI } from './StatusDot.css'

type Props = {
  borderColor?: string
  className?: string
  children?: any
  icon?: string
  inline: boolean
  isUnread: boolean
  outerBorderColor?: string
  outerBorderWidth: number
  size: StatusDotSize
  status: StatusDotStatus
  style?: any
  title?: string
}

class StatusDot extends React.PureComponent<Props> {
  static defaultProps = {
    inline: false,
    isUnread: false,
    outerBorderWidth: 3,
    size: 'sm',
    status: 'online',
    style: {},
  }

  getStyles = () => {
    const {
      borderColor,
      icon,
      outerBorderColor,
      outerBorderWidth,
      status,
      style,
    } = this.props

    let styles = {
      ...style,
      borderColor: borderColor || null,
      boxShadow: outerBorderColor
        ? `0 0 0 ${outerBorderWidth}px ${outerBorderColor}`
        : null,
    }

    if ((status === 'offline' && !icon) || status === 'busy') {
      styles.color = outerBorderColor || 'white'
    }

    return styles
  }

  getIconMarkup = () => {
    const { icon } = this.props

    return (
      icon && (
        <Centralize>
          <div className="c-StatusDot__icon">
            <Icon name={icon} size="20" />
          </div>
        </Centralize>
      )
    )
  }

  render() {
    const {
      borderColor,
      children,
      className,
      icon,
      inline,
      isUnread,
      outerBorderColor,
      outerBorderWidth,
      status,
      size,
      style,
      title,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-StatusDot',
      icon && 'is-icon',
      inline && 'is-inline',
      isUnread && 'is-unread',
      size && `is-${size}`,
      status && `is-${status}`,
      className
    )

    const componentStyle = this.getStyles()
    const tooltipTitle = title || `Is ${status}`

    return (
      <StatusDotUI
        {...getValidProps(rest)}
        className={componentClassName}
        style={componentStyle}
        title={tooltipTitle}
      >
        {this.getIconMarkup()}
      </StatusDotUI>
    )
  }
}

export default StatusDot
