import baseStyles from '../../../styles/resets/baseStyles.css.js'
import styled from '../../styled'
import { getColor } from '../../../styles/utilities/color'

export const config = {
  color: {
    labelDefault: getColor('text.muted'),
    labelSelected: getColor('text.default'),
  },
  helpTextOffset: 24,
  labelTextMargin: 10,
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

  &.is-stacked {
    color: ${config.color.labelDefault};

    &.is-selected {
      color: ${config.color.labelSelected};
    }
  }
`

export const ChoiceHelpTextUI = styled('div')`
  margin-left: ${config.helpTextOffset}px;

  &.is-stacked {
    margin-left: 0;
  }
`

export const ChoiceLabelTextUI = styled('span')`
  &.is-stacked {
    display: block;
    font-weight: bold;
    margin-top: ${config.labelTextMargin}px;
  }
`

export default ChoiceUI
