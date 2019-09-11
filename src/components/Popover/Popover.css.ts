import { styledComponent } from '../styled'
import Tooltip from '../Tooltip/Tooltip'
import { getColor } from '../../styles/utilities/color'
import { getShadow } from '../../styles/utilities/shadow'
import Heading from '../Heading'

export const config = {
  borderColor: getColor('grey.600'),
  boxShadow: getShadow(100),
  padding: '15px',
}

export const PopoverUI = styledComponent(Tooltip)`
  .c-PopoverContent {
    background: white;
    border: 1px solid ${config.borderColor};
    box-shadow: ${config.boxShadow};
    color: inherit;
    font-size: inherit;
    padding: ${config.padding};
  }

  .c-PopoverArrow {
    border: 1px solid ${config.borderColor};

    &.is-ghost {
      border-color: transparent;
      box-shadow: none;
    }
  }
`

export const HeaderUI = styledComponent('div')`
  border-bottom: 1px solid ${config.borderColor};
  margin-bottom: ${config.padding};
  margin-left: calc(${config.padding} * -1);
  margin-right: calc(${config.padding} * -1);
  margin-top: calc(${config.padding} * -1);
  padding: 10px ${config.padding};
`

export const HeadingUI = styledComponent(Heading)`
  color: ${getColor('charcoal.300')};
`
HeadingUI.defaultProps = {
  size: 'h4',
  weight: 400,
}
