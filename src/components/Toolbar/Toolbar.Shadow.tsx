import * as React from 'react'
import { classNames } from '../../utilities/classNames'

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

Shadow.defaultProps = defaultProps

export default Shadow
