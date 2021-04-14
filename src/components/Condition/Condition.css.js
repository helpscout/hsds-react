import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import Centralize from '../Centralize'
import Flexy from '../Flexy'
import Button from '../Button'
import { SplitButton } from '../DropList/DropList.togglers'

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

export const SelectedOptionUI = styled(Flexy)`
  align-items: center;
  height: 40px;
  font-weight: 500;
  font-size: 14px;
  color: ${getColor('charcoal.700')};
  padding: 0 16px;
`

export const OperatorUI = styled('div')`
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

export const SplitButtonUI = styled(SplitButton)`
  & .c-ControlGroupItem {
    margin-top: 2px;
    margin-bottom: 2px;

    & .SplitButton__Action {
      min-width: 32px;
      text-transform: uppercase;
      padding: 0 6px;
    }

    & .SplitButton__Toggler {
      /* There's already important used in a component, so I have to use it to overwrite */
      min-width: 20px !important;
      width: 20px;
    }

    & ul {
      overflow-y: hidden;
    }

    & .DropList__Select {
      width: 80px;
    }
  }
`

export const ButtonWrapperUI = styled('div')`
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
    .c-Button__content {
      position: relative;
      top: -1px;
    }

    .c-Icon {
      margin: -0.5px -2px -0.5px -6px !important;
    }
  }
`

export const OperatorWrapperBaseUI = styled(Centralize)`
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
