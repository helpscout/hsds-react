import styled from 'styled-components'
import Button from '../Button'
import { getColor } from '../../styles/utilities/color'

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
  }

  pointer-events: all;

  .c-Button__content {
    padding-top: 2px;
    width: 16px !important;
  }
`
