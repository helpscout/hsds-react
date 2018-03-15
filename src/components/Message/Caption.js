import React from 'react'
import PropTypes from 'prop-types'
import Text from '../Text'
import classNames from '../../utilities/classNames'
import {providerContextTypes} from './propTypes'

const propTypes = {
  wordWrap: PropTypes.bool
}
const defaultProps = {
  wordWrap: true
}
const contextTypes = providerContextTypes

const Caption = (props, context) => {
  const {
    className,
    children,
    wordWrap,
    ...rest
  } = props
  const {theme} = context
  const isThemeEmbed = theme === 'embed'

  const componentClassName = classNames(
    'c-MessageCaption',
    theme && `is-theme-${theme}`,
    className
  )

  const textSize = isThemeEmbed ? '11' : '13'

  return (
    <div className={componentClassName} {...rest}>
      <Text
        className='c-MessageCaption__text'
        size={textSize}
        shade='faint'
        wordWrap={wordWrap}
      >
        {children}
      </Text>
    </div>
  )
}

Caption.propTypes = propTypes
Caption.defaultProps = defaultProps
Caption.contextTypes = contextTypes
Caption.displayName = 'MessageCaption'

export default Caption
