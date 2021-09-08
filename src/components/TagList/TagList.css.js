import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { setFontSize } from '../../styles/utilities/font'
import { darken } from '../../utilities/color'
import { focusRing } from '../../styles/mixins/focusRing'

export const ShowAllButtonUI = styled.button`
  ${focusRing}
  margin-left: 8px;
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

  &:hover {
    cursor: pointer;
    border-color: ${darken(getColor('grey.400'), 30)};
  }
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
  &.is-sm {
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

  &.is-md {
    ${ListUI} {
      margin: 0 0 8px 0;
    }
    ${ItemUI} {
      margin: 0 4px 4px 0;
    }

    ${ShowAllButtonUI} {
      height: 22px;
      min-width: 22px;
    }
  }
`

export const ClearAllUI = styled('button')`
  ${focusRing}
  border: none;
  background: none;
  cursor: pointer;
  padding: 0 4px;
  height: 16px;
  line-height: 1;
  margin-left: 8px;
  color: ${getColor('charcoal.200')};
  ${setFontSize(12)};

  &:hover {
    color: ${getColor('charcoal.400')};
  }
`

export default TagListUI
