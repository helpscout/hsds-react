import React from 'react'
import PropTypes from 'prop-types'
import fancy from '@helpscout/fancy'
import EMOTICONS from './emoticons'
import css from './styles/Emoticon.css'
import classNames from '../../utilities/classNames'
import { sizeTypes } from './propTypes'

const Component = props => {
  const {
    className,
    center,
    clickable,
    isActive,
    inline,
    name,
    title,
    size,
    styles,
    ...rest
  } = props

  const src = { __html: EMOTICONS[name] }
  const componentClassName = classNames(
    styles['c-Emoticon'],
    'c-Emoticon',
    !clickable && 'is-noInteract',
    center && 'is-center',
    inline && 'is-inline',
    isActive && 'is-active',
    size && `is-${size}`,
    className
  )

  return (
    <span className={componentClassName} {...rest}>
      <span
        className={classNames(styles['c-Emoticon__icon'], 'c-Emoticon__icon')}
        dangerouslySetInnerHTML={src}
        title={title}
      />
    </span>
  )
}

const Emoticon = fancy(css)(Component)

Emoticon.propTypes = {
  center: PropTypes.bool,
  clickable: PropTypes.bool,
  inline: PropTypes.bool,
  isActive: PropTypes.bool,
  name: PropTypes.string.isRequired,
  size: sizeTypes,
  title: PropTypes.string,
}

Emoticon.defaultProps = {
  center: false,
  clickable: true,
  isActive: true,
  name: 'happy',
  size: 'md',
  title: '',
}

Emoticon.displayName = 'Emoticon'

export default Emoticon
