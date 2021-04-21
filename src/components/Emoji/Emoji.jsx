/* istanbul ignore file */
// No need to test this Component
import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

function Emoji({
  'data-cy': dataCy = 'EmojiPickerEmoji',
  className = '',
  name = 'Unicorn Face',
  symbol = '🦄',
  ...rest
}) {
  return (
    <span
      {...getValidProps(rest)}
      aria-label={name}
      className={classNames('c-EmojiPickerView', className)}
      role="img"
    >
      {symbol}
    </span>
  )
}

Emoji.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** The name of the emoji. */
  name: PropTypes.string,
  /** The emoji symbol. */
  symbol: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Emoji
