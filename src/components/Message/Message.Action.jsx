import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import { ActionUI, TimestampUI } from './Message.Action.css'

export const MessageAction = (props, context) => {
  const {
    children,
    className,
    from,
    ltr,
    read,
    rtl,
    timestamp,
    to,
    ...rest
  } = props
  const { theme } = context

  const componentClassName = classNames(
    'c-MessageAction',
    theme && `is-theme-${theme}`,
    className
  )

  const isThemeEmbed = theme === 'embed'
  const textSize = isThemeEmbed ? '12' : '14'
  const textShade = isThemeEmbed ? 'faint' : 'default'

  const getTextMarkup = () => {
    return (
      <Text className="c-MessageAction__text" shade={textShade} size={textSize}>
        {children}
      </Text>
    )
  }

  const getTimestampMarkup = () => {
    if (isThemeEmbed) return null

    return (
      timestamp && (
        <TimestampUI
          className="c-MessageAction__timestamp"
          read={read}
          timestamp={timestamp}
        />
      )
    )
  }

  return (
    <ActionUI
      {...getValidProps(rest)}
      className={componentClassName}
      just="center"
      isThemeEmbed={isThemeEmbed}
    >
      {getTextMarkup()}
      {getTimestampMarkup()}
    </ActionUI>
  )
}

MessageAction.contextTypes = {
  theme: noop,
}

MessageAction.defaultProps = {
  'data-cy': 'MessageAction',
}

MessageAction.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Provides author information and applies "From" styles. */
  from: PropTypes.bool,
  /** Applies left-to-right text styles. */
  ltr: PropTypes.bool,
  /** Determines if the Message is read. */
  read: PropTypes.bool,
  /** Applies right-to-left text styles. */
  rtl: PropTypes.bool,
  /** Renders a space for the Avatar to appear. Default is `true`. */
  showAvatar: PropTypes.bool,
  /** Timestamp for the Message. */
  timestamp: PropTypes.string,
  /** Provides author information and applies "To" styles. */
  to: PropTypes.bool,
  icon: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default MessageAction
