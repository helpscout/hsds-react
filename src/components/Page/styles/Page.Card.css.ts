import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'
import { breakpoint } from '../../../styles/mixins/breakpoints.css'
import PageConfig from './Page.config.css'

export const config = {
  borderRadius: '4px',
  boxShadow: `
    0 0 0 1px rgba(0, 0, 0, 0.04),
    0 2px 8px 0 rgba(0,0,0,0.04),
    0 5px 10px 0 rgba(99, 116, 134, 0.03)
  `,
  boxShadowHover: `
    rgb(214, 221, 227) 0px 0px 0px 1px,
    0 2px 8px 0 rgba(0,0,0,0.04),
    0 5px 10px 0 rgba(99, 116, 134, 0.03)
  `,
  flexDirection: {
    default: 'column',
    superWidescreen: 'row',
  },
  marginBottom: '20px',
  padding: {
    default: '50px 50px 65px',
    widescreen: '50px 100px 65px',
    superWidescreen: '65px 50px',
    fullscreen: '65px 100px',
  },
  transition: 'all 300ms ease',
}

export const CardUI = styled('div')`
  ${baseStyles};
  background-color: white;
  border-radius: ${config.borderRadius};
  box-shadow: ${config.boxShadow};
  display: flex;
  flex-direction: ${config.flexDirection.default};
  padding: ${config.padding.default};
  margin-bottom: ${config.marginBottom};
  transition: ${config.transition};
  width: 100%;

  &:hover {
    box-shadow: ${config.boxShadowHover};
  }

  ${breakpoint(
    PageConfig.breakpoint.widescreen,
    `
      padding: ${config.padding.widescreen};
    `
  )};

  .is-responsive & {
    ${breakpoint(
      PageConfig.breakpoint.superWidescreen,
      `
        padding: ${config.padding.superWidescreen};
      `
    )};

    ${breakpoint(
      PageConfig.breakpoint.fullscreen,
      `
        padding: ${config.padding.fullscreen};
      `
    )};
  }
`

export default CardUI
