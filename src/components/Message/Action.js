import React from 'react'
import Text from '../Text'
import ChatBlock from './ChatBlock'
import classNames from '../../utilities/classNames'
import { chatTypes, providerContextTypes } from './propTypes'

export const propTypes = chatTypes
const contextTypes = providerContextTypes

const Action = (props, context) => {
  const {
    children,
    className,
    from,
    icon,
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
      type='action'
    >
      <div className={componentClassName} {...rest}>
        <Text
          className='c-MessageAction__text'
          shade={textShade}
          size={textSize}
        >
          {children}
        </Text>
      </div>
    </ChatBlock>
  )
}

Action.propTypes = propTypes
Action.contextTypes = contextTypes

export default Action
