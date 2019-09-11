import { styledComponent } from '../../styled'
import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-Truncate')

const truncateStyles = `
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const TruncateUI = styledComponent.span`
  box-sizing: border-box;
  will-change: contents;

  &.is-auto {
    ${truncateStyles}

    ${bem.element('content')} {
      ${truncateStyles}
    }
  }
`
