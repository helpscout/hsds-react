import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Centralize from '../Centralize'
import VisuallyHidden from '../VisuallyHidden'
import { classNames } from '../../utilities/classNames'

import { IlloUI, IconUI } from './Illo.css'
import { svgSet } from './Illo.utils'

const Illo = props => {
  const {
    className,
    color,
    colorSecondary,
    colorUi,
    colorUiDark,
    colorUiLight,
    colorUiTransparent,
    colorUiWhite,
    name,
    size,
    style,
    title,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Illo',
    color && 'has-color',
    colorSecondary && 'has-colorSecondary',
    size && `is-${size}`,
    className
  )

  const IlloComponent = svgSet[name]
  const iconTitle = title || name
  const componentStyle = { ...style, color }

  return (
    <IlloUI
      {...getValidProps(rest)}
      className={componentClassName}
      data-illo-name={name}
      style={componentStyle}
    >
      <Centralize>
        <IconUI className="c-Illo__icon" title={iconTitle}>
          {IlloComponent && <IlloComponent />}
        </IconUI>
      </Centralize>
      <VisuallyHidden>{iconTitle}</VisuallyHidden>
    </IlloUI>
  )
}

Illo.propTypes = {
  color: PropTypes.string,
  colorSecondary: PropTypes.string,
  colorUi: PropTypes.string,
  colorUiDark: PropTypes.string,
  colorUiLight: PropTypes.string,
  colorUiTransparent: PropTypes.string,
  colorUiWhite: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['40', '60', '72', '80', '90']),
  style: PropTypes.any,
  title: PropTypes.string,
}

Illo.defaultProps = {
  color: '',
  colorSecondary: '',
  colorUi: '',
  colorUiDark: '',
  colorUiLight: '',
  colorUiTransparent: 'transparent',
  colorUiWhite: 'white',
  size: '60',
}

export default Illo
