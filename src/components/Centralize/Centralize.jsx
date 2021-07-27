import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import { CentralizeUI } from './Centralize.css'

export class Centralize extends React.PureComponent {
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

Centralize.defaultProps = {
  'data-cy': 'Centralize',
  innerRef: noop,
}

Centralize.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
}

export default Centralize
