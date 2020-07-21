import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Icon from '../Icon'
import { classNames } from '../../utilities/classNames'
import { StatusBarButtonUI } from './StatusBar.css'

const StatusBarButton = props => {
  const { children, className, icon, ...rest } = props
  const componentClassName = classNames('c-StatusBarButton', className)
  const iconMarkup = icon ? (
    <Icon className="c-StatusBarButton__icon" inline name={icon} size="12" />
  ) : null

  return (
    <StatusBarButtonUI {...getValidProps(rest)} className={componentClassName}>
      {children}
      {iconMarkup}
    </StatusBarButtonUI>
  )
}

StatusBarButton.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Add an 'Icon' name to render in the button */
  icon: PropTypes.string,
}

StatusBarButton.defaultProps = {
  'data-cy': 'StatusBarButton',
}

export default StatusBarButton
