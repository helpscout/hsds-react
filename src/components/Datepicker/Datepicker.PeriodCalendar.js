import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/other'
import { classNames } from '../../utilities/classNames'
import { getActiveYearRange } from './Datepicker.utils'
import Navigator from './Datepicker.Navigator'
import { PeriodUI, PeriodButtonUI } from './Datepicker.css'
import { MONTHS, ONE_YEAR, MULTI_YEAR } from './Datepicker.constants'

function PeriodCalendar({
  activeMonths,
  allowFutureDatePick,
  goToDate,
  goToPreviousYear,
  goToNextYear,
}) {
  const todaysDate = new Date()
  const todaysMonth = todaysDate.getMonth()
  const todaysYear = todaysDate.getFullYear()
  const activeYear = activeMonths[0].year
  const [mode, setMode] = useState(ONE_YEAR)
  const [yearRange, setYearRange] = useState(
    getActiveYearRange(activeYear, true)
  )
  const firstYearInRange = yearRange[0]
  const lastYearInRange = yearRange[yearRange.length - 1]
  const navigatorLabel =
    mode === ONE_YEAR ? activeYear : `${firstYearInRange}-${lastYearInRange}`

  function canNavigateForward() {
    if (mode === ONE_YEAR) {
      return allowFutureDatePick || activeYear < todaysYear
    }

    return allowFutureDatePick || lastYearInRange < todaysYear
  }

  return (
    <div className="c-PeriodCalendar">
      <Navigator
        canNavigateForward={canNavigateForward()}
        isAtNavigationTopLevel={mode === MULTI_YEAR}
        label={navigatorLabel}
        goNext={() => {
          if (mode === ONE_YEAR) {
            goToNextYear()
          } else {
            setYearRange(getActiveYearRange(lastYearInRange + 13, false))
          }
        }}
        goPrevious={() => {
          if (mode === ONE_YEAR) {
            goToPreviousYear()
          } else {
            setYearRange(getActiveYearRange(firstYearInRange, false))
          }
        }}
        onDeepNavigationClick={() => {
          if (mode === ONE_YEAR) {
            setMode(MULTI_YEAR)
          }
        }}
      />
      <PeriodUI
        className={classNames(
          'c-Period',
          mode === ONE_YEAR ? 'is-mode-months' : 'is-mode-years'
        )}
      >
        {mode === ONE_YEAR
          ? MONTHS.map((month, index) => {
              return (
                <PeriodButtonUI
                  className={classNames(
                    index === todaysMonth &&
                      activeYear === todaysYear &&
                      'is-this-period'
                  )}
                  disabled={
                    !allowFutureDatePick &&
                    index > todaysMonth &&
                    activeYear >= todaysYear
                  }
                  key={month}
                  onClick={() => {
                    goToDate(new Date(activeYear, index, 1), true)
                  }}
                >
                  {month.slice(0, 3)}
                </PeriodButtonUI>
              )
            })
          : yearRange.map(year => {
              return (
                <PeriodButtonUI
                  className={classNames(
                    year === todaysYear && 'is-this-period'
                  )}
                  disabled={!allowFutureDatePick && year > todaysYear}
                  key={year}
                  onClick={() => {
                    setMode(ONE_YEAR)
                    goToDate(new Date(year, 0, 1), false)
                  }}
                >
                  {year}
                </PeriodButtonUI>
              )
            })}
      </PeriodUI>
    </div>
  )
}

PeriodCalendar.defaultProps = {
  allowFutureDatePick: true,
  goToPreviousYear: noop,
  goToNextYear: noop,
  goToDate: noop,
}

PeriodCalendar.propTypes = {
  /** The current month(s) active in the calendar */
  activeMonths: PropTypes.arrayOf(PropTypes.any),
  /** Whether is possible to pick a date in the future */
  allowFutureDatePick: PropTypes.bool,
  /** Callback to navigate to the previous year */
  goToPreviousYear: PropTypes.func,
  /** Callback to navigate to the next year */
  goToNextYear: PropTypes.func,
  /** Callback to set the calendar to a chosen year */
  goToDate: PropTypes.func,
}

export default PeriodCalendar
