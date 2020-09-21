import React, { useState } from 'react'
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
  endDate = null,
  firstDayOfWeek = 1,
  minBookingDays = 1,
  numberOfMonths = 1,
  onDateChange = noop,
  startDate = null,
}) {
  const [dates, setDates] = useState({
    startDate: getJSDateFromString(startDate),
    endDate: getJSDateFromString(endDate) || getJSDateFromString(startDate),
    focusedInput: START_DATE,
  })
  const [prevDates, setPrevDates] = useState({})
  const [deepNavVisible, setDeepNavVisibility] = useState(false)

  const {
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    onDateSelect,
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
    exactMinBookingDays: minBookingDays === 1,
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
      setDates(data)
    }

    onDateChange(data)
  }

  return (
    <DatepickerContext.Provider
      value={{
        isDateBlocked,
        isDateFocused,
        isDateHovered,
        isDateSelected,
        isFirstOrLastSelectedDate,
        onDateSelect,
      }}
    >
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
  )
}

Datepicker.propTypes = {
  /** Whether is possible to pick a date in the future */
  allowFutureDatePick: PropTypes.bool,
  /** Pass an ending date to the calendar to select range. Note: Range not supported yet */
  endDate: PropTypes.instanceOf(Date),
  /** Which day of the week is first in the calendar (0 -> sunday, 1 -> monday) */
  firstDayOfWeek: PropTypes.oneOf([0, 1]),
  /** How many days can be selected in a range (minimum). Note: Currently supported 1 */
  minBookingDays: PropTypes.number,
  /** How many months to display at the same time. Note: Currently supported 1 */
  numberOfMonths: PropTypes.number,
  /** Pass a starting date to the calendar to be selected. Accepts a valid Date object or a valid date iso string */
  startDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  /** Callback when the date is changed */
  onDateChange: PropTypes.func,
}

export default Datepicker
