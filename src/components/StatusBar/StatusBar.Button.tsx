import * as React from 'react'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'

import { StatusBarButtonUI } from './styles/StatusBar.css'

const Button = props => {
  const { children, className, icon, ...rest } = props

  const componentClassName = classNames('c-StatusBarButton', className)

  const iconMarkup = icon ? (
    <Icon className="c-StatusBarButton__icon" inline name={icon} size="12" />
  ) : null

  return (
    <StatusBarButtonUI className={componentClassName} {...rest}>
      {children}
      {iconMarkup}
    </StatusBarButtonUI>
  )
}

Button.displayName = 'StatusBarButton'

export default Button
