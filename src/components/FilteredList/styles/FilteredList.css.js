import styled from '../../styled'
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import { setFontSize } from '../../../styles/utilities/font'

import Badge from '../../Badge'

export const ItemUI = styled('li')`
  display: flex;
  flex-direction: row;
  margin: 0;
  align-items: center;
  color: ${getColor('charcoal.400')};
`

export const BadgeUI = styled(Badge)`
  margin-left: 5px;
`

export const BadgeItemUI = styled('div')`
  margin-bottom: 2px;
`

export const SeparatorUI = styled('span')`
  display: inline-flex;
  align-items: center;
  color: ${getColor('grey.600')};
  margin-left: 10px;
  height: 100%;
  line-height: 1;
`

export const FilteredListUI = styled('ul')`
  ${baseStyles};
  margin: 0;
  ${setFontSize(13)};
  display: flex;
  flex-direction: column;

  &.is-inline {
    flex-direction: row;

    ${ItemUI} {
      margin-right: 10px;
    }

    ${BadgeUI} {
      margin-left: 10px;
    }
  }
`
