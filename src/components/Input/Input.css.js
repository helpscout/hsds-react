import styled from 'styled-components'

import { STATES } from '@hsds/utils-constants'
import { getColor } from '@hsds/utils-color'
import { forEach } from '@hsds/utils-sass'

export const config = {
  borderWidth: '2px',
  offset: '1px',
  paddingSide: '16px',
  size: {
    xs: {
      height: '24px',
    },
    xssm: {
      height: '28px',
    },
    sm: {
      height: '32px',
    },
    md: {
      height: '42px',
    },
    lg: {
      height: '48px',
    },
  },
  state: ['error', 'success', 'warning'],
}

export const InputWrapperUI = styled('div')`
  width: 100%;
`

export const InputUI = styled('div')`
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
  padding-bottom: 1px;
  padding-top: 1px;
  padding-left: ${config.paddingSide};
  padding-right: ${config.paddingSide};
  position: relative;

  &.is-multiline {
    height: auto;
    will-change: height;
  }

  &.is-seamless {
    padding-left: 0;
    padding-right: 0;
  }

  &.is-focused {
    z-index: 2;
  }
`

export const ItemUI = styled('div')`
  position: relative;
  z-index: 1;
`

export const FieldUI = styled('input')`
  &.c-InputField {
    ${makeFieldStyles};
  }
`

export const FieldTextAreaUI = styled('textarea')`
  &.c-InputField {
    ${makeFieldStyles};
  }
`

export const PrefixUI = styled(ItemUI)`
  margin-bottom: -1px;
  margin-left: calc(${config.paddingSide} * -1);
  margin-top: -1px;
  margin-right: ${config.paddingSide};

  &.is-seamless {
    margin-left: 0;
  }
`

export const SuffixUI = styled(ItemUI)`
  margin-bottom: -1px;
  margin-left: ${config.paddingSide};
  margin-right: calc(${config.paddingSide} * -1);
  margin-top: -1px;

  &.is-seamless {
    margin-right: 0;
  }

  &.is-action {
    margin-right: -11px;
  }
`

export const CharValidatorUI = styled('div')`
  right: 15px;
  bottom: -7px;
  min-height: 18px;
  position: absolute;
  text-align: right;
  z-index: 3;
  -webkit-transform: translateY(0);
`

export const CharValidatorText = styled('div')`
  min-width: ${props => Math.max(props.chars * 9, 18) + 'px'};
`

export const InlinePrefixSuffixUI = styled('div')`
  opacity: 0.3;
  padding-left: 4px;
  padding-right: 4px;
  position: relative;
  top: 0;
  white-space: nowrap;
  z-index: 1;

  &.is-icon {
    opacity: 1;

    &.is-multiline {
      align-self: flex-start;
      padding-top: 9px;
    }
  }

  ${makeStateStyles};

  &.is-prefix {
    &.is-icon {
      margin-left: -8px;
    }

    &.is-error.is-seamless {
      margin-left: 0;
    }
  }

  &.is-suffix {
    &.is-icon {
      margin-right: -8px;
    }

    &.is-error.is-seamless {
      margin-right: 0;
    }
  }
`

function getHeight(height) {
  return `calc(${height} - ${config.borderWidth} * 2 - ${config.offset} * 2)`
}

function makeSizeStyles() {
  return forEach(config.size, (size, props) => {
    const { height } = props

    return `
      &.is-${size} {
        height: ${getHeight(height)};
      }
    `
  })
}

function makeMinSizeStyles() {
  return forEach(config.size, (size, props) => {
    const { height } = props

    return `
      &.is-${size} {
        min-height: calc(${height} - 2px);
      }
    `
  })
}

function makeStateStyles() {
  return forEach(
    STATES,
    state => `
    &.is-${state} {
      color: ${getColor('state', state, 'color')};
    }
  `
  )
}

export function makeFieldStyles() {
  return `
    font-size: var(--HSDSGlobalFontSize);
    font-family: var(--HSDSGlobalFontFamily);
    appearance: none;
    background-color: transparent;
    border: none;
    box-shadow: none;
    color: currentColor;
    display: block;
    height: ${getHeight(config.size.md.height)};
    margin-bottom: ${config.offset};
    margin-top: ${config.offset};
    padding: 0;
    position: relative;
    top: 0;
    width: 100%;
    z-index: 1;

    &.is-error {
      width: calc(100% - 24px);
    }

    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${getColor('grey.700')};
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px white inset;
      background-clip: content-box;
      transition: background-color 5000s ease-in-out 0s;
    }

    ${makeSizeStyles()};
    ${makeStateStyles()};

    &.is-resizable {
      resize: vertical !important;
    }

    &.is-multiline {
      line-height: normal;
      overflow: hidden;
      height: auto;
      margin-bottom: 1px;
      margin-top: 1px;
      margin-left: -${config.paddingSide};
      margin-right: -${config.paddingSide};
      padding: 12px ${config.paddingSide};
      resize: none;
      top: 1px;
      width: calc(100% + (${config.paddingSide} * 2));

      ${makeMinSizeStyles()}

      &.has-maxHeight {
        margin-bottom: 2px;
        margin-left: calc((${config.paddingSide} - 2px) * -1);
        margin-right: calc((${config.paddingSide} - 2px) * -1);
        margin-top: 0;
        overflow-y: auto;

        &.is-error {
          margin-right: calc((${config.paddingSide} * 2 + 2px) * -1)
        }
      }

      &.is-seamless {
        margin: 0;
        padding-left: 0;
        padding-right: 0;
      }
    }
  `
}
