import Flexy from '../../Flexy'
import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'

export const config = {
  backgroundColor: getColor('grey.200'),
  border: `1px solid ${getColor('border.ui')}`,
  borderRadius: '3px',
  padding: '10px',
}

export const ConditionUI = styled(Flexy)`
  background-color: ${config.backgroundColor};
  border: ${config.border};
  border-radius: ${config.borderRadius};
  padding: ${config.padding};
`

export const OptionsWrapperUI = styled(Flexy.Item)`
  width: 170px;
`

export const ContentWrapperUI = styled(Flexy.Block)``

export const OperatorUI = styled('div')`
  ${baseStyles};
  background: ${getColor('grey.600')};
  border-radius: 2px;
  box-shadow: 0 0 0 2px white;
  color: white;
  display: inline-block;
  margin: 5px 0;
  padding: 3px 5px;
  text-transform: uppercase;
  line-height: 1;

  &.is-borderless {
    box-shadow: none;
  }
`
