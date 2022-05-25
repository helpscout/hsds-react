import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Icon from '../Icon'
import classNames from 'classnames'
import { StatusDotUI, CenteredContentUI } from './StatusDot.css'

class StatusDot extends React.PureComponent {
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
        <CenteredContentUI>
          <div className="c-StatusDot__icon">
            <Icon name={icon} size="20" />
          </div>
        </CenteredContentUI>
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

StatusDot.defaultProps = {
  'data-cy': 'StatusDot',
  inline: false,
  isUnread: false,
  outerBorderWidth: 3,
  size: 'sm',
  status: 'online',
  style: {},
}

StatusDot.propTypes = {
  /** Color for the component border. */
  borderColor: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Renders an `Icon` into the component. */
  icon: PropTypes.string,
  /** Applies a display inline style to the component. */
  inline: PropTypes.bool,
  /** Applies an unread style to the component. */
  isUnread: PropTypes.bool,
  /** Color for the component's outer border. */
  outerBorderColor: PropTypes.string,
  /** Width the component's outer border. */
  outerBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Adjusts the size of the component. */
  size: PropTypes.oneOf(['md', 'sm']),
  /** Status style to render to the component. */
  status: PropTypes.oneOf([
    'online',
    'offline',
    'busy',
    'new',
    'active',
    'inactive',
    'available',
    'assign',
    'unavailable',
    'custom',
  ]),
  /** Custom text for the HTML `title` attributes. */
  title: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default StatusDot
