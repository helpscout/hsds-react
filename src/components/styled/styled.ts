import { createStyled } from '@helpscout/fancy'
import base from '../../styles/resets/base.css'
import baseStyles from '../../styles/resets/baseStyles.css'
import {
  darken,
  getColor,
  lighten,
  rgb,
  rgba,
} from '../../styles/utilities/color'
import {
  addFontSmoothing,
  makeFontFamily,
  makeFontFamilyMono,
  setFontSize,
} from '../../styles/utilities/font'
import { getShadow } from '../../styles/utilities/shadow'
import forEach from '../../styles/utilities/forEach'
import { isBeacon, isHSApp } from '../../styles/utilities/theme'

const extras = {
  addFontSmoothing,
  baseStyles,
  darken,
  forEach,
  getColor,
  getShadow,
  isBeacon,
  isHSApp,
  lighten,
  makeFontFamily,
  makeFontFamilyMono,
  resetStyles: base,
  rgb,
  rgba,
  setFontSize,
}

const extraArguments = {
  _: extras,
}

const styled = createStyled({ pure: true, extraArguments })
styled._ = extras

export default styled
