const palette = {
  blue: {
    default: '#3197d6',
    '100': '#f7fcfe',
    '200': '#daf1ff',
    '300': '#aedfff',
    '400': '#71bff1',
    '500': '#3197d6',
    '600': '#237ab3',
    '700': '#1f5e89',
    '800': '#194c6e',
    '900': '#143d57',
  },

  charcoal: {
    default: '#394956',
    '200': '#93a1af',
    '300': '#72808e',
    '400': '#4f5d6b',
    '500': '#394956',
    '600': '#2a3b47',
    '700': '#253540',
    '800': '#1d2b36',
  },

  grey: {
    default: '#d6dde3',
    '200': '#f9fafa',
    '300': '#f1f3f5',
    '400': '#e3e8eb',
    '500': '#d6dde3',
    '600': '#c1cbd4',
    '700': '#b4c0ca',
    '800': '#a5b2bd',
  },

  yellow: {
    default: '#ffc646',
    '100': '#fffdf6',
    '200': '#fff6e2',
    '300': '#ffe8b5',
    '400': '#ffd56d',
    '500': '#ffc646',
    '600': '#f5b126',
    '700': '#d79400',
    '800': '#b37100',
    '900': '#875200',
  },

  green: {
    default: '#4bc27d',
    '100': '#fafdfb',
    '200': '#e4fbe6',
    '300': '#c4f0ce',
    '400': '#81dc9e',
    '500': '#4bc27d',
    '600': '#3cb170',
    '700': '#2f9f62',
    '800': '#228350',
    '900': '#23633e',
  },

  red: {
    default: '#e52f28',
    '100': '#fef7f6',
    '200': '#ffe3e2',
    '300': '#ffa2a2',
    '400': '#f45b55',
    '500': '#e52f28',
    '600': '#d21b14',
    '700': '#ba1f19',
    '800': '#9d1f1a',
    '900': '#731814',
  },

  purple: {
    default: '#7e80e7',
    '100': '#fbfbfe',
    '200': '#eaeafc',
    '300': '#d1d2f6',
    '400': '#a3a4f3',
    '500': '#7e80e7',
    '600': '#696aca',
    '700': '#585b9e',
    '800': '#45467d',
    '900': '#383966',
  },

  orange: {
    default: '#ff9139',
    '100': '#fff8f2',
    '200': '#ffead8',
    '300': '#ffd3ae',
    '400': '#ffa75a',
    '500': '#ff9139',
    '600': '#e87800',
    '700': '#c76400',
    '800': '#a45300',
    '900': '#813c00',
  },
}

const text = {
  default: 'currentColor',
  subtle: palette.charcoal['500'],
  muted: palette.charcoal['300'],
  faint: palette.charcoal['200'],
  extraMuted: palette.grey['600'],
}

const border = {
  default: palette.grey['400'],
  divider: palette.grey['300'],
  ui: {
    default: palette.grey['500'],
    dark: palette.grey['600'],
  },
}

const state = {
  danger: {
    default: palette.red['500'],
    backgroundColor: palette.red['200'],
    borderColor: palette.red['500'],
    color: palette.red['800'],
  },
  error: {
    default: palette.red['500'],
    backgroundColor: palette.red['200'],
    borderColor: palette.red['500'],
    color: palette.red['800'],
  },
  info: {
    default: palette.blue['500'],
    backgroundColor: palette.blue['200'],
    borderColor: palette.blue['500'],
    color: palette.blue['800'],
  },
  success: {
    default: palette.green['500'],
    backgroundColor: palette.green['200'],
    borderColor: palette.green['500'],
    color: palette.green['800'],
  },
  warning: {
    default: palette.yellow['500'],
    backgroundColor: palette.yellow['200'],
    borderColor: palette.yellow['500'],
    color: palette.yellow['800'],
  },
}

export default {
  ...palette,
  border,
  text,
  state,
}
