import React from 'react'
import PropTypes from 'prop-types'
import ICONS from './icons'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import VisuallyHidden from '../VisuallyHidden'
import { sizeTypes } from './propTypes'

export const propTypes = {
  center: PropTypes.bool,
  className: PropTypes.string,
  clickable: PropTypes.bool,
  ignoreClick: PropTypes.bool,
  inline: PropTypes.bool,
  muted: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: sizeTypes,
  title: PropTypes.string
}

const defaultProps = {
  clickable: false,
  center: false,
  ignoreClick: true,
  muted: false,
  name: null,
  onClick: noop
}

const Icon = props => {
  const {
    center,
    className,
    clickable,
    ignoreClick,
    inline,
    muted,
    onClick,
    name,
    size,
    title,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Icon',
    center && 'is-center',
    clickable && 'is-clickable',
    !clickable && ignoreClick && 'is-noInteract',
    inline && 'is-inline',
    muted && 'is-muted',
    size && `is-${size}`,
    className
  )

  const src = { __html: ICONS[name] }
  const iconTitle = title || name

  return (
    <span
      className={componentClassName}
      onClick={onClick}
      data-icon-name={name}
      {...rest}
    >
      <span
        className='c-Icon__icon'
        dangerouslySetInnerHTML={src}
        title={iconTitle}
      />
      <VisuallyHidden>{iconTitle}</VisuallyHidden>
    </span>
  )
}

Icon.propTypes = propTypes
Icon.defaultProps = defaultProps

export default Icon
