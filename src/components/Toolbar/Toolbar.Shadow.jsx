import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { ShadowUI } from './Toolbar.css'

const defaultProps = {
  placement: 'top',
}

export const Shadow = props => {
  const { className, children, placement, ...rest } = props

  const componentClassName = classNames(
    'c-ToolbarShadow',
    placement && `is-placement-${placement}`,
    className
  )

  return <ShadowUI {...rest} className={componentClassName} />
}

Shadow.defaultProps = defaultProps

export default Shadow
