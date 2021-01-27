import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { DropListUI } from './DropList.css'

export class DropList extends React.Component {
  constructor(props) {
    super(props)

    this.DropListRef = React.createRef()
  }

  getClassName() {
    const { className } = this.props

    return classNames('c-DropList', className)
  }

  render() {
    const { children, ref, ...rest } = this.props

    return (
      <DropListUI
        {...rest}
        className={this.getClassName()}
        ref={this.DropListRef}
      >
        {children}
      </DropListUI>
    )
  }
}

DropList.defaultProps = {
  'data-cy': 'DropList',
}

DropList.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default DropList
