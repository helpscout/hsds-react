import styled from 'styled-components'
import Accordion from '../Accordion'
import Flexy from '../Flexy'
import { getColor } from '../../styles/utilities/color'
import Icon from '../Icon/index'

export const AccordionUI = styled(Accordion)`
  border: 1px solid red;
  padding-bottom: 15px;
`
export const IconUI = styled(Icon)``

export const HandleUI = styled('div')`
  color: ${getColor('grey.700')};
  cursor: move;
  display: block;
  height: 24px;
  left: 15px;
  pointer-events: all;
  position: absolute;
  top: 14px;
  padding: 0;
  margin: 0;
  width: 24px;
`

export const ContentUI = styled(Flexy)`
  margin-left: -10px;
  padding-right: 5px;
`

export const SortableItemUI = styled('div')<{ isDragging?: boolean }>`
  border-bottom: 1px solid ${getColor('border')};
  pointer-events: all;
  position: relative;
  width: 100%;
  z-index: 2;

  &:last-child {
    border-bottom: none;
  }

  ${({ isDragging }) =>
    isDragging &&
    `
    background-color: ${getColor('grey.200')};
    border-bottom: none;
    z-index: 10;
  `};
`
