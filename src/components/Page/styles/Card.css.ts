import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import { breakpoint } from '../../../styles/mixins/breakpoints.css.js'
import PageConfig from './Page.config.css'

export const config = {
  borderRadius: '4px',
  boxShadow: `
    0px 0px 0px 1px rgba(0, 0, 0, 0.05),
    0px 5px 10px 0px ${getColor('grey.300')},
    0px 3px 3px 0px rgba(0, 0, 0, 0.05)
  `,
  boxShadowHover: `
    0px 0px 0px 1px ${getColor('grey.500')},
    0px 5px 10px 1px ${getColor('grey.300')},
    0px 3px 3px 0px rgba(0, 0, 0, 0.05)
  `,
  flexDirection: {
    default: 'column',
    superWidescreen: 'row',
  },
  marginBottom: '20px',
  padding: {
    default: '50px 50px',
    widescreen: '50px 100px 65px',
  },
  transition: 'all 300ms ease',
}

export const CardUI = styled('div')`
  ${baseStyles} background-color: white;
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

  &.is-responsive {
    ${breakpoint(
      PageConfig.breakpoint.superWidescreen,
      `
        flex-direction: ${config.flexDirection.superWidescreen};
      `
    )};
  }
`

export default CardUI
