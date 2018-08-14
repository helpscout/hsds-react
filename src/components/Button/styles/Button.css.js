// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'
import { getColor } from '../../../styles/utilities/color'

export const config = {
  borderRadius: 3,
  fontWeight: 600,
  minWidth: 120,
  padding: 20,
  primary: {
    backgroundColor: getColor('blue.500'),
    backgroundColorFocus: getColor('blue.600'),
    color: 'white',
  },
  plain: {
    backgroundColor: 'transparent',
    backgroundColorFocus: 'transparent',
    color: getColor('charcoal.200'),
  },
  danger: {
    backgroundColor: 'transparent',
    backgroundColorFocus: 'transparent',
    color: getColor('red.500'),
  },
  disabled: {
    backgroundColor: getColor('grey.500'),
  },
  size: {
    md: 40,
  },
}

export const makeButtonUI = (selector: string = 'button') => {
  return styled(selector)`
    ${baseStyles}
    appearance: none;
    border: none;
    border-radius: ${config.borderRadius}px;
    cursor: pointer;
    display: inline-block;
    font-weight: ${config.fontWeight};
    height: ${config.size.md}px;
    line-height: 1;
    min-width: ${config.minWidth}px;
    outline: none;
    padding: 0 ${config.padding}px;
    position: relative;
    text-decoration: none;

    &:focus {
      z-index: 2;
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

    ${props => makePrimaryStyles(props)}
    ${makePlainStyles()}
    ${makeDangerStyles()}
    ${makeDisabledStyles()}
  `
}

function makePrimaryStyles(props: Object = {}): string {
  const { theme } = props
  const backgroundColor =
    (theme && theme.brandColor) || config.primary.backgroundColor
  const color = (theme && theme.brandTextColor) || config.primary.color

  return `
    &.is-primary {
      background: ${backgroundColor};
      color: ${color};

      &:hover,
      &:active,
      &:focus {
        background: ${config.primary.backgroundColorFocus};
      }

      &.is-disabled {
        background: ${config.disabled.backgroundColor};
      }
    }
  `
}

function makePlainStyles(): string {
  return `
    &.is-plain {
      background: ${config.plain.backgroundColor};
      color: ${config.plain.color};
      font-weight: normal;
      min-width: initial;
      padding-left: 0;
      padding-right: 0;
      text-decoration: none;

      &:hover,
      &:active,
      &:focus {
        background: ${config.plain.backgroundColorFocus};
        text-decoration: underline;
      }
    }
  `
}

function makeDangerStyles(): string {
  return `
    &.is-danger {
      background-color: ${config.danger.backgroundColor};
      color: ${config.danger.color};
    }
  `
}

function makeDisabledStyles(): string {
  return `
    &.is-disabled,
    &[disabled] {
      pointer-events: none;
    }
  `
}
