import Button from '../../Button'
import Centralize from '../../Centralize'
import Flexy from '../../Flexy'
import styled from 'styled-components'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'

export const config = {
  backgroundColor: getColor('grey.200'),
  border: `1px solid ${getColor('border.ui')}`,
  borderRadius: '3px',
  padding: '10px',
  optionsWidth: '170px',
  operatorBorderWidth: '2px',
  operatorHeight: '56px',
}

export const ConditionUI = styled('div')`
  ${baseStyles};
  color: ${getColor('text.subtle')};
`

export const ConditionContentUI = styled(Flexy)`
  background-color: ${config.backgroundColor};
  border: ${config.border};
  border-radius: ${config.borderRadius};
  padding: ${config.padding};
`

export const OptionsWrapperUI = styled(Flexy.Item)`
  width: ${config.optionsWidth};
`

export const ContentWrapperUI = styled(Flexy.Block)``

export const OperatorUI = styled('div')`
  ${baseStyles};
  background: ${getColor('grey.600')};
  border-radius: ${config.operatorBorderWidth};
  box-shadow: 0 0 0 ${config.operatorBorderWidth} white;
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

export const ButtonWrapperUI = styled('div')<{ align?: any }>`
  ${baseStyles};
  ${({ align }) => `text-align: ${align};`};
`

export const ButtonUI = styled(Button)`
  box-shadow: 0 0 0 ${config.operatorBorderWidth} white;
  margin-bottom: ${config.operatorBorderWidth};
  margin-top: ${config.operatorBorderWidth};
  text-transform: uppercase;

  &.is-borderless {
    box-shadow: none;
    margin-bottom: 0;
    margin-top: 0;
  }

  .c-Icon {
    margin: 0 0 0 -8px !important;
  }

  &.is-or {
    .c-ButtonV2__content {
      position: relative;
      top: -1px;
    }

    .c-Icon {
      margin: -0.5px -2px -0.5px -6px !important;
    }
  }
`

export const OperatorWrapperBaseUI = styled(Centralize)`
  ${baseStyles};
  position: relative;
  height: ${config.operatorHeight};

  &::before {
    background: ${getColor('border.ui')};
    bottom: 0;
    content: '';
    height: 100%;
    left: 50%;
    margin-left: -0.5px;
    position: absolute;
    top: 0;
    width: 1px;
  }

  > * {
    z-index: 1;
  }
`

export const AndWrapperUI = OperatorWrapperBaseUI
