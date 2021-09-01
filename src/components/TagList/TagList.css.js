import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { setFontSize } from '../../styles/utilities/font'

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
