import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

class Emoji extends React.PureComponent {
  static className = 'c-EmojiPickerView'

  getClassName() {
    const { className } = this.props

    return classNames(Emoji.className, className)
  }

  render() {
    const { name, symbol, ...rest } = this.props

    return (
      <span
        {...getValidProps(rest)}
        role="img"
        aria-label={name}
        className={this.getClassName()}
      >
        {symbol}
      </span>
    )
  }
}

Emoji.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  symbol: PropTypes.string,
}

Emoji.defaultProps = {
  'data-cy': 'EmojiPickerEmoji',
  className: '',
  name: 'Unicorn Face',
  symbol: '🦄',
}

export default Emoji
