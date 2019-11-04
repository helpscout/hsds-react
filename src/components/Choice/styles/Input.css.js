import baseStyles from '../../../styles/resets/baseStyles.css.js'
import visuallyHidden from '../../../styles/mixins/visuallyHidden.css.js'
import styled from 'styled-components'

export const config = {
  iconColor: 'white',
  radioBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.10)',
  radioSize: 4,
  radioOffset: 3,
  size: 16,
  customSize: 20,
}

export const InputUI = styled('div')`
  ${baseStyles} align-items: center;
  display: flex;
  justify-content: center;
  height: ${config.size}px;
  position: relative;
  width: ${config.size}px;

  &.is-custom {
    height: ${config.customSize}px;
    width: ${config.customSize}px;
  }

  &.is-top {
    top: 2px;
  }
`

export const InputInputUI = styled('input')`
  ${visuallyHidden()};
`

export const InputIconUI = styled('div')`
  color: ${config.iconColor};
  padding: 3px;
  position: relative;
  z-index: 1;
`

export const InputPlaceholderUI = styled('div')`
  background-color: ${config.iconColor};
  box-shadow: ${config.radioBoxShadow};
  border-radius: 50%;
  height: ${config.radioSize}px;
  width: ${config.radioSize}px;
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

export default InputUI
