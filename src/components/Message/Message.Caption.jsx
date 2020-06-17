import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'

const MessageCaption = (props, context) => {
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
    <div {...getValidProps(rest)} className={componentClassName}>
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

MessageCaption.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  size: PropTypes.string,
  wordWrap: PropTypes.bool,
}

MessageCaption.contextTypes = {
  theme: noop,
}

MessageCaption.defaultProps = {
  'data-cy': 'MessageCaption',
  wordWrap: true,
}

export default MessageCaption
