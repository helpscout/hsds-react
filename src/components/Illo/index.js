import React from 'react'
import PropTypes from 'prop-types'
import ILLOS from './illos'
import classNames from '../../utilities/classNames'
import Centralize from '../Centralize'
import VisuallyHidden from '../VisuallyHidden'
import { sizeTypes } from './propTypes'

export const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: sizeTypes,
  title: PropTypes.string
}

const defaultProps = {
  size: '60'
}

const Illo = props => {
  const {
    className,
    name,
    size,
    title,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Illo',
    size && `is-${size}`,
    className
  )

  const src = { __html: ILLOS[name] }
  const iconTitle = title || name

  return (
    <span
      className={componentClassName}
      data-illo-name={name}
      {...rest}
    >
      <Centralize>
        <span
          className='c-Illo__icon'
          dangerouslySetInnerHTML={src}
          title={iconTitle}
        />
      </Centralize>
      <VisuallyHidden>{iconTitle}</VisuallyHidden>
    </span>
  )
}

Illo.propTypes = propTypes
Illo.defaultProps = defaultProps

export default Illo
