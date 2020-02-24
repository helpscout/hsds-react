import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import BadgeUI from './Badge.css'

class Badge extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    count: PropTypes.bool,
    display: PropTypes.oneOf(['block', 'inlineBlock']),
    inverted: PropTypes.bool,
    isSquare: PropTypes.bool,
    size: PropTypes.string,
    status: PropTypes.string,
    style: PropTypes.any,
    textColor: PropTypes.string,
    white: PropTypes.bool,
  }
  static defaultProps = {
    display: 'inlineBlock',
    inverted: false,
    color: '',
    textColor: '',
  }

  static displayName = 'Badge'

  render() {
    const {
      children,
      color,
      count,
      className,
      display,
      inverted,
      isSquare,
      size,
      status,
      textColor,
      white,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Badge',
      count && 'is-count',
      display && `is-display-${display}`,
      isSquare && `is-square`,
      size && `is-${size}`,
      status && `is-${status}`,
      white && 'is-white',
      className
    )

    return (
      <BadgeUI
        {...{ ...getValidProps(rest), color, inverted, textColor }}
        className={componentClassName}
      >
        {children}
      </BadgeUI>
    )
  }
}

export default Badge