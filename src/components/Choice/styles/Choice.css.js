// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled/index'

export const config = {
  helpTextOffset: 24,
}

export const ChoiceUI = styled('div')`
  ${baseStyles};
`

export const ChoiceLabelUI = styled('label')`
  cursor: pointer;
  margin-bottom: 0;

  &.is-disabled {
    cursor: not-allowed;
  }
`

export const ChoiceHelpTextUI = styled('div')`
  margin-left: ${config.helpTextOffset}px;
`

export default ChoiceUI
