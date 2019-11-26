import { breakpoint } from '../../../styles/mixins/breakpoints.css'
import styled from 'styled-components'
import PageConfig from './Page.config.css'
import Heading from '../../Heading'

export const config = {
  paddingBottom: '11px',
  marginBottom: '27px',
  marginRight: {
    superWidescreen: '50px',
  },
  width: {
    default: '100%',
    superWidescreen: '250px',
    widest: '300px',
  },
}

export const HeaderUI = styled('header')`
  margin-bottom: 0;
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

    ${breakpoint(
      PageConfig.breakpoint.widest,
      `
        width: ${config.width.widest};
      `
    )};
  }
`

export const SubTitleUI = styled('div')`
  margin-top: 5px;
`

export const HeadingUI = styled(Heading)`
  margin: 0;
  padding: 0;
`
