import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { <%= name %>UI } from './styles/<%= name %>.css'

export class <%= name %> extends React.Component {
  static className = 'c-<%= name %>'

  getClassName() {
    const { className } = this.props
    return classNames(
      <%= name %>.className,
      className
    )
  }

  render() {
    const { children, ref, ...rest } = this.props

    return (
      <<%= name %>UI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
      >
        {children}
      </<%= name %>UI>
    )
  }
}

<%= name %>.defaultProps = {
  'data-cy': '<%= name %>',
}

<%= name %>.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default <%= name %>
