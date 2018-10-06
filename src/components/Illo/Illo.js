// @flow
import type { IlloSize } from './types'
import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import ILLOS from './illos'
import Centralize from '../Centralize'
import VisuallyHidden from '../VisuallyHidden'
import { classNames } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import { IlloUI, IconUI } from './styles/Illo.css.js'
import { COMPONENT_KEY } from './utils'

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

  const makeStyle = (color: string): string =>
    color && color.length ? `style="fill: ${color};"` : ''

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

namespaceComponent(COMPONENT_KEY)(Illo)

export default Illo
