import { getColor } from '../../../../styles/utilities/color'

export const CONVO_STATUS_CLASSNAMES = {
  1: 'convo-active',
  2: 'convo-pending',
  3: 'convo-closed',
  4: 'convo-spam',
}
export const TAG_COLORS = [
  getColor('charcoal.200'),
  getColor('green.500'),
  getColor('blue.500'),
  getColor('yellow.500'),
  getColor('purple.500'),
  getColor('red.500'),
]

export const skin = {
  fontColorHeader: getColor('charcoal.500'),
  fontColorBody: getColor('charcoal.500'),
  fontColorAlternate: getColor('charcoal.500'),
  bgColor: 'white',
  bgAlternate: 'white',
  bgHeader: 'white',
  bgColorHover: getColor('grey.300'),
  borderTableBody: `1px solid ${getColor('grey.500')}`,
  borderTableHeader: `1px solid ${getColor('grey.500')}`,
  borderRows: `1px solid ${getColor('grey.500')}`,
  borderColumns: 'none',
}
