import React from 'react'
import { classNames } from '../../utilities/classNames.ts'
import { placementTypes } from './propTypes'

export const propTypes = {
  placement: placementTypes,
}

const defaultProps = {
  placement: 'top',
}

const Shadow = props => {
  const { className, children, placement, ...rest } = props

  const componentClassName = classNames(
    'c-ToolbarShadow',
    placement && `is-placement-${placement}`,
    className
  )

  return <div className={componentClassName} {...rest} />
}

Shadow.propTypes = propTypes
Shadow.defaultProps = defaultProps
Shadow.displayName = 'ToolbarShadow'

export default Shadow
