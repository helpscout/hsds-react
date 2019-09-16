import baseStyles from '../../../styles/resets/base.css.js'
import styled from 'styled-components'
import Pop from '../../Pop'
import { getColor } from '../../../styles/utilities/color'

export const config = {
  background: getColor('charcoal.700'),
  text: 'white',
}

export const TooltipUI = styled(Pop)`
  ${baseStyles};
`

export const PopperUI = styled('span')`
  ${baseStyles};
  background-color: ${config.background};
  border-radius: 3px;
  color: ${config.text};
  display: block;
  font-size: 12px;
  max-width: 300px;
  padding: 6px 8px;
  word-break: break-word;
`
