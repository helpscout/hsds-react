import styled, { css } from 'styled-components'
import get from 'dash-get'
import Spinner from '../Spinner'
import { getColor } from '../../styles/utilities/color'
import variableFontSize from '../../styles/utilities/variableFontSize'
import { focusRing } from '../../styles/mixins/focusRing.css'
import config from './Button.config'

export const ButtonUI = styled.button`
  --buttonBackgroundColor: ${config.theme.blue.mainColor};
  --buttonBackgroundColorHover: ${config.theme.blue.hoverColor};
  --buttonBorderColor: ${config.theme.blue.mainColor};
  --buttonBorderColorHover: ${config.theme.blue.mainColor};

  --buttonColor: white;
  --buttonColorHover: white;

  --buttonTextDecoration: none;
  --buttonTextDecorationHover: none;

  --buttonPadding: 0px;
  --buttonMinWidth: initial;
  --buttonHeight: ${config.size.lg.height}px;
  --buttonFontWeight: ${config.fontWeight};
  --buttonRadius: ${config.borderRadius}px;

  ${focusRing};
  --focusRingOffset: -${config.focusOutlineOffset}px;
  --focusRingRadius: var(--buttonRadius);

  align-items: center;
  appearance: none;
  background: var(--buttonBackgroundColor);
  border-radius: var(--buttonRadius);
  border: 1px solid var(--buttonBorderColor);
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

  &:focus {
    color: var(--buttonColor);
    text-decoration: var(--buttonTextDecoration);
  }

  &:hover,
  &:active {
    background: var(--buttonBackgroundColorHover);
    border-color: var(--buttonBorderColorHover);
    color: var(--buttonColorHover);
    text-decoration: var(--buttonTextDecorationHover);
  }

  &.is-disabled,
  &[disabled] {
    pointer-events: none;
    user-select: none;
    background: ${getColor('grey.500')} !important;
    border-color: ${getColor('grey.500')} !important;
    color: white !important;

    &.is-style-outlined {
      background: white !important;
      border-color: ${getColor('grey.600')} !important;
      color: ${getColor('grey.800')} !important;
    }
    &.is-style-link {
      background: transparent !important;
      border-color: transparent !important;
      color: ${getColor('grey.800')} !important;
    }

    &:before {
      display: none;
    }
  }

  &.is-rounded {
    border-radius: 100px;
    --focusRingRadius: 100px;
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
  ${makeButtonSizeStyles('xxl', config.size.xxl)};
  ${makeButtonSizeStyles('xl', config.size.xl)};
  ${makeButtonSizeStyles('lg', config.size.lg)};
  ${makeButtonSizeStyles('md', config.size.md)};
  ${makeButtonSizeStyles('sm', config.size.sm)};
  ${makeButtonSizeStyles('xs', config.size.xs)};
  ${makeButtonSizeStyles('xxs', config.size.xxs)};

  /* theme */
  ${makeButtonThemeStyles('blue', config.theme.blue)};
  ${makeButtonThemeStyles('green', config.theme.green)};
  ${makeButtonThemeStyles('grey', config.theme.grey)};
  ${makeButtonThemeStyles('red', config.theme.red)};
`

function makeButtonThemeStyles(theme, config) {
  return css`
    &.is-theme-${theme} {
      --buttonBackgroundColor: ${config.mainColor};
      --buttonBackgroundColorHover: ${config.hoverColor};
      --buttonBorderColor: ${config.mainColor};
      --buttonBorderColorHover: ${config.mainColor};

      &.is-style-outlined {
        --buttonBackgroundColor: white;

        ${renderPropStyle(
          config,
          'outline.hoverColor',
          '--buttonBackgroundColorHover'
        )};

        ${renderPropStyle(config, 'outline.textColor', '--buttonColor')};
        ${renderPropStyle(
          config,
          'outline.textHoverColor',
          '--buttonColorHover',
          'textColor'
        )};

        ${renderPropStyle(
          config,
          'outline.borderColor',
          '--buttonBorderColor',
          'mainColor'
        )};
        ${renderPropStyle(
          config,
          'outline.borderHoverColor',
          '--buttonBorderColorHover',
          'mainColor'
        )};
      }

      &.is-style-link  {
        --buttonBackgroundColor: transparent;
        --buttonBackgroundColorHover: transparent;
        --buttonBorderColor: transparent;
        --buttonBorderColorHover: transparent;
        --buttonTextDecorationHover: underline;

        ${renderPropStyle(config, 'outline.textColor', '--buttonColor')};
        ${renderPropStyle(
          config,
          'outline.textHoverColor',
          '--buttonColorHover',
          'textColor'
        )};
      }
    }
  `
}
function makeButtonSizeStyles(size, config) {
  return css`
    &.is-size-${size} {
      ${variableFontSize({ fontSize: config.fontSize })};
      ${renderPropStyle(config, 'height', '--buttonHeight')};
      ${renderPropStyle(config, 'padding', '--buttonPadding')};
      ${renderPropStyle(config, 'fontWeight', '--buttonFontWeight')};

      &:not(.is-rounded) {
        ${renderPropStyle(config, 'minWidth', '--buttonMinWidth')};
      }
    }
  `
}

function renderPropStyle(config, prop, attribute, fallback = null) {
  const attr = attribute || prop

  let value = get(config, prop)
  if (!value && fallback) value = get(config, fallback)

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
  color: inherit;
  margin: -6px 0 0 -6px;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
`

SpinnerUI.defaultProps = {
  size: 12,
}
