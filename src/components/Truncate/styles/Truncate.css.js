import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-Truncate')

const truncateStyles = `
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const css = `
  box-sizing: border-box;
  will-change: contents;

  &.is-auto {
    ${truncateStyles}

    ${bem.element('content')} {
      ${truncateStyles}
    }
  }
`

export default css
