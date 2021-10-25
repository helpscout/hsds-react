import React, { useRef, useContext } from 'react'
import { useDay } from '@datepicker-react/hooks'
import classNames from 'classnames'
import DatepickerContext from './Datepicker.Context'
import {
  isToday,
  isInsideRange,
  getValidDateTimeString,
  getHumanReadableDate,
} from './Datepicker.utils'
import { DayUI, TimeUI, DateRangeBGHelperUI } from './Datepicker.css'

function Day({ dayLabel, date, leading = false, trailing = false }) {
  const dayRef = useRef(null)
  const {
    enableRangeSelection,
    endDate,
    startDate,
    isDateBlocked,
    isDateFocused,
    isDateHovered,
    isDateSelected,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateHover,
  } = useContext(DatepickerContext)
  const {
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    onClick,
    onMouseEnter,
  } = useDay({
    date,
    isDateBlocked,
    isDateFocused,
    isDateHovered,
    isDateSelected,
    isFirstOrLastSelectedDate,
    onDateSelect: handleDaySelect,
    onDateHover: handleDayHover,
    dayRef,
  })

  const isDateToday = isToday(date)
  const dateString = getValidDateTimeString(getCorrectDateToSet(date))
  const startDateString = getValidDateTimeString(startDate)
  const endDateString = getValidDateTimeString(endDate)
  let isTrailingDayInsideRange

  if (enableRangeSelection && trailing && startDate && endDate) {
    isTrailingDayInsideRange = isInsideRange({
      to: endDate,
      from: startDate,
      check: getCorrectDateToSet(date),
    })
  }

  const isDaySelected =
    isSelected || dateString === endDateString || isTrailingDayInsideRange

  function handleDayHover(date) {
    onDateHover(getCorrectDateToSet(date))
  }

  function handleDaySelect(date) {
    onDateSelect(getCorrectDateToSet(date))
    dayRef && dayRef.current && dayRef.current.focus()
  }

  /**
   * "trailing" days are not supported by `@datepicker-react/hooks`
   * if one is clicked and it's going to move to January, make sure to also
   * go to the next year
   */
  function getCorrectDateToSet(date) {
    if (!date) return ''

    // Avoid mutation of `date`
    const dateCopy = new Date(date.toString())

    if (trailing && date.getMonth() === 0) {
      dateCopy.setFullYear(dateCopy.getFullYear() + 1)
    }

    return dateCopy
  }

  /**
   * This UI Helper is the light blue background
   * that appears on a start and end dates in a range
   */
  function shouldShowDateRangeBGHelper() {
    if (!enableRangeSelection) return false
    if (startDateString === endDateString) return false
    if (isSelectedStartOrEnd && isSelected) return true
    if (isSelectedStartOrEnd && !isWithinHoverRange) return false
    if (trailing && isDaySelected) return true

    return isSelectedStartOrEnd
  }

  function getClassNames() {
    return classNames(
      'c-DatepickerDay',
      (trailing || leading) && 'is-from-another-month',
      isDaySelected && 'is-selected',
      enableRangeSelection &&
        isSelectedStartOrEnd &&
        dateString === startDateString &&
        'is-selected-start',
      enableRangeSelection &&
        (isSelectedStartOrEnd || isSelected || dateString === endDateString) &&
        dateString === endDateString &&
        'is-selected-end',
      isDateToday && 'is-today',
      enableRangeSelection && 'with-range-selection',
      isWithinHoverRange && 'is-within-hover-range',
      disabledDate && 'is-disabled'
    )
  }

  return (
    <DayUI
      className={getClassNames()}
      enableRangeSelection={enableRangeSelection}
      aria-selected={isDaySelected}
      aria-label={getHumanReadableDate(dateString)}
      disabled={disabledDate}
      isSelected={isDaySelected}
      isDateToday={isDateToday}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      ref={dayRef}
      tabIndex={trailing || leading ? '-1' : '0'}
      type="button"
    >
      {shouldShowDateRangeBGHelper() ? (
        <DateRangeBGHelperUI
          className={classNames(
            'selected-date-marker',
            dateString === startDateString && 'is-selected-start-marker',
            dateString === endDateString && 'is-selected-end-marker'
          )}
        ></DateRangeBGHelperUI>
      ) : null}
      <TimeUI dateTime={dateString}>{dayLabel}</TimeUI>
    </DayUI>
  )
}

export default Day
