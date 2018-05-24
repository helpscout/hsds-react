import React from 'react'
import Icon from '../Icon'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { sizeTypes } from './propTypes'

export const propTypes = {
  size: sizeTypes,
}

const defaultProps = {
  size: 'md',
}

export const iconSizes = {
  xl: '32',
  lg: '24',
  md: '20',
  sm: '14',
  xs: '10',
}

const Spinner = props => {
  const { className, children, size, ...rest } = props

  const componentClassName = classNames('c-Spinner', className)

  return (
    <div className={componentClassName} aria-busy="true" {...rest}>
      <Icon className="c-Spinner__icon" name="spinner" size={iconSizes[size]} />
      <VisuallyHidden>Loading</VisuallyHidden>
    </div>
  )
}

Spinner.propTypes = propTypes
Spinner.defaultProps = defaultProps
Spinner.displayName = 'Spinner'

export default Spinner
