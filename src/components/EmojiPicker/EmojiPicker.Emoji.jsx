import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

class Emoji extends React.PureComponent {
  static className = 'c-EmojiPickerView'

  static defaultProps = {
    'data-cy': 'EmojiPickerEmoji',
    className: '',
    name: 'Unicorn Face',
    symbol: '🦄',
  }

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
  /** The className of the component. */
  className: PropTypes.string,
  /** The name of the emoji. */
  name: PropTypes.string,
  /** The emoji symbol. */
  symbol: PropTypes.string,
}

export default Emoji
