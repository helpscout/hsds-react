import styled, { css } from 'styled-components'
import get from 'dash-get'
import Spinner from '../Spinner'
import { getColor } from '../../styles/utilities/color'
import variableFontSize from '../../styles/utilities/variableFontSize'
import { focusRing } from '../../styles/mixins/focusRing.css'
import config from './Button.config'

export const ButtonUI = styled.button`
  --buttonBackgroundColor: ${config.default.backgroundColor};
  --buttonBackgroundColorHover: ${config.default.backgroundColorHover};
  --buttonBackgroundColorActive: ${config.default.backgroundColorActive};
  --buttonBackgroundColorDisabled: ${config.default.disabledBackgroundColor};
  --buttonBorderColor: ${config.default.borderColor};
  --buttonBorderColorHover: ${config.default.borderColorHover};
  --buttonBorderColorActive: ${config.default.borderColorActive};
  --buttonBorderColorDisabled: ${config.default.disabledBorderColor};
  --buttonColor: ${config.default.color};
  --buttonColorHover: ${config.default.color};
  --buttonColorActive: ${config.default.color};
  --buttonColorDisabled: ${config.default.disabledColor};
  --buttonTextDecoration: none;
  --buttonTextDecorationHover: ${config.default.textDecorationHover};
  --buttonTextDecorationActive: ${config.default.textDecorationActive};
  --buttonTextDecorationFocus: ${config.default.textDecorationFocus};
  --buttonPadding: 0px;
  --buttonMinWidth: initial;
  --buttonHeight: ${config.size.md.height}px;
  --buttonFontWeight: ${config.fontWeight};
  --buttonRadius: ${config.borderRadius}px;

  ${focusRing};
  --focusRingOffset: -${config.focusOutlineOffset}px;
  --focusRingRadius: var(--buttonRadius);

  appearance: none;
  align-items: center;
  border: 1px solid var(--buttonBorderColor);
  background: var(--buttonBackgroundColor);
  color: var(--buttonColor);
  cursor: pointer;
  display: inline-flex;
  font-family: var(--HSDSGlobalFontFamily);
  font-weight: var(--buttonFontWeight);
  height: var(--buttonHeight);
  justify-content: center;
  line-height: 1;
  min-width: var(--buttonMinWidth);
  outline: none;
  padding: 0 var(--buttonPadding);
  position: relative;
  text-align: center;
  text-decoration: var(--buttonTextDecoration);
  border-radius: var(--buttonRadius);

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

  &:hover,
  &.is-hovered {
    background: var(--buttonBackgroundColorHover);
    border-color: var(--buttonBorderColorHover);
    color: var(--buttonColorHover);
    text-decoration: var(--buttonTextDecorationHover);
  }

  &:focus,
  &.is-focused {
    color: var(--buttonColor);
    text-decoration: var(--buttonTextDecorationFocus);
  }

  &:active,
  &.is-active {
    background: var(--buttonBackgroundColorActive);
    border-color: var(--buttonBorderColorActive);
    color: var(--buttonColorActive);
    text-decoration: var(--buttonTextDecorationActive);
  }

  &.is-disabled,
  &[disabled] {
    pointer-events: none;
    user-select: none;
    background: var(--buttonBackgroundColorDisabled) !important;
    border-color: var(--buttonBorderColorDisabled) !important;
    color: var(--buttonColorDisabled) !important;

    &:before {
      display: none;
    }
  }

  &.is-shape-rounded {
    border-radius: 100px;
    --focusRingRadius: 100px;
  }
  &.is-shape-circle {
    border-radius: 100%;
    --focusRingRadius: 100%;
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

  /* sizes */
  ${makeButtonSizeStyles('xl', config.size.xl)};
  ${makeButtonSizeStyles('lg', config.size.lg)};
  ${makeButtonSizeStyles('md', config.size.md)};
  ${makeButtonSizeStyles('sm', config.size.sm)};
  ${makeButtonSizeStyles('xs', config.size.xs)};
  ${makeButtonSizeStyles('xxs', config.size.xxs)};

  /* kinds && states */
  ${makeButtonStateStyles(config.default, 'danger')}
  ${props => makePrimaryStyles('primary', props)};
  ${makeButtonKindStyles('secondary', config.secondary)};
  ${makeButtonKindStyles('tertiary', config.tertiary)};
  ${makeButtonKindStyles('link', config.link)};
  ${makeButtonKindStyles('suffix', config.suffix)};

  /* some overwrites */
  &.is-primary {
    &.is-lg,
    &.is-xl {
      --buttonMinWidth: 120px;
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
      --buttonBackgroundColor: ${config.backgroundColor};
      --buttonBackgroundColorHover: ${config.backgroundColorHover};
      --buttonBackgroundColorActive: ${config.backgroundColorActive};
      --buttonBackgroundColorDisabled: ${config.disabledBackgroundColor};
      --buttonBorderColor: ${config.borderColor};
      --buttonBorderColorHover: ${config.borderColorHover};
      --buttonBorderColorActive: ${config.borderColorActive};
      --buttonBorderColorDisabled: ${config.disabledBorderColor};
      ${renderStyleForProp(config, 'color', '--buttonColor', 'color')};
      ${renderStyleForProp(
        config,
        'disabledColor',
        '--buttonColorDisabled',
        'color'
      )};
      ${renderStyleForProp(
        config,
        'colorHover',
        '--buttonColorHover',
        'color'
      )};
      ${renderStyleForProp(
        config,
        'colorActive',
        '--buttonColorActive',
        'color'
      )};

      ${renderStyleForProp(config, 'textDecoration', '--buttonTextDecoration')}
      ${renderStyleForProp(
        config,
        'textDecorationHover',
        '--buttonTextDecorationHover'
      )}
      ${renderStyleForProp(
        config,
        'textDecorationActive',
        '--buttonTextDecorationActive'
      )}
      ${renderStyleForProp(
        config,
        'textDecorationFocus',
        '--buttonTextDecorationFocus'
      )}

      ${renderStyleForProp(config, 'fontWeight', '--buttonFontWeight')}
      ${renderStyleForProp(config, 'minWidth', '--buttonMinWidth')}
      ${renderStyleForProp(config, 'padding', '--buttonPadding')}


      ${makeButtonStateStyles(config, 'danger')}
      ${makeButtonStateStyles(config, 'success')}
      ${makeButtonStateStyles(config, 'warning')}
      ${makeButtonStateStyles(config, 'grey')}
      ${makeButtonStateStyles(config, 'muted')}
    }
  `
}
function makeButtonSizeStyles(size, config) {
  return css`
    &.is-${size} {
      ${variableFontSize({ fontSize: config.fontSize })};
      ${renderStyleForProp(config, 'height', '--buttonHeight')};
      ${renderStyleForProp(config, 'padding', '--buttonPadding')};
      ${renderStyleForProp(config, 'fontWeight', '--buttonFontWeight')};
    }
  `
}

function makeButtonStateStyles(config, state) {
  if (!config.hasOwnProperty(state)) return css``

  return css`
    &.is-${state} {
      --buttonBackgroundColor: ${config[state].backgroundColor};
      --buttonBackgroundColorHover: ${config[state].backgroundColorHover};
      --buttonBackgroundColorActive: ${config[state].backgroundColorActive};
      --buttonBorderColor: ${config[state].borderColor};
      --buttonBorderColorHover: ${config[state].borderColorHover};
      --buttonBorderColorActive: ${config[state].borderColorActive};
      --buttonColor: ${config[state].color};
      --buttonColorHover: ${config[state].color};
      --buttonColorActive: ${config[state].color};
    }
  `
}

function renderStyleForProp(config, prop, attribute, fallback = null) {
  const attr = attribute || prop

  let value
  if (config.hasOwnProperty(prop)) value = config[prop]
  if (!value && fallback && config.hasOwnProperty(fallback))
    value = config[fallback]

  if (!value) return ''

  return css`
    ${attr}: ${value};
  `
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
