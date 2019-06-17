import styled from '../../styled'
import Icon from '../../Icon'

const { getColor, rgba } = styled._

export const config = {
  colors: {
    grey: 'grey.300',
    purple: 'purple.300',
    red: 'red.300',
    yellow: 'yellow.300',
  },
  hoverBackgroundOpacity: 0.5,
  hoverBackgroundActiveOpacity: 0.85,
  sizes: {
    default: '24px',
    sm: '16px',
    lg: '32px',
  },
}

export const MenuUI = styled('div')`
  display: flex;
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
  transition: background 200ms linear;

  .c-DropdownV2Item.is-focused &,
  &:hover {
    ${({ hoverBackgroundColor }) =>
      hoverBackgroundColor &&
      `
        background-color: ${rgba(
          getColor(`${config.colors[hoverBackgroundColor]}`),
          config.hoverBackgroundOpacity
        )};
      `};
  }

  &:active {
    ${({ hoverBackgroundColor }) =>
      hoverBackgroundColor &&
      `
        background-color: ${rgba(
          getColor(`${config.colors[hoverBackgroundColor]}`),
          config.hoverBackgroundActiveOpacity
        )};
      `};
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
`};

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
  color: ${getColor('yellow.500')};
`
