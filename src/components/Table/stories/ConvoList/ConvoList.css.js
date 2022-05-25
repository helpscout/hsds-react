import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'
import Popover from '../../../Popover'

export const GridUI = styled('div')`
  display: grid;
  grid-template-columns: 200px 1fr;
`

export const ConvoListUI = styled('div')`
  margin-bottom: 40px;
  font-size: 13px;

  .c-Table__Header {
    color: ${getColor('charcoal.300')};
    font-weight: 400;
  }

  .convo-active td {
    font-weight: 700;
  }

  .c-Table__Cell.Column_Customer {
    font-size: 14px;
  }

  .replying td:first-child,
  .viewing td:first-child {
    position: relative;

    &::before {
      position: absolute;
      content: '';
      display: block;
      height: 0;
      width: 0;
      top: 0;
      left: 0;
      border-left: 12px solid ${getColor('yellow.500')};
      border-bottom: 12px solid transparent;
      border-top: 0 solid transparent;
    }
  }

  .replying td:first-child::before {
    border-left: 12px solid ${getColor('pink.900')};
  }
`

export const PopoverUI = styled(Popover)`
  max-width: 172px;
`

export const AsideUI = styled('aside')`
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
  background-size: 10px 10px;
`

export const TagUI = styled('div')`
  display: inline-block;
  width: auto;
  height: 15px;
  line-height: 13px;
  padding: 1px 4px;
  font-size: 12px;
  color: white;
  background-color: ${({ color }) => color};
  border-radius: 3px;
  margin-right: 3px;
`

export const H1UI = styled('span')`
  height: 60px;
  font-size: 18px;
  font-weight: 400;
  line-height: 23.04px;
  padding-top: 16px;
  padding-bottom: 19px;
  padding-left: 15px;
  color: ${getColor('charcoal.800')};
`

export const SubjectUI = styled('span')`
  color: ${getColor('charcoal.600')};
  font-size: 13px;
`

export const PreviewUI = styled('div')`
  font-size: 13px;
  color: ${getColor('charcoal.200')};
  font-weight: 400;
`

export const ConversationCellUI = styled('a')`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  // compensate the cell right padding to give space for the fader below
  width: calc(100% + 14px);
  overflow: hidden;
  white-space: nowrap;
  padding: 5px 14px;
  text-decoration: none;

  &:hover ${SubjectUI} {
    text-decoration: underline;
  }

  &::after {
    position: absolute;
    content: '';
    width: 18px;
    height: 100%;
    right: 0;
    top: 0;
    box-shadow: inset -7px 0px 7px white;
    transition: box-shadow 100ms ease-in-out;
  }

  tr.is-row-selected &::after {
    box-shadow: inset -7px 0px 7px ${getColor('blue.100')};
  }

  tr.c-Table__Row:focus &::after {
    box-shadow: inset -7px 0px 7px ${getColor('blue.100')};
  }

  tr.c-Table__Row:hover &::after {
    box-shadow: inset -7px 0px 7px ${getColor('blue.100')};
  }
`
