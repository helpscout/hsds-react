import { BEM } from '../../../utilities/classNames'

const bem = BEM('.c-Truncate')

const truncateStyles = `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const css = `
  box-sizing: border-box;
  will-change: contents;

  &.is-auto {
    display: block;
    ${truncateStyles}

    ${bem.element('content')} {
      ${truncateStyles}
    }
  }
`

export default css
