import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { SuffixUI } from './Input.css'

class Suffix extends React.PureComponent {
  static displayName = 'InputSuffix'
  static defaultProps = {
    isAction: false,
    isSeamless: false,
  }

  render() {
    const { className, isAction, isSeamless, ...rest } = this.props

    const componentClassName = classNames(
      'c-InputSuffix',
      'c-Input__item',
      'c-Input__suffix',
      isAction && 'is-action',
      isSeamless && 'is-seamless',
      className
    )

    return <SuffixUI {...getValidProps(rest)} className={componentClassName} />
  }
}

Suffix.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  isAction: PropTypes.bool,
  /** Removes the border around the input. */
  isSeamless: PropTypes.bool,
}

export default Suffix
