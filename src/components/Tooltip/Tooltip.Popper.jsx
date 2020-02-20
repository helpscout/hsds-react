import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { PopperUI } from './Tooltip.css'

export class Popper extends React.PureComponent {
  static defaultProps = {
    innerRef: noop,
  }

  static className = 'c-TooltipPopper'

  getClassName() {
    const { className } = this.props

    return classNames(Popper.className, className)
  }

  render() {
    const { children, className, innerRef, theme, ...rest } = this.props

    return (
      <PopperUI
        {...getValidProps(rest)}
        ref={innerRef}
        className={this.getClassName()}
      >
        {children}
      </PopperUI>
    )
  }
}

Popper.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  innerRef: PropTypes.func,
  theme: PropTypes.string,
}

export default Popper
