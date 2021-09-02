import styled from 'styled-components'
import Button from '../Button'
import { FocusUI } from '../Button/Button.css'
import { getColor } from '../../styles/utilities/color'
import config from '../Button/Button.config'

export const SplitButtonUI = styled(Button)`
  &.is-primary {
    ${FocusUI} {
      box-shadow: 0 0 0 ${config.focusOutlineWidth}px ${getColor('blue.600')},
        inset 0 0 0 2px white;
    }
  }
`

export const OptionsTriggerButtonUI = styled(Button)`
  min-width: 30px !important;
  padding: 0 !important;

  &.is-primary {
    box-shadow: -1px 0 0 ${getColor('blue.600')};

    &.is-success {
      box-shadow: -1px 0 0 ${getColor('green.600')};
    }
    &.is-danger {
      box-shadow: -1px 0 0 ${getColor('red.600')};
    }
    &[disabled] {
      box-shadow: -1px 0 0 ${getColor('grey.600')};
    }

    ${FocusUI} {
      box-shadow: 0 0 0 ${config.focusOutlineWidth}px ${getColor('blue.600')},
        inset 0 0 0 2px white;
    }
  }

  pointer-events: all;

  .c-Button__content {
    padding-top: 2px;
    width: 16px !important;
  }
`
