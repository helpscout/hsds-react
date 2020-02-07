import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { namespaceComponent } from '../../utilities/component'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import { MessageChat, MessageThemeContext } from './Message.types'
import { ActionUI, TimestampUI } from './styles/Action.css'
import { COMPONENT_KEY } from './Message.utils'

type Props = MessageChat & {
  className?: string
  icon?: string
}
type Context = MessageThemeContext

export const Action = (props: Props, context: Context) => {
  const { children, className, read, timestamp, ...rest } = props
  const { theme } = context

  const componentClassName = classNames(
    'c-MessageAction',
    theme && `is-theme-${theme}`,
    className
  )

  const isThemeEmbed = theme === 'embed'
  const textShade = isThemeEmbed ? 'faint' : 'default'
  const textSize = isThemeEmbed ? '12' : '14'

  const getTextMarkup = () => {
    return (
      <Text className="c-MessageAction__text" shade={textShade} size={textSize}>
        {children}
      </Text>
    )
  }

  const getTimestampMarkup = () => {
    const { read, timestamp } = props

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

// TODO: fix typescript complains
// @ts-ignore
Action.contextTypes = {
  theme: noop,
}

namespaceComponent(COMPONENT_KEY.Action)(Action)

export default Action
