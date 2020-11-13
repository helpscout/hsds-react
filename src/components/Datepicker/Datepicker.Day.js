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
import { DayUI, DayWrapperUI, SelectedDateMarkerUI } from './Datepicker.css'

function Day({ dayLabel, date, leading = false, trailing = false }) {
  const dayRef = useRef(null)
  const {
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
  const getColorFn = getDayColor(
    isSelected,
    isDateToday,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    leading,
    trailing
  )

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

  const dateString = getValidDateTimeString(getCorrectDateToSet(date))
  const startDateString = getValidDateTimeString(getCorrectDateToSet(startDate))
  const endDateString = getValidDateTimeString(getCorrectDateToSet(endDate))

  return (
    <DayWrapperUI className="DayWrapper">
      <DayUI
        className={classNames(
          'c-DatepickerDay',
          (trailing || leading) && 'is-from-another-month',
          isSelected && 'is-selected',
          isSelectedStartOrEnd &&
            dateString === startDateString &&
            'is-selected-start',
          isSelectedStartOrEnd &&
            dateString === endDateString &&
            'is-selected-end',
          isDateToday && 'is-today',
          isWithinHoverRange && 'is-within-hover-range'
        )}
        aria-selected={isSelected}
        disabled={disabledDate}
        isSelected={isSelected}
        isDateToday={isDateToday}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        ref={dayRef}
        tabIndex={trailing || leading ? '-1' : '0'}
        labelColor={getColorFn({
          selectedFirstOrLastColor: '#FFFFFF',
          normalColor: getColor('charcoal.600'),
          selectedColor: getColor('blue.500'),
          rangeHoverColor: getColor('blue.500'),
          disabledColor: '#808285',
          inactiveMonthColor: getColor('charcoal.200'),
          todayColor: getColor('charcoal.700'),
        })}
        bgColor={getColorFn({
          selectedFirstOrLastColor: getColor('blue.500'),
          normalColor: '#FFFFFF',
          selectedColor: getColor('blue.200'),
          rangeHoverColor: getColor('blue.200'),
          disabledColor: '#FFFFFF',
          inactiveMonthColor: '#FFFFFF',
          todayColor: getColor('grey.300'),
        })}
      >
        <time dateTime={getValidDateTimeString(getCorrectDateToSet(date))}>
          {dayLabel}
        </time>
      </DayUI>

      {(isSelectedStartOrEnd && dateString === startDateString) ||
      (isSelectedStartOrEnd && dateString === endDateString) ? (
        <SelectedDateMarkerUI
          className={classNames(
            'selected-date-marker',
            dateString === startDateString && 'is-selected-start-marker',
            dateString === endDateString && 'is-selected-end-marker'
          )}
        ></SelectedDateMarkerUI>
      ) : null}
    </DayWrapperUI>
  )
}

export default Day
