import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import { ShadowUI } from './Toolbar.css'

export const ToolbarShadow = props => {
  const { className, children, placement, ...rest } = props

  const componentClassName = classNames(
    'c-ToolbarShadow',
    placement && `is-placement-${placement}`,
    className
  )

  return <ShadowUI {...getValidProps(rest)} className={componentClassName} />
}

ToolbarShadow.defaultProps = {
  placement: 'top',
}

ToolbarShadow.propTypes = {
  /** Determines the shadow placement on the component. */
  placement: PropTypes.oneOf(['top', 'bottom']),
}

export default ToolbarShadow
