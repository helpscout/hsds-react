import styled, { css } from 'styled-components'
import get from 'dash-get'
import Spinner from '../Spinner'
import { getColor } from '../../styles/utilities/color'
import forEach from '../../styles/utilities/forEach'
import variableFontSize from '../../styles/utilities/variableFontSize'
import { focusRing } from '../../styles/mixins/focusRing.css'
import config from './Button.config'

export const ButtonUI = styled.button`
  ${focusRing};
  --focusRingOffset: -${config.focusOutlineOffset}px;

  appearance: none;
  align-items: center;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  font-family: var(--HSDSGlobalFontFamily);
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

  /* Allow content events to pass through, https://github.com/helpscout/hsds-react/pull/394 */
  * {
    pointer-events: none;
  }

  &:hover,
  &:active,
  &:focus {
    outline: none;
    text-decoration: none;
  }

  &:active,
  &:active:focus {
    .c-ButtonFocus {
      display: none;
    }
  }

  &.is-focused,
  &:focus {
    z-index: 2;
    .c-ButtonFocus {
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

  &.is-shape-default {
    border-radius: 3px;
  }
  &.is-shape-rounded {
    border-radius: 100px;
  }

  ${makeButtonSizeStyles()};

  ${props => makePrimaryStyles('primary', props)};
  ${makeButtonKindStyles('secondary', config.secondary)};
  ${makeButtonKindStyles('tertiary', config.tertiary)};
  ${makeButtonKindStyles('default', config.default)};
  ${makeButtonKindStyles('link', config.link)};
  ${makeButtonKindStyles('suffix', config.suffix)};

  /* some overwrite */
  &.is-primary {
    &.is-lg,
    &.is-xl {
      min-width: 120px;
    }
  }
`

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
  return css`
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

      ${makeButtonStateStyles(config, 'danger')}
      ${makeButtonStateStyles(config, 'success')}
      ${makeButtonStateStyles(config, 'warning')}
      ${makeButtonStateStyles(config, 'grey')}
      ${makeButtonStateStyles(config, 'muted')}

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

function makeDisabledStyles(content) {
  return `
    &.is-disabled,
    &[disabled] {
      pointer-events: none;
      user-select: none;
      ${content}

      &:before{
        display: none;
      }
    }
  `
}

function makeButtonSizeStyles() {
  return forEach(
    config.size,
    (size, props) => `
    &.is-${size} {
      ${variableFontSize({ fontSize: props.fontSize })};
      ${renderStyleForProp(props, 'fontWeight', 'font-weight')};
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

export const LoadingWrapperUI = styled.span`
  align-items: inherit;
  display: inherit;
  justify-content: inherit;
  text-decoration: inherit;
  width: 100%;
  opacity: 0;
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
