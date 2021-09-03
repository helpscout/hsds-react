import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { setFontSize } from '../../styles/utilities/font'
import { darken } from '../../utilities/color'

export const ShowAllButtonUI = styled.button`
  margin-left: 8px;
  position: relative;
  border-radius: 3px;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  height: 28px;
  min-width: 28px;
  border: 1px solid ${getColor('grey.400')};
  color: ${getColor('charcoal.600')};
  background-color: ${getColor('grey.400')};
  box-shadow: none;
  font-size: 12px;
  line-height: 1;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

  // focus border
  &:before {
    content: '';
    border-radius: 4px;
    bottom: -2px;
    box-shadow: 0 0 0 2px ${getColor('blue.500')};
    left: -2px;
    pointer-events: none;
    position: absolute;
    right: -2px;
    top: -2px;
    opacity: 0;
    background: transparent;
    z-index: 3;
  }

  &:focus {
    &:before {
      opacity: 1;
    }
  }

  &:focus:not(:focus-visible) {
    &:before {
      opacity: 0;
    }
  }

  &:focus-visible {
    &:before {
      opacity: 1 !important;
      transition: opacity ease 0.2s;
    }
  }

  &:hover {
    cursor: pointer;
    border-color: ${darken(getColor('grey.400'), 30)};
  }
`

export const BadgeItemUI = styled('div')`
  margin-bottom: 2px;
`

export const ListUI = styled.ul`
  display: block;
  margin: 0 0 8px 0;
  padding: 0;
  max-width: 100%;
`

export const ItemUI = styled.li`
  display: inline-flex;
  margin: 0 8px 8px 0;
  max-width: 100%;
  padding: 0;
  align-items: center;
  list-style: none;
`

export const TagListUI = styled('div')`
  max-height: 40px;
  overflow: hidden;
  will-change: contents;
  padding: 4px;
  margin: -4px;

  &.is-sm {
    max-height: 34px;
    ${ListUI} {
      margin: 0 0 4px 0;
    }
    ${ItemUI} {
      margin: 0 4px 4px 0;
    }

    ${ShowAllButtonUI} {
      height: 18px;
      min-width: 18px;
    }
  }

  &.is-showingAll {
    max-height: none;
  }
`

export const ClearAllUI = styled('button')`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0 4px;
  height: 100%;
  margin-left: 8px;
  color: ${getColor('charcoal.200')};
  ${setFontSize(12)};

  &:hover {
    color: ${getColor('charcoal.400')};
  }
`

export default TagListUI
