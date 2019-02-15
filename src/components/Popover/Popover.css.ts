import styled from '../styled'
import Tooltip from '../Tooltip/Tooltip'
import { getColor } from '../../styles/utilities/color'
import { getShadow } from '../../styles/utilities/shadow'

export const config = {
  borderColor: getColor('grey.600'),
}

export const PopoverUI = styled(Tooltip)`
  .c-PopoverContent {
    background: white;
    border: 1px solid ${config.borderColor};
    box-shadow: ${getShadow(100)};
    color: inherit;
    padding: 15px;
  }

  .c-PopoverArrow {
    border: 1px solid ${config.borderColor};
    box-shadow: ${getShadow(100)};

    &.is-ghost {
      border-color: transparent;
      box-shadow: none;
    }
  }
`
