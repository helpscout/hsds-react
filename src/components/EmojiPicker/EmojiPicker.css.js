import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { DropListWrapperUI, MenuListUI } from '../DropList/DropList.css'

const SIZES = {
  EMOJI: {
    sm: '16px',
    md: '24px',
    lg: '32px',
  },
  LIST_HEIGHT: {
    sm: '32px',
    md: '40px',
    lg: '48px',
  },
  LIST_WIDTH: {
    sm: '200px',
    md: '250px',
    lg: '300px',
  },
  GRID_COLUMNS: {
    sm: '32px',
    md: '40px',
    lg: '48px',
  },
}

export const TogglerUI = styled('button')`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  color: ${getColor('grey.600')};

  &:active,
  &:focus,
  &:hover {
    color: ${getColor('yellow.500')};
  }
`

export const EmojiItemUI = styled('div')`
  width: 100%;
  text-align: center;
  cursor: pointer;
  transform: scale(1);
  display: flex;
  align-items: center;

  .is-highlighted & {
    transform: scale(1.075);
  }
`

export const EmojiPickerUI = styled('div')`
  ${DropListWrapperUI} {
    width: ${({ emojiSize }) => SIZES.LIST_WIDTH[emojiSize]};
    height: ${({ emojiSize }) => SIZES.LIST_HEIGHT[emojiSize]};
    padding: 0;
  }

  ${MenuListUI} {
    display: grid;
    grid-template-columns: repeat(
      6,
      ${({ emojiSize }) => SIZES.GRID_COLUMNS[emojiSize]}
    );
    justify-items: center;
    align-items: center;
    width: 100%;
    height: ${({ emojiSize }) => SIZES.LIST_HEIGHT[emojiSize]};
    padding: 0;
    overflow: hidden;
    line-height: 1;
  }

  ${EmojiItemUI} {
    font-size: ${({ emojiSize }) => SIZES.EMOJI[emojiSize]};
  }
`
