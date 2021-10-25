import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { noop } from '../../utilities/other'
import { <%= name %>UI } from './<%= name %>.css'

function <%= name %>({
  className,
  'data-cy': dataCy = '<%= name %>',
  onClick = noop,
}) {
  const [] = useState()

  return (
    <<%= name %>UI
      className={classNames('c-<%= name %>', className)}
      data-cy={dataCy}
      onClick={onClick}
    />
  )
}

<%= name %>.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Callback when clicking */
  onClick: PropTypes.func,
}

export default <%= name %>
