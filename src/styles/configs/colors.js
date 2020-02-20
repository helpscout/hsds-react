import colorway from './colorway'

const palette = colorway

const text = {
  default: 'currentColor',
  subtle: palette.charcoal['500'],
  slightlyMuted: palette.charcoal['400'],
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

const osx = {
  control: {
    default: '#3b99fc',
    borderColor: '#2b91fc',
    backgroundColor: '#3b99fc',
  },
}

const link = {
  default: palette.blue['600'],
  base: palette.blue['600'],
  hover: palette.blue['500'],
  active: palette.blue['500'],
  focus: palette.blue['500'],
}

export default {
  ...palette,
  border,
  text,
  state,
  osx,
  link,
}
