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
  padding: 4px;

  * {
    box-sizing: border-box;
  }
`

export const MenuListUI = styled('ul')`
  width: 100%;
  max-height: 120px;
  overflow-y: scroll;
  margin: 0;
  padding: 0;
  list-style: none;
`

export const InputSearchHolderUI = styled('div')`
  width: 100%;
  margin-bottom: 5px;

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
      box-shadow: inset 0 0 0 2px ${getColor('blue.500')};
    }
  }
`

export const ListItemUI = styled('li')`
  padding: 0 15px;
  height: 36px;
  border-radius: 3px;
  background-color: ${({ highlighted }) =>
    highlighted ? '#bde4ff' : 'transparent'};
  color: ${({ selected }) =>
    selected ? 'rebeccapurple' : getColor('charcoal.600')};
  line-height: 36px;
`

export const items = [
  'Neptunium',
  'Plutonium',
  'Americium',
  'Curium',
  'Berkelium',
  // 'Californium',
  // 'Einsteinium',
  // 'Fermium',
  // 'Mendelevium',
  // 'Nobelium',
  // 'Lawrencium',
  // 'Rutherfordium',
  // 'Dubnium',
  // 'Seaborgium',
  // 'Bohrium',
  // 'Hassium',
  // 'Meitnerium',
  // 'Darmstadtium',
  // 'Roentgenium',
  // 'Copernicium',
  // 'Nihonium',
  // 'Flerovium',
  // 'Moscovium',
  // 'Livermorium',
  // 'Tennessine',
  // 'Oganesson',
]
