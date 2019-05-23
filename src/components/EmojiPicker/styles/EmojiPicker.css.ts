import styled from '../../styled'
import Dropdown from '../../Dropdown/DropdownV2'
import Icon from '../../Icon'
import { getColor, rgba } from '../../../styles/utilities/color'

const config = {
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

export const EmojiItemUI = styled(Dropdown.Item)`
  display: inline;
  margin: 8px 5px !important;
  padding: 5px !important;

  ${({ size }) =>
    size &&
    `
  font-size: ${config.sizes[size]}
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
