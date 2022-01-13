import { getColor } from '../../styles/utilities/color'

const config = {
  borderRadius: 3,
  fontWeight: 500,
  iconOffset: 4,
  focusOutlineWidth: 2,
  focusOutlineOffset: 3,
  focusOutlineColor: getColor('blue.500'),
  textColor: 'white',
  theme: {
    blue: {
      mainColor: getColor('blue.500'),
      hoverColor: getColor('blue.600'),
      outline: {
        borderColor: getColor('blue.500'),
        textColor: getColor('blue.600'),
        textHoverColor: getColor('blue.700'),
        hoverColor: getColor('blue.100'),
        hoverColorIconOnly: getColor('blue.200'),
        textColorSeamlessHover: getColor('blue.800'),
      },
    },
    grey: {
      mainColor: getColor('charcoal.400'),
      hoverColor: getColor('charcoal.500'),
      outline: {
        borderColor: getColor('grey.700'),
        borderHoverColor: getColor('grey.800'),
        textColor: getColor('charcoal.400'),
        textHoverColor: getColor('charcoal.500'),
        hoverColor: getColor('grey.200'),
        hoverColorIconOnly: getColor('grey.300'),
        textColorSeamlessHover: getColor('charcoal.800'),
      },
    },
    red: {
      mainColor: getColor('pink.950'),
      hoverColor: getColor('pink.1000'),
      outline: {
        borderColor: getColor('pink.900'),
        textColor: getColor('pink.950'),
        textHoverColor: getColor('pink.1000'),
        hoverColorIconOnly: getColor('pink.200'),
        hoverColor: getColor('pink.100'),
      },
    },
    green: {
      mainColor: getColor('green.750'),
      hoverColor: getColor('green.800'),
      outline: {
        borderColor: getColor('green.500'),
        textColor: getColor('green.750'),
        textHoverColor: getColor('green.800'),
        hoverColor: getColor('green.100'),
        hoverColorIconOnly: getColor('green.200'),
        textColorSeamlessHover: getColor('green.900'),
      },
    },
  },
  size: {
    xxl: {
      fontSize: 14,
      height: '50px',
      padding: '30px',
      roundedPadding: '20px',
      minWidth: '200px',
    },
    xl: {
      fontSize: 14,
      height: '44px',
      padding: '30px',
      roundedPadding: '20px',
      minWidth: '120px',
    },
    lg: {
      fontSize: 14,
      height: '40px',
      padding: '30px',
      roundedPadding: '20px',
      minWidth: '120px',
    },
    md: {
      fontSize: 14,
      height: '35px',
      padding: '30px',
      roundedPadding: '20px',
      minWidth: '90px',
    },
    sm: {
      fontSize: 13,
      height: '30px',
      padding: '15px',
      minWidth: '90px',
    },
    xs: {
      fontSize: 13,
      height: '24px',
      padding: '15px',
    },
    xxs: {
      fontSize: 11,
      height: '20px',
      padding: '6px',
    },
  },
}

export default config
