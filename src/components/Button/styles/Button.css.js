import get from 'dash-get'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import Spinner from '../../Spinner'
import styled from '../../styled'
import { getColor } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'
import variableFontSize from '../../../styles/utilities/variableFontSize'

export const config = {
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
  },
  size: {
    xl: {
      fontSize: 14,
      height: 54,
      minWidth: '120px',
      padding: 20,
    },
    lgxl: {
      fontSize: 14,
      height: 50,
      minWidth: '120px',
      padding: 20,
    },
    lg: {
      fontSize: 14,
      height: 40,
      minWidth: '120px',
      padding: 20,
    },
    md: {
      fontSize: 13,
      height: 35,
      minWidth: 'initial',
      padding: 15,
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

export const makeButtonUI = (selector = 'button') => {
  return styled(selector)`
    ${baseStyles};
    appearance: none;
    align-items: center;
    border: 1px solid transparent;
    cursor: pointer;
    display: inline-flex;
    font-weight: normal;
    height: ${config.size.md.height}px;
    justify-content: center;
    line-height: 1;
    min-width: ${config.size.md.minWidth};
    outline: none;
    padding: 0 ${config.size.md.padding}px;
    position: relative;
    text-align: center;
    text-decoration: none;

    &:hover,
    &:active,
    &:focus {
      outline: none;
      text-decoration: none;
    }

    &:active,
    &:active:focus {
      .c-ButtonV2Focus {
        display: none;
      }
    }

    &.is-focused,
    &:focus {
      z-index: 2;
      .c-ButtonV2Focus {
        display: block;
      }
    }

    &.is-first {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &.is-notOnly {
      border-radius: 0;
    }
    &.is-last {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &.is-block {
      display: flex;
      width: 100%;
    }

    &.is-loading {
      &.is-spinButtonOnLoading {
        animation: SpinButtonOnLoadAnimation 700ms linear infinite;
        will-change: transform;
        @keyframes SpinButtonOnLoadAnimation {
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }

    ${makeButtonShapeStyles()}
    ${makeButtonSizeStyles()}

    ${props => makePrimaryStyles('primary', props)}
    ${props => makePrimaryStyles('primaryAlt', props)}
    ${makeButtonKindStyles('secondary', config.secondary)}
    ${makeButtonKindStyles('secondaryAlt', config.secondaryAlt)}
    ${makeButtonKindStyles('tertiary', config.tertiary)}
    ${makeButtonKindStyles('default', config.default)}
    ${makeButtonKindStyles('link', config.link)}
    ${makeButtonKindStyles('suffix', config.suffix)}
  `
}

function makePrimaryStyles(name = 'primary', props = {}) {
  const theme = get(props, 'theme.brandColor', {})
  const backgroundColor =
    theme.backgroundColorUI || theme.brandColor || config[name].backgroundColor
  const color =
    theme.textColorInteractive || theme.brandTextColor || config[name].color

  const backgroundColorHover =
    theme.backgroundColorUIHover || config[name].backgroundColorHover
  const borderColorHover = backgroundColorHover
  const backgroundColorActive =
    theme.backgroundColorUIActive || config[name].backgroundColorActive
  const borderColorActive = backgroundColorActive

  return makeButtonKindStyles(name, {
    ...config[name],
    backgroundColor,
    borderColor: backgroundColor,
    color,
    backgroundColorHover,
    borderColorHover,
    backgroundColorActive,
    borderColorActive,
  })
}

function makeButtonKindStyles(kind, config) {
  return `
    &.is-${kind} {
      background: ${config.backgroundColor};
      border-color: ${config.borderColor};
      color: ${config.color};
      ${renderStyleForProp(config, 'fontWeight', 'font-weight')}
      ${renderStyleForProp(config, 'minWidth', 'min-width')}
      ${renderStyleForProp(config, 'padding', 'padding-left')}
      ${renderStyleForProp(config, 'padding', 'padding-right')}
      ${renderStyleForProp(config, 'textDecoration', 'text-decoration')}

      &:hover,
      &.is-hovered {
        background: ${config.backgroundColorHover};
        border-color: ${config.borderColorHover};
        ${renderStyleForProp(config, 'colorHover', 'color')}
        ${renderStyleForProp(config, 'textDecorationHover', 'text-decoration')}
      }

      &:active,
      &.is-active {
        background: ${config.backgroundColorActive};
        border-color: ${config.borderColorActive};
        ${renderStyleForProp(config, 'colorActive', 'color')}
        ${renderStyleForProp(config, 'textDecorationActive', 'text-decoration')}
      }

      &:focus,
      &.is-focused {
        ${renderStyleForProp(config, 'colorFocus', 'color')}
        ${renderStyleForProp(config, 'textDecorationFocus', 'text-decoration')}
      }

      ${makeDangerStyles(config)}
      ${makeSuccessStyles(config)}
      ${makeWarningStyles(config)}

      ${makeDisabledStyles(`
        background: ${config.disabledBackgroundColor} !important;
        border-color: ${config.disabledBorderColor} !important;
        color: ${config.disabledColor} !important;
      `)}
    }
  `
}

function makeButtonStateStyles(config, state) {
  if (!config.hasOwnProperty(state)) return ''

  return `
    &.is-${state} {
      background-color: ${config[state].backgroundColor};
      border-color: ${config[state].borderColor};
      color: ${config[state].color};

      &:hover,
      &.is-hovered {
        background-color: ${config[state].backgroundColorHover};
        border-color: ${config[state].borderColorHover};
        color: ${config[state].colorHover};
      }
      &:active,
      &.is-active {
        background-color: ${config[state].backgroundColorActive};
        border-color: ${config[state].borderColorActive};
        color: ${config[state].colorActive};
      }
    }
  `
}

function makeDangerStyles(config) {
  return makeButtonStateStyles(config, 'danger')
}

function makeSuccessStyles(config) {
  return makeButtonStateStyles(config, 'success')
}

function makeWarningStyles(config) {
  return makeButtonStateStyles(config, 'warning')
}

function makeDisabledStyles(content) {
  return `
    &.is-disabled,
    &[disabled] {
      pointer-events: none;
      user-select: none;
      ${content}
    }
  `
}

function makeButtonShapeStyles() {
  return forEach(
    config.shape,
    (shape, value) => `
    &.is-shape-${shape} {
      border-radius: ${value};
    }
  `
  )
}

function makeButtonSizeStyles() {
  return forEach(
    config.size,
    (size, props) => `
    &.is-${size} {
      ${variableFontSize({ fontSize: props.fontSize })}
      ${renderStyleForProp(props, 'fontWeight', 'font-weight')}
      height: ${props.height}px;
      min-width: ${props.minWidth};
      padding-left: ${props.padding}px;
      padding-right: ${props.padding}px;
    }
  `
  )
}

function renderStyleForProp(config, prop, attribute) {
  const attr = attribute || prop

  return config.hasOwnProperty(prop)
    ? `
    ${attr}: ${config[prop]};
  `
    : ''
}

export const ButtonContentUI = styled('span')`
  align-items: inherit;
  display: inherit;
  justify-content: inherit;
  text-decoration: inherit;
  width: 100%;

  ${({ allowContentEventPropogation }) =>
    allowContentEventPropogation &&
    `
    pointer-events: none;

    * {
      pointer-events: none;
    }
  `};

  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0;
  `};
`

export const FocusUI = styled('span')`
  animation: ButtonFocusFadeIn 200ms;
  bottom: -${config.focusOutlineOffset}px;
  box-shadow: 0 0 0 ${config.focusOutlineWidth}px ${config.focusOutlineColor};
  display: none;
  left: -${config.focusOutlineOffset}px;
  pointer-events: none;
  position: absolute;
  right: -${config.focusOutlineOffset}px;
  top: -${config.focusOutlineOffset}px;

  &.is-first {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &.is-notOnly {
    border-radius: 0;
  }
  &.is-last {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  @keyframes ButtonFocusFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  ${makeButtonShapeStyles()};
`

export const SpinnerUI = styled(Spinner)`
  color: ${getColor('charcoal.500')};
  margin: -6px 0 0 -6px;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
`

SpinnerUI.defaultProps = {
  size: 12,
}
