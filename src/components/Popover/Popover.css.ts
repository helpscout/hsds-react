import styled from 'styled-components'
import Tooltip from '../Tooltip/Tooltip'
import { getColor } from '../../styles/utilities/color'
import { getShadow } from '../../styles/utilities/shadow'
import Heading from '../Heading'

export const config = {
  borderColor: getColor('grey.600'),
  boxShadow: getShadow(100),
  padding: '15px',
}

// popover styling has been move to Tooltip.css & Pop/Arrow.css
// to account for a className merge behavior change within styled-components

export const HeaderUI = styled('div')`
  border-bottom: 1px solid ${config.borderColor};
  margin-bottom: ${config.padding};
  margin-left: calc(${config.padding} * -1);
  margin-right: calc(${config.padding} * -1);
  margin-top: calc(${config.padding} * -1);
  padding: 10px ${config.padding};
`

export const HeadingUI = styled(Heading)`
  color: ${getColor('charcoal.300')};
`
HeadingUI.defaultProps = {
  size: 'h4',
  weight: 400,
}
