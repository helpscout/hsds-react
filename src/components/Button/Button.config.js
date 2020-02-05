import { getColor } from '../../styles/utilities/color'

const config = {
  borderRadius: 3,
  fontWeight: 'normal',
  iconOffset: 4,
  primary: {
    backgroundColor: getColor('blue.500'),
    backgroundColorHover: getColor('blue.600'),
    backgroundColorActive: getColor('blue.700'),
    borderColor: getColor('blue.500'),
    borderColorHover: getColor('blue.600'),
    borderColorActive: getColor('blue.700'),
    color: 'white',
    disabledBackgroundColor: getColor('grey.500'),
    disabledBorderColor: getColor('grey.500'),
    disabledColor: 'white',
    fontWeight: 500,
    danger: {
      backgroundColor: getColor('red.500'),
      backgroundColorHover: getColor('red.600'),
      backgroundColorActive: getColor('red.700'),
      borderColor: getColor('red.500'),
      borderColorHover: getColor('red.600'),
      borderColorActive: getColor('red.700'),
      color: 'white',
      colorHover: 'white',
      colorActive: 'white',
    },
    gray: {
      backgroundColor: getColor('charcoal.200'),
      backgroundColorHover: getColor('charcoal.300'),
      backgroundColorActive: getColor('charcoal.400'),
      borderColor: getColor('charcoal.200'),
      borderColorHover: getColor('charcoal.300'),
      borderColorActive: getColor('charcoal.400'),
      color: 'white',
      colorHover: 'white',
      colorActive: 'white',
    },
    success: {
      backgroundColor: getColor('green.500'),
      backgroundColorHover: getColor('green.600'),
      backgroundColorActive: getColor('green.700'),
      borderColor: getColor('green.500'),
      borderColorHover: getColor('green.600'),
      borderColorActive: getColor('green.700'),
      color: 'white',
      colorHover: 'white',
      colorActive: 'white',
    },
    warning: {
      backgroundColor: getColor('yellow.600'),
      backgroundColorHover: getColor('yellow.700'),
      backgroundColorActive: getColor('yellow.800'),
      borderColor: getColor('yellow.600'),
      borderColorHover: getColor('yellow.700'),
      borderColorActive: getColor('yellow.800'),
      color: 'white',
      colorHover: 'white',
      colorActive: 'white',
    },
  },
  primaryAlt: {
    backgroundColor: getColor('purple.500'),
    backgroundColorHover: getColor('purple.600'),
    backgroundColorActive: getColor('purple.700'),
    borderColor: getColor('purple.500'),
    borderColorHover: getColor('purple.600'),
    borderColorActive: getColor('purple.700'),
    color: 'white',
    disabledBackgroundColor: getColor('grey.500'),
    disabledBorderColor: getColor('grey.500'),
    disabledColor: 'white',
    fontWeight: 500,
    danger: {
      backgroundColor: getColor('red.500'),
      backgroundColorHover: getColor('red.600'),
      backgroundColorActive: getColor('red.700'),
      borderColor: getColor('red.500'),
      borderColorHover: getColor('red.600'),
      borderColorActive: getColor('red.700'),
      color: 'white',
      colorHover: 'white',
      colorActive: 'white',
    },
    success: {
      backgroundColor: getColor('green.500'),
      backgroundColorHover: getColor('green.600'),
      backgroundColorActive: getColor('green.700'),
      borderColor: getColor('green.500'),
      borderColorHover: getColor('green.600'),
      borderColorActive: getColor('green.700'),
      color: 'white',
      colorHover: 'white',
      colorActive: 'white',
    },
  },
  secondary: {
    backgroundColor: 'white',
    backgroundColorHover: 'white',
    backgroundColorActive: getColor('grey.200'),
    borderColor: getColor('grey.700'),
    borderColorHover: getColor('charcoal.200'),
    borderColorActive: getColor('charcoal.200'),
    color: getColor('charcoal.400'),
    disabledBackgroundColor: 'white',
    disabledBorderColor: getColor('grey.500'),
    disabledColor: getColor('grey.600'),
  },
  secondaryAlt: {
    backgroundColor: 'white',
    backgroundColorHover: 'white',
    backgroundColorActive: getColor('green.100'),
    borderColor: getColor('green.500'),
    borderColorHover: getColor('green.600'),
    borderColorActive: getColor('green.700'),
    color: getColor('green.500'),
    disabledBackgroundColor: 'white',
    disabledBorderColor: getColor('grey.500'),
    disabledColor: getColor('grey.600'),
  },
  tertiary: {
    backgroundColor: getColor('grey.200'),
    backgroundColorHover: getColor('grey.200'),
    backgroundColorActive: getColor('grey.200'),
    borderColor: getColor('grey.700'),
    borderColorHover: getColor('charcoal.200'),
    borderColorActive: getColor('charcoal.200'),
    color: getColor('charcoal.400'),
    disabledBackgroundColor: 'white',
    disabledBorderColor: getColor('grey.500'),
    disabledColor: getColor('grey.600'),
  },
  default: {
    backgroundColor: 'transparent',
    backgroundColorHover: 'transparent',
    backgroundColorActive: 'transparent',
    borderColor: 'transparent',
    borderColorHover: 'transparent',
    borderColorActive: 'transparent',
    color: getColor('charcoal.200'),
    colorHover: getColor('charcoal.300'),
    colorActive: getColor('charcoal.400'),
    disabledBackgroundColor: 'transparent',
    disabledBorderColor: 'transparent',
    disabledColor: getColor('grey.700'),
    minWidth: 'initial',
    padding: 0,
    textDecoration: 'none',
    textDecorationHover: 'underline',
    textDecorationActive: 'underline',
    textDecorationFocus: 'underline',
    danger: {
      backgroundColor: 'transparent',
      backgroundColorHover: 'transparent',
      backgroundColorActive: 'transparent',
      borderColor: 'transparent',
      borderColorHover: 'transparent',
      borderColorActive: 'transparent',
      color: getColor('red.500'),
      colorHover: getColor('red.600'),
      colorActive: getColor('red.700'),
    },
  },
  link: {
    backgroundColor: 'transparent',
    backgroundColorHover: 'transparent',
    backgroundColorActive: 'transparent',
    borderColor: 'transparent',
    borderColorHover: 'transparent',
    borderColorActive: 'transparent',
    color: getColor('link.base'),
    colorHover: getColor('link.hover'),
    colorActive: getColor('link.active'),
    disabledBackgroundColor: 'transparent',
    disabledBorderColor: 'transparent',
    disabledColor: getColor('grey.700'),
    minWidth: 'initial',
    padding: 0,
    textDecoration: 'none',
    textDecorationHover: 'underline',
    textDecorationActive: 'underline',
    textDecorationFocus: 'underline',
  },
  disabled: {
    backgroundColor: getColor('grey.500'),
  },
  focusOutlineWidth: 2,
  focusOutlineOffset: 2,
  focusOutlineColor: getColor('blue.400'),
  shape: {
    default: '3px',
    circle: '9999px',
    rounded: '16px',
  },
  size: {
    xl: {
      fontSize: 14,
      height: 50,
      minWidth: 'initial',
      padding: 30,
    },
    lg: {
      fontSize: 14,
      height: 40,
      minWidth: 'initial',
      padding: 30,
    },
    md: {
      fontSize: 14,
      height: 35,
      minWidth: 'initial',
      padding: 30,
    },
    sm: {
      fontSize: 13,
      fontWeight: 500,
      height: 30,
      minWidth: 'initial',
      padding: 15,
    },
    xs: {
      fontSize: 13,
      fontWeight: 500,
      height: 24,
      minWidth: 'initial',
      padding: 15,
    },
    xxs: {
      fontSize: 11,
      fontWeight: 500,
      height: 20,
      minWidth: 'initial',
      padding: 6,
    },
  },
  suffix: {
    backgroundColor: getColor('grey.200'),
    backgroundColorHover: getColor('grey.300'),
    backgroundColorActive: getColor('grey.400'),
    borderColor: getColor('grey.700'),
    borderColorHover: getColor('charcoal.200'),
    borderColorActive: getColor('charcoal.200'),
    color: getColor('charcoal.400'),
    disabledBackgroundColor: getColor('grey.300'),
    disabledBorderColor: getColor('grey.500'),
    disabledColor: getColor('grey.600'),
    minWidth: 'initial',
    padding: '8px',
  },
}

export default config
