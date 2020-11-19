import React, { useState, useMemo, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDatepicker, START_DATE } from '@datepicker-react/hooks'
import { noop } from '../../utilities/other'
import { getJSDateFromString, getValidDateTimeString } from './Datepicker.utils'
import DatepickerContext from './Datepicker.Context'
import { CalendarContainerUI } from './Datepicker.css'
import PeriodCalendar from './Datepicker.PeriodCalendar'
import DailyCalendar from './Datepicker.DailyCalendar'

function Datepicker({
  allowFutureDatePick = true,
  enableRangeSelection = false,
  endDate = null,
  firstDayOfWeek = 1,
  minBookingDays = 1,
  numberOfMonths = 1,
  onDateChange = noop,
  innerRef = noop,
  startDate = null,
}) {
  const datePickerRef = useRef(null)
  const [dates, setDates] = useState({
    startDate: getJSDateFromString(startDate),
    endDate: getJSDateFromString(endDate) || getJSDateFromString(startDate),
    focusedInput: START_DATE,
  })
  const [prevDates, setPrevDates] = useState({})
  const [deepNavVisible, setDeepNavVisibility] = useState(false)

  useEffect(() => {
    if (datePickerRef && datePickerRef.current) {
      innerRef(datePickerRef.current)
    }
    // No need to add innerRef prop to the deps list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datePickerRef])

  const {
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    onDateSelect,
    onDateHover,
    goToDate,
    goToPreviousMonthsByOneMonth,
    goToNextMonthsByOneMonth,
    goToPreviousYear,
    goToNextYear,
  } = useDatepicker({
    startDate: dates.startDate,
    endDate: dates.endDate,
    focusedInput: dates.focusedInput,
    onDatesChange: handleDateChange,
    numberOfMonths,
    minBookingDays,
    exactMinBookingDays: !enableRangeSelection,
    maxBookingDate: !allowFutureDatePick ? new Date() : undefined,
  })

  /**
   * This section performs a `getDerivedStateFromProps` style logic where we
   * store the prop in state (as prevDate) so we can compare in the next render
   * and only if the prop changes this gets run again
   */
  if (
    getValidDateTimeString(startDate) !==
    getValidDateTimeString(prevDates.startDate)
  ) {
    setDates({
      startDate: getJSDateFromString(startDate),
      endDate: getJSDateFromString(endDate) || getJSDateFromString(startDate),
      focusedInput: START_DATE,
    })
    setPrevDates({
      startDate: getJSDateFromString(startDate),
      endDate: getJSDateFromString(endDate) || getJSDateFromString(startDate),
      focusedInput: START_DATE,
    })
    goToDate(getJSDateFromString(startDate))
  }

  function handleDateChange(data) {
    if (!data.focusedInput) {
      setDates({ ...data, focusedInput: START_DATE })
    } else {
      if (enableRangeSelection && data.endDate) {
        setDates({ ...data, endDate: null })
      } else {
        setDates(data)
      }
    }

    onDateChange(data)
  }

  // We don't recreate the context value object unless it's needed.
  // That stop all the childrens from being re-rendering on each datepicker evokation
  const contextValue = useMemo(
    () => ({
      isDateBlocked,
      isDateFocused,
      isDateHovered,
      isDateSelected,
      isFirstOrLastSelectedDate,
      onDateSelect,
      onDateHover,
      startDate: dates.startDate,
      endDate: dates.endDate,
      enableRangeSelection,
    }),
    [
      isDateBlocked,
      isDateFocused,
      isDateHovered,
      isDateSelected,
      isFirstOrLastSelectedDate,
      onDateSelect,
      onDateHover,
      dates.startDate,
      dates.endDate,
      enableRangeSelection,
    ]
  )

  return (
    <div className="DatepickerContainer" ref={datePickerRef}>
      <DatepickerContext.Provider value={contextValue}>
        <CalendarContainerUI
          className="c-Calendar"
          numberOfMonths={numberOfMonths}
          role="dialog"
        >
          {!deepNavVisible ? (
            <DailyCalendar
              activeMonths={activeMonths}
              allowFutureDatePick={allowFutureDatePick}
              firstDayOfWeek={firstDayOfWeek}
              goToPreviousMonth={goToPreviousMonthsByOneMonth}
              goToNextMonth={goToNextMonthsByOneMonth}
              numberOfMonths={numberOfMonths}
              onDeepNavigationClick={() => {
                setDeepNavVisibility(!deepNavVisible)
              }}
            />
          ) : (
            <PeriodCalendar
              activeMonths={activeMonths}
              allowFutureDatePick={allowFutureDatePick}
              goToDate={(newDate, switchCalendar) => {
                goToDate(newDate)
                switchCalendar && setDeepNavVisibility(false)
              }}
              goToNextYear={goToNextYear}
              goToPreviousYear={goToPreviousYear}
              startDate={dates.startDate}
            />
          )}
        </CalendarContainerUI>
      </DatepickerContext.Provider>
    </div>
  )
}

Datepicker.propTypes = {
  /** Whether is possible to pick a date in the future */
  allowFutureDatePick: PropTypes.bool,
  /** Allows the selection of start and end date dates, use `minBookingDays` to enforce a minimun number of dates in the range*/
  enableRangeSelection: PropTypes.bool,
  /** Pass an ending date to the calendar to select range. Note: Range not supported yet */
  endDate: PropTypes.instanceOf(Date),
  /** Which day of the week is first in the calendar (0 -> sunday, 1 -> monday, etc) */
  firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  /** Retrieves the Datepicker most outer DOM node */
  innerRef: PropTypes.func,
  /** How many days can be selected in a range (minimum). */
  minBookingDays: PropTypes.number,
  /** How many months to display at the same time. Note: Currently supported 1 */
  numberOfMonths: PropTypes.number,
  /** Pass a starting date to the calendar to be selected. Accepts a valid Date object or a valid date iso string */
  startDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  /** Callback when the date is changed, returns selected start date (and end date if a range selection)  */
  onDateChange: PropTypes.func,
}

export default Datepicker
