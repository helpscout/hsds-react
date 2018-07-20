// @flow
import React from 'react'
import Text from '../Text'
import ChatBlock from './ChatBlock'
import classNames from '../../utilities/classNames'
import { providerContextTypes } from './propTypes'
import type { MessageChat, MessageThemeContext } from './types'

type Props = MessageChat & {
  className?: string,
  icon?: string,
}
type Context = MessageThemeContext

const Action = (props: Props, context: Context) => {
  const {
    children,
    className,
    from,
    icon,
    isNote,
    ltr,
    rtl,
    to,
    read,
    timestamp,
    type,
    ...rest
  } = props
  const { theme } = context

  const componentClassName = classNames(
    'c-MessageAction',
    theme && `is-theme-${theme}`,
    className
  )

  const isThemeEmbed = theme === 'embed'
  const textSize = '11'
  const textShade = isThemeEmbed ? 'faint' : 'muted'

  return (
    <ChatBlock
      from={from}
      ltr={ltr}
      read={read}
      rtl={rtl}
      timestamp={timestamp}
      to={to}
      type="action"
    >
      <div className={componentClassName} {...rest}>
        <Text
          className="c-MessageAction__text"
          shade={textShade}
          size={textSize}
        >
          {children}
        </Text>
      </div>
    </ChatBlock>
  )
}

Action.contextTypes = providerContextTypes
Action.displayName = 'Message.Action'

export default Action
