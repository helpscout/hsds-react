// @flow
import React from 'react'
import PropTypes from 'prop-types'
import Text from '../Text'
import classNames from '../../utilities/classNames'
import { providerContextTypes } from './propTypes'
import type { ThemeContext } from './types'

type Props = {
  className?: string,
  children?: any,
  size: string,
  wordWrap: boolean,
}

type Context = ThemeContext

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
Caption.displayName = 'MessageCaption'

export default Caption
