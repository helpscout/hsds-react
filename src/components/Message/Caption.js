// @flow
import type { MessageThemeContext } from './types'
import React from 'react'
import Text from '../Text'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { providerContextTypes } from './propTypes'
import { COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
  children?: any,
  size?: string,
  wordWrap: boolean,
}

type Context = MessageThemeContext

const Caption = (props: Props, context: Context) => {
  const { className, children, size, wordWrap, ...rest } = props
  const { theme } = context
  const isThemeEmbed = theme === 'embed'

  const componentClassName = classNames(
    'c-MessageCaption',
    theme && `is-theme-${theme}`,
    className
  )

  const textSize = size ? size : isThemeEmbed ? '11' : '13'

  return (
    <div className={componentClassName} {...rest}>
      <Text
        className="c-MessageCaption__text"
        size={textSize}
        shade="faint"
        wordWrap={wordWrap}
      >
        {children}
      </Text>
    </div>
  )
}

Caption.defaultProps = {
  wordWrap: true,
}
Caption.contextTypes = providerContextTypes

namespaceComponent(COMPONENT_KEY.Caption)(Caption)

export default Caption
