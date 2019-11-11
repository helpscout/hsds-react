import styled from 'styled-components'
import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-Truncate')

const truncateStyles = `
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const TruncateUI = styled.span`
  box-sizing: border-box;
  will-change: contents;

  &.is-auto {
    ${truncateStyles};

    .c-Truncate__content {
      ${truncateStyles};
    }
  }
`
