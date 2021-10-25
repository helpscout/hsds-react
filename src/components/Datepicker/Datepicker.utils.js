import { NAVIGATION_LEVELS, MONTHS } from './Datepicker.constants'

/**
 * Check if something is JS Date Object
 * @param {*} someObject the item to check
 *
 * @return {boolean} Whether someObject is a JS Date Object
 */
export function isJSDate(someObject) {
  return someObject && typeof someObject.getMonth === 'function'
}

/**
 * Convert a valid date string to a JS Date Object, bypass if the string is already a Date Object
 * @param {string} someDateString
 *
 * @return {Object} a Date object
 */
export function getJSDateFromString(someDateString) {
  if (!someDateString) return null
  if (isJSDate(someDateString)) return someDateString

  return new Date(someDateString)
}

/**
 * Convert a date string in the form of '2021-09-27' to 'September 27, 2021'
 * @param {string} date The date to convert
 * @returns string
 */
export function getHumanReadableDate(date) {
  const d = new Date(date)

  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

/**
 * Check if a Date is today
 * @param {Object} someDate Date object to check
 *
 * @return {boolean} true if the provided Date object is today
 */
export function isToday(someDate) {
  const today = new Date()

  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  )
}

/**
 * Check whether the month in a given Date is in the past
 * @param {Object} someDate Date object to check
 *
 * @return {boolean} true if the provided Date's month is in the past
 */
export function isMonthInThePast(someDate) {
  const today = new Date()
  const thisYear = today.getFullYear()
  const someYear = someDate.getFullYear()

  if (someYear === thisYear) {
    return someDate.getMonth() < today.getMonth()
  }

  return someYear < thisYear
}

export function isInsideRange({ check, to, from }) {
  return check.getTime() <= to.getTime() && check.getTime() >= from.getTime()
}

/**
 * Extracts a string in the form of `YYYY-MM-DD`
 * @param {Object} someDate Date object to get the string from
 *
 * @return {string} date string in the form of `YYYY-MM-DD`
 */
export function getValidDateTimeString(someDate) {
  if (!someDate) return ''

  const dateToConvert = getJSDateFromString(someDate)

  const y = `${dateToConvert.getFullYear()}`
  const m = `${(dateToConvert.getMonth() + 1).toString().padStart(2, '0')}`
  const d = `${dateToConvert.getDate().toString().padStart(2, '0')}`

  return `${y}-${m}-${d}`
}

/**
 * In order to fill up the calendar, get the dates from the previous month in relation to the active month
 * @param {Object} someDate Date object to check
 * @param {number} startDay Which day the week starts with (Sunday 0, Monday 1, etc)
 *
 * @return {Object[]} Array of Date Objects
 */
export function getLeadingDays(someDate, startDay = 1) {
  const leadingDays = []
  const year = someDate.getFullYear()
  const month = someDate.getMonth()
  const firstOfTheMonthWeekday = new Date(year, month, 1).getDay()
  const days = calculateNumberOfLeadingDays(startDay, firstOfTheMonthWeekday)

  for (let i = (days - 1) * -1; i <= 0; i++) {
    leadingDays.push({
      date: new Date(year, month, i),
      dayLabel: new Date(year, month, i).getDate(),
      leading: true,
    })
  }

  return leadingDays
}

/**
 * Get the number of leading dates needed based on the selected start day of the week
 * and which day of the week the first of the month falls on
 * @param {number} startDay Which day the week starts with (Sunday 0, Monday 1, etc)
 * @param {number} firstOfTheMonthWeekday The weekday that is the first of the month
 *
 * @return {number} The amount of leading days needed to fill the start of the monthly calendar
 */
export function calculateNumberOfLeadingDays(startDay, firstOfTheMonthWeekday) {
  return startDay > firstOfTheMonthWeekday
    ? 7 + firstOfTheMonthWeekday - startDay
    : firstOfTheMonthWeekday - startDay
}

/**
 * In order to fill up the calendar, get the dates from the next month in relation to the active month
 * @param {Object} someDate Date object to check
 * @param {Object[]} leadingDays The "leading" days taken from the previous month (see `getLeadingDays`)
 * @param {Object[]} allMonthDays The current month days as given by datepicker hooks
 *
 * @return {Object[]} Array of Date Objects
 */
export function getTrailingDays(someDate, leadingDays, allMonthDays) {
  const trailingDays = []
  const someDateCopy = new Date(someDate.toString()) // avoid date mutation below
  const monthDays = allMonthDays.filter(day => typeof day === 'object')
  // If you need to have a fixed height on the calendar, set `totalDaySlots` to 42
  const totalDaySlots = getTotalDaysSlots(monthDays.length + leadingDays.length)
  const days = totalDaySlots - (leadingDays.length + monthDays.length)
  const nextMonth = new Date(someDateCopy.setMonth(someDate.getMonth() + 1, 1))
  const year = someDate.getFullYear()

  for (let i = 1; i <= days; i++) {
    trailingDays.push({
      date: new Date(year, nextMonth.getMonth(), i),
      dayLabel: new Date(year, nextMonth.getMonth(), i).getDate(),
      trailing: true,
    })
  }

  return trailingDays
}

/**
 * Determine how many trailing days we need to fill up the calendar
 * @param {number} numberOfDays
 *
 * @return {number} number of trailing days that fill up the calendar
 */
export function getTotalDaysSlots(numberOfDays) {
  if (numberOfDays === 28) return 28
  if (numberOfDays > 35) return 42
  return 35
}

/**
 * Get an array of 12 years that surround a given year to fill up the Period Calendar in "multi year" mode
 * @param {number|string} activeYear the year to put in the middle of the grid (index 4 of 12)
 * @param {boolean} isInitial is the range generated for the first time
 *
 * @return {number[]} Range of years
 */
export function getActiveYearRange(activeYear, isInitial) {
  const RANGE = 12
  const middleIndex = 4
  const startRange = isInitial
    ? Number.parseInt(activeYear) - middleIndex
    : Number.parseInt(activeYear) - RANGE
  const yearRange = []

  for (let index = 0; index < RANGE; index++) {
    yearRange.push(startRange + index)
  }

  return yearRange
}

export function getNavigatorButtonLabel(navigationLevel, direction) {
  switch (navigationLevel) {
    case NAVIGATION_LEVELS.MONTH_BY_MONTH:
      return `${direction} month`

    case NAVIGATION_LEVELS.YEAR_BY_YEAR:
      return `${direction} year`

    case NAVIGATION_LEVELS.YEAR_RANGES:
      return `${direction} years`

    default:
      return ''
  }
}
