import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { CentralizeUI } from './Centralize.css'

export class Centralize extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.func,
  }
  static defaultProps = {
    innerRef: noop,
  }

  static className = 'c-Centralize'

  getClassName() {
    const { className } = this.props

    return classNames(Centralize.className, className)
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <CentralizeUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
      >
        {children}
      </CentralizeUI>
    )
  }
}

export default Centralize
