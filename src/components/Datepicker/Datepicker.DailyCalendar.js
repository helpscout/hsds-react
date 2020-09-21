import React from 'react'
import PropTypes from 'prop-types'
import { useMonth } from '@datepicker-react/hooks'
import { noop } from '../../utilities/other'
import { isMonthInThePast } from './Datepicker.utils'
import { NAVIGATION_LEVELS } from './Datepicker.constants'
import Month from './Datepicker.Month'
import Navigator from './Datepicker.Navigator'
import { DailyCalendarUI } from './Datepicker.css'

function DailyCalendar({
  activeMonths,
  allowFutureDatePick = true,
  firstDayOfWeek = 1,
  goToPreviousMonth = noop,
  goToNextMonth = noop,
  numberOfMonths = 1,
  onDeepNavigationClick = noop,
}) {
  const { monthLabel } = useMonth({
    month: activeMonths[0].month,
    year: activeMonths[0].year,
  })

  return (
    <div className="c-DailyCalendar">
      <Navigator
        label={monthLabel}
        goPrevious={goToPreviousMonth}
        goNext={goToNextMonth}
        navigationLevel={NAVIGATION_LEVELS.MONTH_BY_MONTH}
        canNavigateForward={
          allowFutureDatePick ||
          isMonthInThePast(
            new Date(activeMonths[0].year, activeMonths[0].month, 1)
          )
        }
        onDeepNavigationClick={onDeepNavigationClick}
      />
      <DailyCalendarUI numberOfMonths={numberOfMonths} role="grid">
        {activeMonths.map(month => (
          <Month
            key={`${month.year}-${month.month}`}
            year={month.year}
            month={month.month}
            firstDayOfWeek={firstDayOfWeek}
          />
        ))}
      </DailyCalendarUI>
    </div>
  )
}

DailyCalendar.propTypes = {
  /** The current month(s) active in the calendar */
  activeMonths: PropTypes.arrayOf(PropTypes.any),
  /** Whether is possible to pick a date in the future */
  allowFutureDatePick: PropTypes.bool,
  /** Which day of the week is first in the calendar (0 -> sunday, 1 -> monday, etc) */
  firstDayOfWeek: PropTypes.number,
  /** Callback to navigate to the previous month */
  goToPreviousMonth: PropTypes.func,
  /** Callback to navigate to the next month */
  goToNextMonth: PropTypes.func,
  /** How many months to display at the same time. Note: Currently supported 1 */
  numberOfMonths: PropTypes.number,
  /** Callback to navigate to the next level of navigation */
  onDeepNavigationClick: PropTypes.func,
}

export default DailyCalendar
