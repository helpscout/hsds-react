import { STATUSES } from '@hsds/utils-constants'
import styled from 'styled-components'

import { getColor } from '@hsds/utils-color'
import { forEach } from '@hsds/utils-sass'
import { variableFontSize } from '@hsds/utils-fonts'

const DEFAULT_COLOR = getColor('charcoal.200')

const BadgeUI = styled.div`
  
  ${variableFontSize({ fontSize: 12 })}
  background-color: ${props =>
    props.inverted ? 'white' : props.color || DEFAULT_COLOR};
  border-radius: 9999px;
  box-sizing: border-box;
  border: ${props => (props.inverted ? `1px solid ${props.color}` : 'none')};
  color: ${props =>
    props.inverted
      ? props.textColor || props.color
      : props.textColor || 'white'};
  display: inline-block;
  font-weight: 500;
  min-width: 18px;
  line-height: 1;
  padding: 3px 8px;
  text-align: center;

  ${props => makeStatusStyles(props)}

  &.is-sm {
    ${variableFontSize({ fontSize: 11 })}
    padding: 2px 8px;
  }

  &.is-count {
    font-weight: 400;
    min-width: 20px;
    padding: 4px;
  }

  &.is-square {
    border-radius: 3px;
    font-weight: 400;
    padding: 4px 3px;
    font-size: 11px;
    line-height: 10px;
    color: ${getColor('charcoal.300')};
    background-color: ${getColor('grey.300')};
    box-shadow: 0 0 0 1px ${getColor('grey.500')} inset;
  }

  &.is-white {
    background-color: white;
    box-shadow: 0 0 0 1px ${getColor('border.ui')} inset;
    color: ${getColor('charcoal.200')};
  }

  &.is-display-block {
    display: block;
  }
  &.is-display-inlineBlock {
    display: inline-block;
  }
`

function makeStatusStyles(props) {
  return forEach(STATUSES, status => {
    const statusColor = getColor('state', status, 'borderColor')

    return `
    &.is-${status} {
      background-color: ${props.inverted ? 'white' : statusColor};
      border: ${props.inverted ? `1px solid ${statusColor}` : 'none'};
      color: ${props.inverted ? statusColor : 'white'};
    }
  `
  })
}

export default BadgeUI
