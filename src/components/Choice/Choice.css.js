import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import visuallyHidden from '../../styles/mixins/visuallyHidden.js'

export const choiceConfig = {
  color: {
    labelDefault: getColor('text.muted'),
    labelSelected: getColor('text.default'),
  },
  helpTextOffset: '24px',
  labelTextMargin: '10px',
}

export const ChoiceLabelUI = styled('label')`
  cursor: pointer;
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;

  &.is-block {
    display: block;
  }

  &.is-disabled {
    cursor: not-allowed;
  }

  &.is-stacked {
    color: ${choiceConfig.color.labelDefault};

    &.is-selected {
      color: ${choiceConfig.color.labelSelected};
    }
  }
`

export const ChoiceHelpTextUI = styled('div')`
  margin-left: ${choiceConfig.helpTextOffset};

  &.is-stacked {
    margin-left: 0;
  }
`

export const ChoiceLabelTextUI = styled('span')`
  &.is-stacked {
    display: block;
    font-weight: bold;
    margin-top: ${choiceConfig.labelTextMargin};
  }
`

export const inputConfig = {
  iconColor: 'white',
  radioBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.10)',
  radioSize: 4,
  radioOffset: 3,
  size: 16,
  customSize: 20,
}

export const InputUI = styled('div')`
  align-items: center;
  display: flex;
  justify-content: center;
  height: ${inputConfig.size}px;
  position: relative;
  width: ${inputConfig.size}px;

  &.is-custom {
    height: ${inputConfig.customSize}px;
    width: ${inputConfig.customSize}px;
  }

  &.is-top {
    top: 2px;
  }
`

export const InputInputUI = styled('input')`
  ${visuallyHidden()};
`

export const InputIconUI = styled('div')`
  color: ${inputConfig.iconColor};
  padding: 3px;
  position: relative;
  z-index: 1;
`

export const InputPlaceholderUI = styled('div')`
  background-color: ${inputConfig.iconColor};
  box-shadow: ${inputConfig.radioBoxShadow};
  border-radius: 50%;
  height: ${inputConfig.radioSize}px;
  width: ${inputConfig.radioSize}px;
`

export const InputRadioUI = styled(InputPlaceholderUI)`
  animation: ChoiceInputRadioScale 300ms;

  @keyframes ChoiceInputRadioScale {
    from {
      transform: scale(1.5);
    }
    to {
      transform: scale(1);
    }
  }
`
