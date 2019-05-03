import * as React from 'react'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'

const Button = props => {
  const { children, className, icon, ...rest } = props

  const componentClassName = classNames('c-StatusBarButton', className)

  const iconMarkup = icon ? (
    <Icon className="c-StatusBarButton__icon" inline name={icon} size="12" />
  ) : null

  return (
    <button className={componentClassName} {...rest}>
      {children}
      {iconMarkup}
    </button>
  )
}

Button.displayName = 'StatusBarButton'

export default Button
