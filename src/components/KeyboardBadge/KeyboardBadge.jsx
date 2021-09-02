import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { KeyboardBadgeUI } from './KeyboardBadge.css'

const isApple = () => {
  return (
    typeof navigator !== 'undefined' && /Mac OS X/.test(navigator.userAgent)
  )
}

const IS_APPLE = isApple()

const formatHotkey = hotkey => {
  if (!hotkey) return ''

  // !we need to recalculate when in test mode so we can test correctly for Mac, PC and linux
  const apple = process.env.NODE_ENV === 'test' ? isApple() : IS_APPLE

  return hotkey
    .replaceAll('+', ' + ')
    .replaceAll('mod', apple ? '⌘' : 'Ctrl')
    .split(' ')
    .map(t => {
      if (t.length < 2) return t
      return t.charAt(0).toUpperCase() + t.slice(1)
    })
    .join(' ')
}

function KeyboardBadge(props) {
  const { className, children, value, ...rest } = props
  const componentClassName = classNames('c-KeyboardBadge', className)

  return (
    <KeyboardBadgeUI
      {...getValidProps(rest)}
      data-testid="KeyboardBadge"
      className={componentClassName}
    >
      {formatHotkey(value)}
    </KeyboardBadgeUI>
  )
}

KeyboardBadge.defaultProps = {
  'data-cy': 'KeyboardBadge',
}

KeyboardBadge.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Text of what will appear in the badge */
  value: PropTypes.string.isRequired,
}

export default KeyboardBadge
