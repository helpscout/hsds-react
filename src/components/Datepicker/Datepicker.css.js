import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'

export const CalendarContainerUI = styled('div')`
  width: ${({ numberOfMonths }) => `${numberOfMonths * 300}px`};
  padding: 7px 10px 20px;
  background: white;
  border: 1px solid ${getColor('grey.600')};
  border-radius: 4px;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.08);
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
  background: white;
  color: white;
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('charcoal.600')};
  border: 2px solid transparent;
  border-radius: 4px;

  &:focus {
    outline: 0;
    border: 2px solid ${getColor('blue.500')};
  }

  &:not([disabled]):hover {
    color: ${getColor('blue.600')};
    background: ${getColor('blue.200')};
  }
`

export const SequentialNavButtonUI = styled('button')`
  height: 32px;
  width: 32px;
  background: transparent;
  padding: 0;
  font-size: 12px;
  border: 2px solid transparent;
  border-radius: 4px;

  &:focus {
    outline: 0;
    border: 2px solid ${getColor('blue.500')};
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
`

export const DaysGridUI = styled('div')`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
`

export const DayUI = styled('button')`
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

  &:not([disabled]):hover {
    color: ${getColor('blue.600')};
    background: ${getColor('blue.200')};
  }

  &:focus {
    outline: 0;
    border: 2px solid ${getColor('blue.500')};
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

  &.is-this-period {
    color: ${getColor('charcoal.700')};
    background: ${getColor('grey.300')};
  }

  &[disabled] {
    color: ${getColor('charcoal.200')};
  }

  &:not([disabled]):hover {
    color: ${getColor('blue.600')};
    background: ${getColor('blue.200')};
  }

  &:focus {
    outline: 0;
    border-radius: 4px;
    border: 2px solid ${getColor('blue.500')};
  }
`
