import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import Heading from '../Heading'
import SortableDragHandle from '../Sortable/Sortable.DragHandle'

const br = 3
const bxSdw = getColor('grey.400')
const offset = 16
const padding = 12

export const SidebarCollapsibleCardUI = styled.div`
  background-color: transparent;
  border-radius: ${br}px;
  box-shadow: 0 0 0 rgba(${bxSdw}, 0);
  margin-bottom: 4px;
  transition: box-shadow 0.2s ease;

  &.is-open {
    background-color: ${getColor('grey.200')};
    box-shadow: 0 1px 2px ${bxSdw};
  }

  .is-sorting & {
    background-color: white;
    box-shadow: 0 0 0 1px ${getColor('grey.500')}, 0 2px 4px ${bxSdw};
  }
`

export const SidebarCollapsibleHeaderUI = styled.a`
  border-radius: ${br}px;
  color: ${getColor('charcoal.700')};
  cursor: pointer;
  display: block;
  min-height: 40px;
  padding: ${padding}px ${padding}px ${padding}px ${offset}px;
  text-decoration: none;

  &:hover {
    background-color: ${getColor('grey.200')};
  }
`

export const SidebarCollapsibleTitleUI = styled(Heading)`
  margin: 0;
`

export const SidebarCollapsibleBodyUI = styled.div`
  background-color: _color(grey, 200);
  border-bottom-left-radius: ${br}px;
  border-bottom-right-radius: ${br}px;
`

export const SidebarCollapsibleContentUI = styled.div`
  color: ${getColor('charcoal.300')};
  padding: ${offset / 4}px ${offset}px ${offset}px;
`

export const SidebarCollapsibleDragHandleUI = styled(SortableDragHandle)`
  color: ${getColor('charcoal.300')};
  margin: -${padding}px -${padding / 2}px -${padding}px -${padding}px;
  padding: ${padding}px ${padding / 2}px ${padding}px ${padding}px;
  .is-sorting & {
    color: ${getColor('charcoal.700')};
  }
`
