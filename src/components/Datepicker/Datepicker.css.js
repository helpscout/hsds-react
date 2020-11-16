import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { FONT_FAMILY as SYSTEM_FONT_FAMILY } from '../../styles/configs/constants'
import { FONT_FAMILY as AKTIV_FONT_FAMILY } from '../HSDS/GlobalStyle'

export const CalendarContainerUI = styled('div')`
  width: ${({ numberOfMonths }) => `${numberOfMonths * 300}px`};
  padding: 7px 10px 20px;
  background: #fff;
  border: 1px solid ${getColor('grey.600')};
  border-radius: 4px;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.08);
  font-family: ${SYSTEM_FONT_FAMILY};
`

export const DailyCalendarUI = styled('div')`
  ${({ numberOfMonths }) =>
    numberOfMonths > 1
      ? `
  display: grid;
  grid-template-columns: ${({ numberOfMonths }) =>
    `repeat(${numberOfMonths}, 300px)`};
    grid-gap: 0 64px;
    justify-items: center;
  `
      : `
      width: calc(100% - 40px);
      margin: 0 auto;
      `}
`

export const NavigatorUI = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const DeepNavigatorButtonUI = styled('button')`
  height: 36px;
  line-height: 32px;
  border: 0;
  background: #fff;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  font-family: ${AKTIV_FONT_FAMILY};
  color: ${getColor('charcoal.600')};
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;

  &:focus {
    outline: 0;
    border: 2px solid ${getColor('blue.500')};
  }

  &:not([disabled]):hover {
    color: ${getColor('blue.600')};
    background: ${getColor('blue.200')};
    border-color: ${getColor('blue.200')};
  }
`

export const SequentialNavButtonUI = styled('button')`
  height: 32px;
  width: 32px;
  background: transparent;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 4px;
  font-size: 12px;
  color: ${getColor('charcoal.500')};
  cursor: pointer;

  &:focus {
    outline: 0;
    border: 2px solid ${getColor('blue.500')};
  }

  &:not([disabled]):hover {
    color: ${getColor('blue.600')};
    background: ${getColor('blue.200')};
    border-color: ${getColor('blue.200')};
  }

  &[disabled] {
    cursor: default;
    color: ${getColor('charcoal.200')};
  }

  .c-Icon {
    margin: 0 auto;
  }
`

export const WeekdaysRowUI = styled('div')`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  margin-bottom: 10px;
  font-size: 14px;
  font-family: ${AKTIV_FONT_FAMILY};
  color: ${getColor('charcoal.500')};
`

export const DaysGridUI = styled('div')`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
`

export const DayWrapperUI = styled('div')`
  position: relative;

  /* First day per row in the month grid */
  &:nth-child(7n-6) {
    .is-selected,
    .is-within-hover-range {
      border-radius: 50% 0 0 50% !important;
    }
  }

  /* Last day per row in the month grid*/
  &:nth-child(7n) {
    .is-selected,
    .is-within-hover-range {
      border-radius: 0 50% 50% 0 !important;
    }

    .is-selected-start-marker {
      display: none;
    }
  }
`

export const DayUI = styled('button')`
  position: relative;
  width: 36px;
  height: 36px;
  padding: 0;
  line-height: 32px;
  border: 2px solid transparent;
  border-radius: 50%;
  text-align: center;
  font-size: 14px;
  font-weight: ${({ isSelected, isDateToday }) =>
    isSelected || isDateToday ? '500' : 'normal'};
  color: ${({ labelColor }) => labelColor};
  background: ${({ bgColor }) => bgColor};
  -moz-osx-font-smoothing: ${({ isSelected, isDateToday }) =>
    isSelected || isDateToday ? 'auto' : 'grayscale'};
  -webkit-font-smoothing: ${({ isSelected, isDateToday }) =>
    isSelected || isDateToday ? 'auto' : 'antialiased'};
  cursor: pointer;
  z-index: 1;

  &:not([disabled]):not(.is-from-another-month):not(.is-selected):hover {
    color: ${getColor('blue.600')};
    background: ${getColor('blue.200')};
    border-color: ${getColor('blue.200')};
  }

  &:focus {
    outline: 0;
    border-color: ${getColor('blue.500')};
  }

  &[disabled] {
    cursor: default;
  }

  &.is-within-hover-range:not(.is-selected-start):not(.is-selected-end) {
    border-radius: 0;

    &:hover {
      border-radius: 0 50% 50% 0 !important;
    }
  }

  &.is-within-hover-range.is-selected-start:hover + .is-selected-start-marker {
    border-radius: 50% !important;
  }

  &.is-selected {
    border-radius: 0;

    &.is-selected-end,
    &.is-selected-start {
      border-radius: 50% !important;
    }
  }

  &.is-within-hover-range.is-selected-start {
    border-radius: 50% !important;
  }
`

export const DateRangeBGHelperUI = styled('div')`
  position: absolute;
  width: 36px;
  height: 36px;
  background: ${getColor('blue.200')};
  top: 0;
  left: 0;
  z-index: 0;

  &.is-selected-start-marker {
    border-radius: 50% 0 0 50%;
  }

  &.is-selected-end-marker {
    border-radius: 0 50% 50% 0;
  }
`

export const PeriodUI = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 8px;
  justify-items: center;
`

export const PeriodButtonUI = styled('button')`
  width: 84px;
  height: 36px;
  line-height: 32px;
  border: 2px solid transparent;
  border-radius: 3px;
  background-color: #fff;
  text-align: center;
  font-size: 14px;
  color: ${getColor('charcoal.600')};
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;

  .is-mode-months & {
    font-family: ${AKTIV_FONT_FAMILY};
  }

  &.is-this-period {
    color: ${getColor('charcoal.700')};
    background: ${getColor('grey.300')};
  }

  &.is-selected {
    color: #fff;
    background: ${getColor('blue.500')};
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: none;
  }

  &[disabled] {
    color: ${getColor('charcoal.200')};
    cursor: default;
  }

  &:not([disabled]):not(.is-selected):hover {
    color: ${getColor('blue.600')};
    background: ${getColor('blue.200')};
    border-color: ${getColor('blue.200')};
  }

  &:focus {
    outline: 0;
    border-radius: 4px;
    border: 2px solid ${getColor('blue.500')};
  }
`
