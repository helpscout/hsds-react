import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { ShadowUI } from './Toolbar.css'

export const ToolbarShadow = props => {
  const { className, children, placement, ...rest } = props

  const componentClassName = classNames(
    'c-ToolbarShadow',
    placement && `is-placement-${placement}`,
    className
  )

  return <ShadowUI {...rest} className={componentClassName} />
}

ToolbarShadow.defaultProps = {
  placement: 'top',
}
ToolbarShadow.propTypes = {
  placement: PropTypes.oneOf(['top', 'bottom']),
}

export default ToolbarShadow
