import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { setFontSize } from '../../styles/utilities/font'

export const TagListUI = styled('div')`
  max-height: 36px;
  overflow: hidden;
  will-change: contents;

  &.is-sm {
    max-height: 24px;
  }
  &.is-md {
    max-height: 30px;
  }

  &.is-showingAll {
    max-height: none;
  }
`

export const ListUI = styled.ul`
  display: block;
  margin: 0 0 4px 0;
  padding: 0;
  max-width: 100%;
`

export const ItemUI = styled.li`
  display: inline-flex;
  margin: 0 4px 4px 0;
  max-width: 100%;
  padding: 0;
  align-items: center;
  list-style: none;
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
