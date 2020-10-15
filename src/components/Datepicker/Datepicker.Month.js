import React from 'react'
import { useMonth } from '@datepicker-react/hooks'
import Day from '../Datepicker/Datepicker.Day'
import { WeekdaysRowUI, DaysGridUI } from '../Datepicker/Datepicker.css'
import {
  getLeadingDays,
  getTrailingDays,
  getValidDateTimeString,
} from '../Datepicker/Datepicker.utils'

function Month({ year, month, firstDayOfWeek }) {
  const { days, weekdayLabels } = useMonth({
    year,
    month,
    firstDayOfWeek,
    dayLabelFormat: date => date.getDate(),
  })

  const currentMonthDate = new Date(year, month, 1)
  const leadingDays = getLeadingDays(currentMonthDate, firstDayOfWeek)
  const trailingDays = getTrailingDays(currentMonthDate, leadingDays, days)

  return (
    <div className="c-DatepickerMonth">
      <WeekdaysRowUI className="WeekdaysRow">
        {weekdayLabels.map(dayLabel => (
          <div css={{ textAlign: 'center' }} key={dayLabel}>
            {dayLabel}
          </div>
        ))}
      </WeekdaysRowUI>
      <DaysGridUI className="DaysGrid">
        {leadingDays.map(day => {
          return (
            <Day
              date={day.date}
              key={getValidDateTimeString(day.date)}
              dayLabel={day.dayLabel}
              leading
            />
          )
        })}
        {days.map(day => {
          if (typeof day === 'object') {
            return (
              <Day
                date={day.date}
                key={getValidDateTimeString(day.date)}
                dayLabel={day.dayLabel}
              />
            )
          }
          return null
        })}
        {trailingDays.map(day => {
          return (
            <Day
              date={day.date}
              key={getValidDateTimeString(day.date)}
              dayLabel={day.dayLabel}
              trailing
            />
          )
        })}
      </DaysGridUI>
    </div>
  )
}

export default Month
