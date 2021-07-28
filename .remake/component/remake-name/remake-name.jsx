import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import { <%= name %>UI } from './<%= name %>.css'

export class <%= name %> extends React.Component {
  constructor(props) {
    super(props)

    this.<%= name %>Ref = React.createRef()
  }

  getClassName() {
    const { className } = this.props
    
    return classNames(
      'c-<%= name %>',
      className
    )
  }

  render() {
    const { children, ref, ...rest } = this.props

    return (
      <<%= name %>UI
        {...rest}
        className={this.getClassName()}
        ref={this.<%= name %>Ref}
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
