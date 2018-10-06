// @flow
import type { StatusDotStatus, StatusDotSize } from './types'
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Centralize from '../Centralize'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
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
  outerBorderWidth: number,
  size: StatusDotSize,
  status: StatusDotStatus,
  style?: Object,
  title?: string,
}

class StatusDot extends Component<Props> {
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

namespaceComponent(COMPONENT_KEY)(StatusDot)

export default StatusDot
