import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { breakpoint } from '../../../styles/mixins/breakpoints.css'
import PageConfig from './Page.config.css'

export const config = {
  flexDirection: {
    default: 'column',
    superWidescreen: 'row',
  },
  flexItemsAlign: {
    superWidescreen: 'flex-start',
  },
  marginBottom: '35px',
}

export const SectionUI = styled('section')`
  ${baseStyles};
  display: flex;
  flex-direction: ${config.flexDirection.default};
  width: 100%;
  margin-bottom: ${config.marginBottom};

  &:last-child {
    margin-bottom: 0;
  }

  &.is-responsive {
    ${breakpoint(
      PageConfig.breakpoint.superWidescreen,
      `
        flex-direction: ${config.flexDirection.superWidescreen};
        align-items: ${config.flexItemsAlign.superWidescreen};
      `
    )};
  }
`

export default SectionUI
