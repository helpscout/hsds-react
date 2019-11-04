import * as React from 'react'
import { MessageChat, MessageThemeContext } from './Message.types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ActionChatBlockUI } from './styles/Action.css'
import ChatBlock from './Message.ChatBlock'

type Props = MessageChat & {
  className?: string
  icon?: string
}
type Context = MessageThemeContext

export const Action = (props: Props, context: Context) => {
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
  const textSize = '12'
  const textShade = isThemeEmbed ? 'faint' : 'muted'

  return (
    <ActionChatBlockUI>
      <ChatBlock
        from={from}
        ltr={ltr}
        read={read}
        rtl={rtl}
        timestamp={timestamp}
        to={to}
        type="action"
      >
        <div {...getValidProps(rest)} className={componentClassName}>
          <Text
            className="c-MessageAction__text"
            shade={textShade}
            size={textSize}
          >
            {children}
          </Text>
        </div>
      </ChatBlock>
    </ActionChatBlockUI>
  )
}

// TODO: fix typescript complains
// @ts-ignore
Action.contextTypes = {
  theme: noop,
}

export default Action
