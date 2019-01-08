import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { breakpoint } from '../../../styles/mixins/breakpoints.css.js'
import styled from '../../styled'
import PageConfig from './Page.config.css'
import Heading from '../../Heading'

export const config = {
  paddingBottom: '11px',
  marginBottom: '27px',
  marginRight: {
    superWidescreen: '60px',
  },
  width: {
    default: '100%',
    superWidescreen: '250px',
  },
}

export const HeaderUI = styled('header')`
  ${baseStyles} margin-bottom: 0;
  width: ${config.width.default};

  &.is-withBorder {
    border-bottom: 1px solid #e3e8eb;
    padding-bottom: ${config.paddingBottom};
  }

  &.is-withBottomMargin {
    margin-bottom: ${config.marginBottom};
  }

  &.is-responsive {
    ${breakpoint(
      PageConfig.breakpoint.superWidescreen,
      `
        border-bottom: none;
        width: ${config.width.superWidescreen};
        margin-right: ${config.marginRight.superWidescreen}
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

export const HeadingUI = styled(Heading)`
  margin: 0;
  padding: 0;
`
