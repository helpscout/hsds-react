import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { FONT_FAMILY as SYSTEM_FONT_FAMILY } from '../../styles/configs/constants'
import { FONT_FAMILY as AKTIV_FONT_FAMILY } from '../HSDS/GlobalStyle'

export const CalendarContainerUI = styled('div')`
  width: ${({ numberOfMonths }) => `${numberOfMonths * 300}px`};
  padding: 7px 10px 20px;
  background-color: #fff;
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
      width: calc(100% - 26px);
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
  background-color: #fff;
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
    background-color: ${getColor('blue.200')};
    border-color: ${getColor('blue.200')};
  }
`

export const SequentialNavButtonUI = styled('button')`
  height: 32px;
  width: 32px;
  background-color: transparent;
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
    background-color: ${getColor('blue.200')};
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

export const DayUI = styled('button')`
  position: relative;
  width: 36px;
  height: 36px;
  padding: 0;
  line-height: 36px;
  border: 0;
  border-radius: 50%;
  text-align: center;
  font-size: 14px;
  color: ${getColor('charcoal.600')};
  background-color: #ffffff;
  font-weight: normal;
  -moz-osx-font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  z-index: 1;
  transition: box-shadow ease-in-out 0.05s;

  &.is-today {
    color: ${getColor('charcoal.700')};
    background-color: ${getColor('grey.300')};
    font-weight: 500;
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: auto;
  }

  &.is-within-hover-range {
    color: ${getColor('blue.500')};
    background-color: ${getColor('blue.200')};
  }

  &.is-selected,
  &.is-selected-start,
  &.is-selected-end {
    color: #ffffff;
    background-color: ${getColor('blue.500')};
    font-weight: 500;
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: auto;
  }

  &.is-disabled {
    cursor: default;
    color: #808285;
    background-color: #ffffff;
  }

  &.is-from-another-month {
    color: ${getColor('charcoal.200')};
    background-color: #ffffff;
  }

  &:not([disabled]):not(.is-from-another-month):not(.is-selected):not(.is-selected-end):not(.is-selected-start):hover {
    color: ${getColor('blue.600')};
    background-color: ${getColor('blue.200')};
  }

  &:focus {
    outline: 0;
    box-shadow: inset 0 0 0 2px ${getColor('blue.500')};
  }

  &.with-range-selection {
    &.is-selected:not(.is-selected-end):not(.is-selected-start),
    &.is-selected.is-today:not(.is-selected-end):not(.is-selected-start),
    &.is-selected.is-from-another-month:not(.is-selected-end),
    &.is-within-hover-range.is-today:not(.is-selected-end):not(.is-selected-start) {
      background-color: ${getColor('blue.200')};
      color: ${getColor('blue.500')};
    }

    &.is-from-another-month.is-selected-end {
      color: white;
    }

    &.is-selected,
    &.is-within-hover-range {
      border-radius: 0;
      font-weight: 500;
    }

    &.is-within-hover-range:hover,
    &.is-within-hover-range:nth-child(7n),
    &.is-selected:nth-child(7n) {
      border-radius: 0 50% 50% 0;
    }

    &.is-within-hover-range:not(.is-selected-end):not(.is-selected-start):nth-child(7n-6),
    &.is-selected:not(.is-selected-end):not(.is-selected-start):nth-child(7n-6) {
      border-radius: 50% 0 0 50%;

      &:not(.is-selected):hover {
        border-radius: 50%;
      }
    }

    &.is-selected-start,
    &.is-selected-end,
    &.is-selected-start:hover,
    &.is-selected-end:hover {
      border-radius: 50%;
    }
  }
`

export const TimeUI = styled('time')`
  display: block;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  position: relative;
  z-index: 1;

  .is-selected-start &,
  .is-selected-end & {
    background-color: ${getColor('blue.500')};
    border-radius: 50%;
  }
`

export const DateRangeBGHelperUI = styled('div')`
  position: absolute;
  width: 36px;
  height: 36px;
  background-color: ${getColor('blue.200')};
  top: 0;
  left: 0;
  z-index: 0;

  .is-within-hover-range:hover &.is-selected-start-marker {
    border-radius: 50%;
  }

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
    background-color: ${getColor('grey.300')};
  }

  &.is-selected {
    color: #fff;
    background-color: ${getColor('blue.500')};
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: none;
  }

  &[disabled] {
    color: ${getColor('charcoal.200')};
    cursor: default;
  }

  &:not([disabled]):not(.is-selected):hover {
    color: ${getColor('blue.600')};
    background-color: ${getColor('blue.200')};
    border-color: ${getColor('blue.200')};
  }

  &:focus {
    outline: 0;
    border-radius: 4px;
    border: 2px solid ${getColor('blue.500')};
  }
`
