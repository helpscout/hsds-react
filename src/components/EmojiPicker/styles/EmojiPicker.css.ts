import styled from 'styled-components'
import Icon from '../../Icon'
import { getColor, rgba } from '../../../styles/utilities/color'

export const config = {
  sizes: {
    default: '24px',
    sm: '16px',
    lg: '32px',
  },
}

export const MenuUI = styled('div')`
  display: flex;
  overflow: hidden;
  padding-left: 5px;
  padding-right: 5px;

  .c-DropdownV2Item.is-option {
    background: none !important;
    padding: 0;
    outline: none !important;
  }
`

export const ItemWrapperUI = styled('div')`
  align-items: center;
  background: transparent;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  margin: 3px;
  transform: scale(1);

  .c-DropdownV2Item.is-focused &,
  &:hover {
    transform: scale(1.075);
  }

  ${({ size }) =>
    size &&
    `
    height: calc(${config.sizes[size]} + 10px);
    width: calc(${config.sizes[size]} + 10px);
  `}
`

export const ItemUI = styled('div')`
  ${({ size }) =>
    size &&
    `
    font-size: ${config.sizes[size]};
    padding: 0 !important;
    height: ${config.sizes[size]};
    width: ${config.sizes[size]};
  `}

  &.is-focused {
    &.is-option {
      border-radius: 50% !important;
    }
  }

  .c-EmojiPickerView {
    display: block;
    line-height: 1;
    position: relative;
    top: 1px;

    ${({ size }) =>
      size &&
      `
    font-size: ${config.sizes[size]};
    height: ${config.sizes[size]};
    width: ${config.sizes[size]};
  `};
  }
`

export const TriggerUI = styled(Icon)`
  color: ${getColor('grey.600')};

  .c-DropdownV2Trigger:active &,
  .c-DropdownV2Trigger:focus &,
  .c-DropdownV2Trigger:hover & {
    color: ${getColor('yellow.500')};
  }
`
