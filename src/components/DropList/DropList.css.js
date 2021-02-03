import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { FONT_FAMILY as AKTIV_FONT_FAMILY } from '../HSDS/GlobalStyle'

export const DropListWrapperUI = styled('div')`
  width: 300px;
  font-family: ${AKTIV_FONT_FAMILY};
  font-size: 13px;
  color: ${getColor('charcoal.600')};
  border: 1px solid ${getColor('grey.600')};
  box-sizing: border-box;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 0;

  * {
    box-sizing: border-box;
  }
`

export const MenuListUI = styled('ul')`
  width: 100%;
  max-height: 120px;
  overflow-y: scroll;
  margin: 0;
  padding: 0 0 5px 0;
  list-style: none;
`

export const InputSearchHolderUI = styled('div')`
  width: calc(100% - 10px);
  margin: 5px 5px 10px 5px;

  input {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    font-family: ${AKTIV_FONT_FAMILY};
    font-size: 13px;
    color: ${getColor('charcoal.600')};
    box-shadow: inset 0 0 0 1px ${getColor('grey.600')};
    border: 0;
    border-radius: 3px;

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px ${getColor('blue.500')};
    }
  }
`

export const ListItemUI = styled('li')`
  height: 36px;
  margin: 0 5px;
  padding: 0 15px;
  border-radius: 3px;
  line-height: 36px;
  ${({ highlighted, selected }) => getListItemColors({ highlighted, selected })}

  &:last-child {
    margin-bottom: 5px;
  }
`
export const DividerUI = styled('div')`
  width: 100%;
  height: 1px;
  margin: 9px 0;
  background-color: ${getColor('grey.500')};
`

export const GroupLabelUI = styled('div')`
  height: 36px;
  margin: 0 5px;
  padding: 0 15px;
  line-height: 36px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: ${getColor('charcoal.200')};
`

export function getListItemColors({ selected, highlighted }) {
  let color
  let bgc

  if (selected && highlighted) {
    color = 'white'
    bgc = getColor('blue.500')
  } else if (selected) {
    color = 'white'
    bgc = getColor('blue.500')
  } else if (highlighted) {
    bgc = getColor('blue.100')
    color = getColor('charcoal.800')
  } else {
    bgc = 'transparent'
    color = getColor('charcoal.600')
  }

  return `
    color: ${color};
    background-color: ${bgc};
  `
}
