import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { TypingDotsUI, DotUI } from './TypingDots.css'

class TypingDots extends React.PureComponent {
  static className = 'c-TypingDots'

  getClassName() {
    const { className } = this.props
    return classNames(TypingDots.className, className)
  }

  render() {
    const { className, ...rest } = this.props

    return (
      <TypingDotsUI {...getValidProps(rest)} className={this.getClassName()}>
        <DotUI delay="0s" opacity="1" />
        <DotUI delay="-1.1s" opacity=".6" />
        <DotUI delay="-0.9s" opacity=".2" />
      </TypingDotsUI>
    )
  }
}

TypingDots.defaultProps = {
  'data-cy': 'TypingDots',
}

TypingDots.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  'data-cy': PropTypes.string,
}

export default TypingDots
