// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { breakpoint } from '../../../styles/mixins/breakpoints.css.js'
import styled from '../../styled'
import PageConfig from './Page.config.css.js'

export const config = {
  paddingBottom: '11px',
  marginBottom: '25px',
  width: {
    default: '100%',
    superWidescreen: '250px',
  },
}

export const HeaderUI = styled('div')`
  ${baseStyles}
  margin-bottom: ${config.marginBottom};
  padding-bottom: ${config.paddingBottom};
  width: ${config.width.default};

  &.is-withBorder {
    border-bottom: 1px solid #E3E8EB;
  }

  &.is-responsive {
    ${breakpoint(
      PageConfig.breakpoint.superWidescreen,
      `
        border-bottom: none;
        width: ${config.width.superWidescreen};
      `
    )};
  }
`

export const TitleUI = styled('div')`
  ${baseStyles};
`

export const SubTitleUI = styled('div')`
  ${baseStyles} margin-top: 5px;
`
