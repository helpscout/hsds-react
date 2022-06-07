import { getColor } from '@hsds/utils-color'

export const defaultSkin = {
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
  bgFocus: getColor('blue.100'),
  bgFocusIndicator: getColor('blue.500'),
  bgSelected: getColor('blue.100'),
  bgSelectedHover: getColor('blue.100'),
  headerRowHeight: '48px',
}

export const alternativeSkin = {
  ...defaultSkin,
  ...{
    borderTableHeader: `1px solid ${getColor('grey.500')}`,
    bgHeader: getColor('grey.400'),
  },
}

export const chooseSkin = skin => {
  if (!skin || skin === 'default') return defaultSkin
  if (skin === 'alternative') return alternativeSkin
  return { ...defaultSkin, ...skin }
}
