import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { PrefixUI } from './Input.css'

class Prefix extends React.PureComponent {
  static displayName = 'InputPrefix'

  static defaultProps = {
    isSeamless: false,
  }

  render() {
    const { className, isSeamless, ...rest } = this.props

    const componentClassName = classNames(
      'c-InputPrefix',
      'c-Input__item',
      'c-Input__prefix',
      isSeamless && 'is-seamless',
      className
    )

    return <PrefixUI {...getValidProps(rest)} className={componentClassName} />
  }
}

Prefix.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Removes the border around the input. */
  isSeamless: PropTypes.bool,
}

export default Prefix
