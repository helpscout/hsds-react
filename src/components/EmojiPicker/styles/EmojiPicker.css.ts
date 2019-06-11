import styled from '../../styled'
import Dropdown from '../../Dropdown/DropdownV2'
import Icon from '../../Icon'
import { getColor, rgba } from '../../../styles/utilities/color'

export const config = {
  colors: {
    grey: 'grey.300',
    purple: 'purple.300',
    red: 'red.300',
    yellow: 'yellow.300',
  },
  sizes: {
    default: '24px',
    sm: '16px',
    lg: '32px',
  },
}

export const MenuUI = styled(Dropdown.Menu)`
  display: flex;
  padding-left: 5px;
  padding-right: 5px;
`

export const ItemWrapperUI = styled('div')`
  align-items: center;
  background: transparent;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  margin: 3px;

  &:hover {
    background: red;
  }

  ${({ size }) =>
    size &&
    `
    height: calc(${config.sizes[size]} + 10px);
    width: calc(${config.sizes[size]} + 10px);
  `}
`

export const ItemUI = styled(Dropdown.Item)`
  ${({ size }) =>
    size &&
    `
  font-size: ${config.sizes[size]};
  padding: 0 !important;
  height: ${config.sizes[size]};
  width: ${config.sizes[size]};
`};

  &.is-focused {
    &.is-option {
      border-radius: 50% !important;

      ${({ hoverBackgroundColor }) =>
        hoverBackgroundColor &&
        `
        background-color: ${rgba(
          getColor(`${config.colors[hoverBackgroundColor]}`),
          1
        )};
      `};
    }
  }

  span {
    display: inline-block;
    line-height: 1.15;

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
  color: ${getColor('yellow.500')};
`
