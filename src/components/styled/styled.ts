import { createStyled } from '@helpscout/fancy'
import base from '../../styles/resets/base.css'
import baseStyles from '../../styles/resets/baseStyles.css'
import { getColor, rgba } from '../../styles/utilities/color'
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
  forEach,
  getColor,
  getShadow,
  isBeacon,
  isHSApp,
  makeFontFamily,
  makeFontFamilyMono,
  resetStyles: base,
  rgba,
  setFontSize,
}

const extraArguments = {
  _: extras,
}

const styled = createStyled({ pure: true, extraArguments })
styled._ = extras

export default styled
