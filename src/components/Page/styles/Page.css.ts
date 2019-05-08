import baseStyles from '../../../styles/resets/baseStyles.css'
import { breakpoint } from '../../../styles/mixins/breakpoints.css'
import styled from '../../styled'
import PageConfig from './Page.config.css'

export const config = {
  minWidth: '480px',
  maxWidth: {
    default: '700px',
    superWidescreen: '1000px',
    widest: '1200px',
  },
  transition: 'max-width 200ms ease',
}

export const PageUI = styled('div')`
  ${baseStyles};
  margin-left: auto;
  margin-right: auto;
  max-width: ${config.maxWidth.default};
  min-width: ${config.minWidth};
  transition: ${config.transition};
  width: 100%;

  &.is-responsive {
    ${breakpoint(
      PageConfig.breakpoint.superWidescreen,
      `
      max-width: ${config.maxWidth.superWidescreen};
    `
    )};

    ${breakpoint(
      PageConfig.breakpoint.widest,
      `
      max-width: ${config.maxWidth.widest};
    `
    )};
  }
`

export default PageUI
