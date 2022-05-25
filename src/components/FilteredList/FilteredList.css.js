import styled from 'styled-components'

import { getColor } from '@hsds/utils-color'
import { setFontSize } from '@hsds/utils-fonts'

import Badge from '../Badge'
import { focusRing } from '@hsds/utils-mixins'

export const ItemUI = styled('li')`
  display: flex;
  flex-direction: row;
  margin: 0;
  align-items: center;
  color: ${getColor('charcoal.400')};
  min-height: 22px;
`

export const BadgeUI = styled(Badge)`
  ${focusRing};
  --focusRingRadius: 3px;
  margin-left: 5px;

  &.is-square {
    background: white;
    border-color: ${getColor('grey.500')};
    color: ${getColor('charcoal.600')};
    font-size: 12px;
    font-weight: 500;
    height: 22px;
    padding: 0 7px;
    display: inline-flex;
    align-items: center;
    line-height: normal;
  }
`

export const BadgeItemUI = styled('div')`
  &:not(:last-child) {
    margin-bottom: 2px;
  }
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
