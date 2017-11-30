import React from 'react'
import PropTypes from 'prop-types'
import ICONS from './icons'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { sizeTypes } from './propTypes'

export const propTypes = {
  center: PropTypes.bool,
  className: PropTypes.string,
  clickable: PropTypes.bool,
  ignoreClick: PropTypes.bool,
  faint: PropTypes.bool,
  inline: PropTypes.bool,
  muted: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: sizeTypes,
  subtle: PropTypes.bool,
  title: PropTypes.string
}

const defaultProps = {
  center: false,
  clickable: false,
  ignoreClick: true,
  muted: false,
  name: null,
  onClick: noop,
  size: '20'
}

const Icon = props => {
  const {
    center,
    className,
    clickable,
    faint,
    ignoreClick,
    inline,
    muted,
    onClick,
    name,
    size,
    subtle,
    title,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Icon',
    center && 'is-center',
    clickable && 'is-clickable',
    !clickable && ignoreClick && 'is-noInteract',
    faint && 'is-faint',
    inline && 'is-inline',
    muted && 'is-muted',
    subtle && 'is-subtle',
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
