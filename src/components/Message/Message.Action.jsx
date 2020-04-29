import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ActionUI, TimestampUI } from './Message.Action.css'

export const Action = (props, context) => {
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

Action.propTypes = {
  read: PropTypes.bool,
  timestamp: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
}

Action.contextTypes = {
  theme: noop,
}

Action.displayName = 'MessageAction'

export default Action