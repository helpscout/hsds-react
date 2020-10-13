import { NAVIGATION_LEVELS } from './Datepicker.constants'
import {
  isJSDate,
  getJSDateFromString,
  isToday,
  isMonthInThePast,
  getValidDateTimeString,
  getLeadingDays,
  getTrailingDays,
  getTotalDaysSlots,
  getActiveYearRange,
  getNavigatorButtonLabel,
  calculateNumberOfLeadingDays,
} from './Datepicker.utils'

describe('Datepicker Utils', () => {
  test('isJSDate', () => {
    expect(isJSDate(new Date())).toBeTruthy()
    expect(isJSDate({})).toBeFalsy()
    expect(isJSDate('hola')).toBeFalsy()
  })

  test('getJSDateFromString', () => {
    const someDate = new Date()
    const someDateString = new Date().toLocaleString()

    expect(getJSDateFromString()).toBe(null)
    expect(getJSDateFromString(someDate)).toBe(someDate)
    expect(getJSDateFromString(someDateString)).toBeInstanceOf(Date)
  })

  test('isToday', () => {
    expect(isToday(new Date())).toBeTruthy()
    expect(isToday(new Date(1992, 3, 24))).toBeFalsy()
  })

  test('isMonthInThePast', () => {
    const currentDate = new Date()
    const pastDate = new Date(2020, 5, 29)
    const futureDate = new Date(
      currentDate.getFullYear,
      currentDate.getMonth + 1,
      4
    )

    expect(isMonthInThePast(pastDate)).toBeTruthy()
    expect(isMonthInThePast(futureDate)).toBeFalsy()
  })

  test('getValidDateTimeString', () => {
    const someDate = new Date(2020, 5, 29)

    expect(getValidDateTimeString()).toBe('')
    expect(getValidDateTimeString(someDate)).toBe('2020-06-29')
  })

  test('calculateNumberOfLeadingDays', () => {
    expect(calculateNumberOfLeadingDays(0, 0)).toBe(0)
    expect(calculateNumberOfLeadingDays(0, 1)).toBe(1)
    expect(calculateNumberOfLeadingDays(0, 2)).toBe(2)
    expect(calculateNumberOfLeadingDays(1, 0)).toBe(6)
    expect(calculateNumberOfLeadingDays(1, 2)).toBe(1)
    expect(calculateNumberOfLeadingDays(4, 1)).toBe(4)
    expect(calculateNumberOfLeadingDays(5, 5)).toBe(0)
  })

  test('getLeadingDays', () => {
    const someDate = new Date(2020, 8, 29)

    // Week starting on Sunday
    expect(getLeadingDays(someDate, 0).length).toBe(2)
    // Week starting on Monday
    expect(getLeadingDays(someDate, 1).length).toBe(1)
    // Week starting on Tuesday
    expect(getLeadingDays(someDate, 2).length).toBe(0)
    // Week starting on Wednesday
    expect(getLeadingDays(someDate, 3).length).toBe(6)
    // Week starting on Thursday
    expect(getLeadingDays(someDate, 4).length).toBe(5)
    // Week starting on Friday
    expect(getLeadingDays(someDate, 5).length).toBe(4)
    // Week starting on Saturday
    expect(getLeadingDays(someDate, 6).length).toBe(3)
  })

  test('getTrailingDays', () => {
    const someDate = new Date(2020, 8, 29)
    const allMonthDays = []

    for (let index = 0; index < 30; index++) {
      allMonthDays.push({})
    }
    // Week starting on Monday (default)
    expect(
      getTrailingDays(someDate, getLeadingDays(someDate), allMonthDays).length
    ).toBe(4)

    // Week starting on Sunday
    expect(
      getTrailingDays(someDate, getLeadingDays(someDate, 0), allMonthDays)
        .length
    ).toBe(3)
  })

  test('getTotalDaysSlots', () => {
    expect(getTotalDaysSlots(28)).toBe(28)
    expect(getTotalDaysSlots(36)).toBe(42)
    expect(getTotalDaysSlots(29)).toBe(35)
  })

  test('getActiveYearRange', () => {
    expect(getActiveYearRange(2020)).toStrictEqual([
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
    ])
  })

  test('getNavigatorButtonLabel', () => {
    expect(
      getNavigatorButtonLabel(NAVIGATION_LEVELS.MONTH_BY_MONTH, 'previous')
    ).toBe('previous month')
    expect(
      getNavigatorButtonLabel(NAVIGATION_LEVELS.MONTH_BY_MONTH, 'next')
    ).toBe('next month')
    expect(
      getNavigatorButtonLabel(NAVIGATION_LEVELS.YEAR_BY_YEAR, 'previous')
    ).toBe('previous year')
    expect(
      getNavigatorButtonLabel(NAVIGATION_LEVELS.YEAR_BY_YEAR, 'next')
    ).toBe('next year')
    expect(
      getNavigatorButtonLabel(NAVIGATION_LEVELS.YEAR_RANGES, 'previous')
    ).toBe('previous years')
    expect(getNavigatorButtonLabel(NAVIGATION_LEVELS.YEAR_RANGES, 'next')).toBe(
      'next years'
    )
    expect(getNavigatorButtonLabel('hello', 'next')).toBe('')
  })
})
