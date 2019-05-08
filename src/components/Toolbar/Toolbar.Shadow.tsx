import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { ShadowUI } from './styles/Toolbar.css'

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
