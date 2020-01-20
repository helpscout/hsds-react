import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Centralize from '../Centralize'
import VisuallyHidden from '../VisuallyHidden'
import { classNames } from '../../utilities/classNames'

import { IlloUI, IconUI } from './styles/Illo.css'
import { injectFillColorIntoSvg, svgSet } from './Illo.utils'
import { IlloProps } from './Illo.types'

const Illo = (props: IlloProps) => {
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

  const src = { __html: svgSet[name] }
  const iconTitle = title || name
  const componentStyle = { ...style, color }
  const srcRawHTML = src.__html

  const svgColorProps = {
    primary: color,
    secondary: colorSecondary,
    ui: colorUi,
    uiDark: colorUiDark,
    uiLight: colorUiLight,
    uiTransparent: colorUiTransparent,
    uiWhite: colorUiWhite,
  }

  const srcHTML = {
    __html: injectFillColorIntoSvg(srcRawHTML, svgColorProps),
  }

  return (
    <IlloUI
      {...getValidProps(rest)}
      className={componentClassName}
      data-illo-name={name}
      style={componentStyle}
    >
      <Centralize>
        <IconUI
          className="c-Illo__icon"
          dangerouslySetInnerHTML={srcHTML}
          title={iconTitle}
        />
      </Centralize>
      <VisuallyHidden>{iconTitle}</VisuallyHidden>
    </IlloUI>
  )
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
