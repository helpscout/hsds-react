import React, { useRef, useContext } from 'react'
import { useDay } from '@datepicker-react/hooks'
import { classNames } from '../../utilities/classNames'
import { getColor } from '../../styles/utilities/color'
import DatepickerContext from './Datepicker.Context'
import {
  getDayColor,
  isToday,
  getValidDateTimeString,
} from './Datepicker.utils'
import { DayUI } from './Datepicker.css'

function Day({ dayLabel, date, leading, trailing }) {
  const dayRef = useRef(null)
  const {
    isDateBlocked,
    isDateFocused,
    isDateHovered,
    isDateSelected,
    isFirstOrLastSelectedDate,
    onDateSelect,
  } = useContext(DatepickerContext)
  const {
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    onClick,
  } = useDay({
    date,
    isDateBlocked,
    isDateFocused,
    isDateHovered,
    isDateSelected,
    isFirstOrLastSelectedDate,
    onDateSelect: handleDaySelect,
    dayRef,
  })

  if (!dayLabel) {
    return <div />
  }

  const isDateToday = isToday(date)
  const getColorFn = getDayColor(
    isSelected,
    isDateToday,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    leading,
    trailing
  )

  function handleDaySelect(date) {
    onDateSelect(date)
    dayRef && dayRef.current && dayRef.current.focus()
  }

  return (
    <DayUI
      className={classNames(
        'c-DatepickerDay',
        (trailing || leading) && 'is-from-another-month',
        isSelected && 'is-selected'
      )}
      aria-selected={isSelected}
      disabled={disabledDate}
      isSelected={isSelected}
      isDateToday={isDateToday}
      onClick={onClick}
      ref={dayRef}
      tabIndex={trailing || leading ? '-1' : '0'}
      labelColor={getColorFn({
        selectedFirstOrLastColor: '#FFFFFF',
        normalColor: getColor('charcoal.600'),
        selectedColor: '#FFFFFF',
        rangeHoverColor: getColor('blue.200'),
        disabledColor: '#808285',
        inactiveMonthColor: getColor('charcoal.200'),
        todayColor: getColor('charcoal.700'),
      })}
      bgColor={getColorFn({
        selectedFirstOrLastColor: getColor('blue.500'),
        normalColor: '#FFFFFF',
        selectedColor: getColor('blue.500'),
        rangeHoverColor: getColor('blue.600'),
        disabledColor: '#FFFFFF',
        inactiveMonthColor: '#FFFFFF',
        todayColor: getColor('grey.300'),
      })}
    >
      <time dateTime={getValidDateTimeString(date)}>{dayLabel}</time>
    </DayUI>
  )
}

Day.defaultProps = {
  leading: false,
  trailing: false,
}

export default Day
