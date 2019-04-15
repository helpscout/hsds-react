import { getColor } from '../../../styles/utilities/color'

export const defaultTheme = {
  fontColorHeader: getColor('charcoal.500'),
  fontColorBody: getColor('charcoal.500'),
  fontColorAlternate: getColor('charcoal.500'),
  bgColor: getColor('grey.200'),
  bgAlternate: 'white',
  bgHeader: 'white',
  bgColorHover: getColor('grey.300'),
  borderTableBody: `1px solid ${getColor('grey.500')}`,
  borderTableHeader: 'none',
  borderRows: `1px solid ${getColor('grey.500')}`,
  borderColumns: 'none',
}

export const alternativeTheme = {
  ...defaultTheme,
  ...{
    borderTableHeader: `1px solid ${getColor('grey.500')}`,
    bgHeader: getColor('grey.400'),
  },
}

export const chooseTheme = theme => {
  if (!theme || theme === 'default') return defaultTheme
  if (theme === 'alternative') return alternativeTheme
  return { ...defaultTheme, ...theme }
}
