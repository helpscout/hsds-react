import baseStyles from '../../../styles/resets/baseStyles.css'
import { STATES } from '../../../styles/configs/constants'
import { getColor, rgba } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'
import styled from 'styled-components'

export const config = {
  backgroundColor: 'white',
  backgroundColorDisabled: getColor('grey.200'),
  backgroundColorReadOnly: getColor('grey.300'),
  backgroundColorFill: getColor('osx.control.backgroundColor'),
  borderColor: getColor('border.ui.dark'),
  borderColorFill: getColor('osx.control.borderColor'),
  borderRadius: 3,
  boxShadow: `0 0 0 0 ${rgba(getColor('border'), 0)}`,
  boxShadowCheckbox: '0 0.5px 1px rgba(0, 0, 0, 0.2) inset',
  focusOutlineWidth: 2,
  focusErrorOutlineWidth: 1,
  focusErrorOutlineColor: getColor('red.500'),
  focusOutlineColor: getColor('blue.500'),
  focusOutlineOffset: 1,
  transition:
    'box-shadow 100ms ease, background-color 100ms ease, border-color 100ms ease',
  custom: {
    backgroundColor: getColor('grey.400'),
    backgroundColorFocused: getColor('grey.500'),
    borderColor: getColor('grey.400'),
    backgroundColorFill: getColor('green.500'),
    borderColorFill: getColor('green.500'),
    boxShadow: 'none',
  },
}

export const BackdropUI = styled('div')`
  background-color: ${config.backgroundColor};
  border: 1px solid;
  border-color: ${config.borderColor};
  border-radius: ${config.borderRadius}px;
  bottom: 0;
  box-shadow: ${config.boxShadow};
  left: 0;
  position: absolute;
  right: 0;
  transition: ${config.transition};
  top: 0;

  &.is-seamless {
    background: transparent;
    border-color: transparent;
    box-shadow: none;

    &.is-focused {
      border-color: transparent;
      box-shadow: none;
    }
  }

  &.is-checkbox {
    box-shadow: ${config.boxShadowCheckbox};
  }
  &.is-radio {
    box-shadow: ${config.boxShadowCheckbox};
    border-radius: 50%;
  }

  &.is-disabled {
    background-color: ${config.backgroundColorDisabled};
  }
  &.is-readonly {
    background-color: ${config.backgroundColorReadOnly};
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

  &.is-filled {
    background-color: ${config.backgroundColorFill};
    border-color: ${config.borderColorFill};
  }

  ${makeStateStyles};

  &.is-custom {
    background-color: ${config.custom.backgroundColor};
    border-color: ${config.custom.borderColor};
    box-shadow: ${config.custom.boxShadow};

    &.is-focused {
      background-color: ${config.custom.backgroundColorFocused};
    }

    &.is-filled {
      background-color: ${config.custom.backgroundColorFill};
      border-color: ${config.custom.borderColorFill};
    }
  }
`

export const FocusUI = styled('div')`
  animation: BackdropFocusFadeIn 200ms;
  border-radius: ${config.borderRadius}px;
  bottom: 0px;
  box-shadow: 0 0 0 ${config.focusOutlineWidth}px ${config.focusOutlineColor};
  left: 0px;
  pointer-events: none;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1;

  &.is-radio {
    border-radius: 50%;
  }

  @keyframes BackdropFocusFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
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

  &.is-stateful {
    bottom: -1px;
    left: -1px;
    right: -1px;
    top: -1px;
  }

  ${makeFocusStateStyles};
`

function makeStateStyles() {
  return forEach(
    STATES,
    state => `
    &.is-${state} {
      border-color: ${getColor('state', state, 'borderColor')};

      &.is-seamless {
        border-color: transparent !important;
        box-shadow: none !important;
      }
    }
  `
  )
}

function makeFocusStateStyles() {
  return forEach(
    STATES,
    state => `
    &.is-${state} {
      box-shadow: 0 0 0 ${config.focusErrorOutlineWidth}px
      ${getColor('state', state, 'borderColor')};
    }
  `
  )
}

export default BackdropUI
