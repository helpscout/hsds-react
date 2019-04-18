import baseStyles from '../../styles/resets/baseStyles.css.js'
import styled from '../styled'
import { getColor } from '../../styles/utilities/color'
import { setFontSize } from '../../styles/utilities/font'

export const TagListUI = styled('div')`
  ${baseStyles};
  max-height: 40px;
  overflow: hidden;
  will-change: contents;

  &.is-showingAll {
    max-height: none;
  }
`

export const ClearAllUI = styled('button')`
  ${baseStyles};
  border: none;
  background: none;
  cursor: pointer;
  padding: 0 4px;
  height: 100%;
  margin-left: 8px;
  color: ${getColor('charcoal.200')};
  ${setFontSize(13)};

  &:hover {
    color: ${getColor('charcoal.400')};
  }
`

export default TagListUI
