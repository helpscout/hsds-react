// @flow
import React from 'react'
import PropTypes from 'prop-types'
import ILLOS from './illos'
import Centralize from '../Centralize'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import type { IlloSize } from './types'

type Props = {
  color?: string,
  colorSecondary?: string,
  colorUi?: string,
  colorUiDark?: string,
  colorUiLight?: string,
  colorUiTransparent?: string,
  colorUiWhite?: string,
  className?: string,
  name: string,
  size: IlloSize,
  style?: Object,
  title?: string,
}

const Illo = (props: Props) => {
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

  const src = { __html: ILLOS[name] }
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
    <span
      className={componentClassName}
      data-illo-name={name}
      style={componentStyle}
      {...rest}
    >
      <Centralize>
        <span
          className="c-Illo__icon"
          dangerouslySetInnerHTML={srcHTML}
          title={iconTitle}
        />
      </Centralize>
      <VisuallyHidden>{iconTitle}</VisuallyHidden>
    </span>
  )
}

export const injectFillColorIntoSvg = (
  svgHTML: string,
  props: Object = {
    primary: '',
    secondary: '',
    ui: '',
    uiLight: '',
    uiDark: '',
    uiTransparent: '',
    uiWhite: '',
  }
) => {
  if (typeof svgHTML !== 'string' || !svgHTML.length) return ''
  const {
    primary,
    secondary,
    ui,
    uiLight,
    uiDark,
    uiTransparent,
    uiWhite,
  } = props

  const makeStyle = color =>
    color && color.length ? `style="fill: ${color};"` : null

  return svgHTML
    .replace('data-path-primary=""', makeStyle(primary))
    .replace('data-path-secondary=""', makeStyle(secondary))
    .replace('data-path-ui=""', makeStyle(ui))
    .replace('data-path-uiDark=""', makeStyle(uiDark))
    .replace('data-path-uiLight=""', makeStyle(uiLight))
    .replace('data-path-uiTransparent=""', makeStyle(uiTransparent))
    .replace('data-path-uiWhite=""', makeStyle(uiWhite))
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
