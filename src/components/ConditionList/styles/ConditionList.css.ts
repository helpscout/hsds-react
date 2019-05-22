import Centralize from '../../Centralize'
import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor } from '../../../styles/utilities/color'

export const config = {
  operatorHeight: '56px',
  operatorAddHeight: '52px',
}

export const ConditionListUI = styled('div')`
  ${baseStyles};
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

export const AddButtonWrapperUI = styled(OperatorWrapperBaseUI)`
  align-items: flex-end;
  height: ${config.operatorAddHeight};
`
