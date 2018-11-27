import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { breakpoint } from '../../../styles/mixins/breakpoints.css.js'
import styled from '../../styled'
import PageConfig from './Page.config.css'

export const config = {
  minWidth: '480px',
  maxWidth: {
    default: '700px',
    superWidescreen: '1000px',
  },
  transition: 'max-width 200ms ease',
}

export const PageUI = styled('div')`
  ${baseStyles} margin-left: auto;
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
  }
`

export default PageUI
